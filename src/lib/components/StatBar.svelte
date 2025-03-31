<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';

  // Props with defaults
  export let label: string = "";
  export let value: number = 0;
  export let maxValue: number = 100;
  export let showValue: boolean = true;
  export let color: string = 'var(--color-teal)';
  export let backgroundColor: string = 'rgba(0, 0, 0, 0.3)';
  export let segments: number = 0; // If > 0, displays a segmented bar
  export let animated: boolean = true;
  export let initialDelay: number = 0;
  export let valuePrefix: string = "";
  export let valueSuffix: string = "";
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let pulseEffect: boolean = false;
  export let scanEffect: boolean = false;
  export let labelPosition: 'top' | 'left' | 'none' = 'top';

  // Derived values
  $: percentValue = Math.min(100, Math.max(0, (value / maxValue) * 100));
  $: displayValue = `${valuePrefix}${value}${valueSuffix}`;
  $: displayMax = `${valuePrefix}${maxValue}${valueSuffix}`;
  $: displaySegments = segments > 0 ? segments : Math.ceil(maxValue / 10); // Default 10 units per segment
  
  // State variables
  let barElement: HTMLDivElement;
  let progressElement: HTMLDivElement;
  let segmentElements: HTMLDivElement[] = [];
  let preferReducedMotion = false;
  let initialRender = true;

  // Calculate size classes
  $: sizeClass = `stat-bar-${size}`;

  // Calculate segment width/height
  $: segmentSize = 100 / displaySegments;

  onMount(() => {
    if (!browser) return;
    
    // Check for reduced motion preference
    preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If animation is disabled or reduced motion is preferred, just set the value
    if (!animated || preferReducedMotion) {
      if (progressElement) {
        progressElement.style.width = `${percentValue}%`;
      }
      
      // Update segments if using segments
      if (segments > 0 && segmentElements.length > 0) {
        const activeSegments = Math.ceil((value / maxValue) * displaySegments);
        segmentElements.forEach((segment, i) => {
          segment.classList.toggle('active', i < activeSegments);
        });
      }
      
      return;
    }
    
    // Animate bar on mount
    if (barElement) {
      gsap.from(barElement, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: initialDelay,
        ease: "power2.out"
      });
    }
    
    // Animate progress bar width
    if (progressElement) {
      gsap.fromTo(progressElement,
        { width: "0%" },
        { 
          width: `${percentValue}%`,
          duration: 1.2,
          delay: initialDelay + 0.2,
          ease: "power2.inOut"
        }
      );
    }
    
    // Animate segments if using segments
    if (segments > 0 && segmentElements.length > 0) {
      const activeSegments = Math.ceil((value / maxValue) * displaySegments);
      
      // Activate each segment with a staggered delay
      segmentElements.forEach((segment, i) => {
        if (i < activeSegments) {
          gsap.fromTo(segment,
            { opacity: 0.3, scale: 0.8 },
            { 
              opacity: 1, 
              scale: 1,
              delay: initialDelay + 0.3 + (i * 0.05),
              duration: 0.4,
              ease: "back.out(1.7)",
              onComplete: () => {
                segment.classList.add('active');
              }
            }
          );
        }
      });
    }
    
    // Initial render is complete
    initialRender = false;
  });

  // Function to update segments when value changes
  $: if (!initialRender && segments > 0 && browser && segmentElements.length > 0) {
    const activeSegments = Math.ceil((value / maxValue) * displaySegments);
    
    segmentElements.forEach((segment, i) => {
      const shouldBeActive = i < activeSegments;
      const isActive = segment.classList.contains('active');
      
      if (shouldBeActive && !isActive) {
        // Activate this segment
        gsap.fromTo(segment,
          { opacity: 0.3, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            onComplete: () => {
              segment.classList.add('active');
            }
          }
        );
      } else if (!shouldBeActive && isActive) {
        // Deactivate this segment
        gsap.to(segment, {
          opacity: 0.3,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            segment.classList.remove('active');
          }
        });
      }
    });
  }
  
  // Update progress bar when value changes
  $: if (!initialRender && browser && progressElement && !segments) {
    gsap.to(progressElement, {
      width: `${percentValue}%`,
      duration: 0.5,
      ease: "power2.inOut"
    });
  }
</script>

<div 
  class="stat-bar {sizeClass}" 
  class:pulse-effect={pulseEffect}
  class:scan-effect={scanEffect}
  class:label-left={labelPosition === 'left'}
  class:label-top={labelPosition === 'top'}
  class:label-none={labelPosition === 'none'}
  bind:this={barElement}
  role="progressbar"
  aria-valuenow={value}
  aria-valuemin="0"
  aria-valuemax={maxValue}
  aria-label={label ? `${label}: ${value} out of ${maxValue}` : `${value} out of ${maxValue}`}
>
  {#if labelPosition !== 'none' && label}
    <div class="stat-label">{label}</div>
  {/if}
  
  <div class="stat-bar-container">
    {#if segments > 0}
      <div class="stat-segments">
        {#each Array(displaySegments) as _, i}
          <div 
            class="stat-segment" 
            style="width: {segmentSize}%;" 
            class:active={i < Math.ceil((value / maxValue) * displaySegments)}
            bind:this={segmentElements[i]}
          ></div>
        {/each}
      </div>
    {:else}
      <div class="stat-progress-bg" style="background-color: {backgroundColor};">
        <div 
          class="stat-progress" 
          style="background-color: {color}; width: {initialRender ? '0%' : `${percentValue}%`};"
          bind:this={progressElement}
        ></div>
      </div>
    {/if}
    
    {#if showValue}
      <div class="stat-value">
        <span class="current-value">{displayValue}</span>
        {#if segments <= 0}
          <span class="max-value">/ {displayMax}</span>
        {/if}
      </div>
    {/if}
  </div>
</div>

<style>
  .stat-bar {
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    font-family: 'Roboto Mono', monospace;
  }
  
  .label-top {
    flex-direction: column;
  }
  
  .label-left {
    flex-direction: row;
    align-items: center;
  }
  
  .stat-label {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: var(--color-teal);
    margin-bottom: 5px;
    letter-spacing: 1px;
  }
  
  .label-left .stat-label {
    margin-bottom: 0;
    margin-right: 10px;
    min-width: 80px;
  }
  
  .stat-bar-container {
    flex: 1;
    display: flex;
    align-items: center;
  }
  
  .stat-progress-bg {
    flex: 1;
    height: 12px;
    background-color: rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .stat-progress {
    height: 100%;
    width: 0%; /* Initial width, will be animated */
    position: relative;
    transition: width 0.3s ease-out;
  }
  
  /* Segment bar style */
  .stat-segments {
    flex: 1;
    display: flex;
    height: 12px;
    gap: 2px;
  }
  
  .stat-segment {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: background-color 0.3s ease;
  }
  
  .stat-segment.active {
    background-color: var(--color-teal);
    box-shadow: 0 0 5px var(--color-teal);
  }
  
  /* Value display */
  .stat-value {
    margin-left: 10px;
    font-size: 0.8rem;
    color: var(--color-white);
    white-space: nowrap;
  }
  
  .current-value {
    color: var(--color-teal);
  }
  
  .max-value {
    opacity: 0.7;
  }
  
  /* Size variations */
  .stat-bar-small .stat-progress-bg,
  .stat-bar-small .stat-segments {
    height: 8px;
  }
  
  .stat-bar-small .stat-label,
  .stat-bar-small .stat-value {
    font-size: 0.7rem;
  }
  
  .stat-bar-large .stat-progress-bg,
  .stat-bar-large .stat-segments {
    height: 16px;
  }
  
  .stat-bar-large .stat-label,
  .stat-bar-large .stat-value {
    font-size: 0.9rem;
  }
  
  /* Animation effects */
  .pulse-effect .stat-progress,
  .pulse-effect .stat-segment.active {
    animation: statPulse 2s ease-in-out infinite;
  }
  
  @keyframes statPulse {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 5px currentColor;
    }
    50% {
      opacity: 0.8;
      box-shadow: 0 0 10px currentColor;
    }
  }
  
  .scan-effect .stat-progress::after {
    content: '';
    position: absolute;
    top: 0;
    left: -20%;
    width: 20%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: scanAnimation 2s ease-in-out infinite;
  }
  
  @keyframes scanAnimation {
    0% { left: -20%; }
    100% { left: 120%; }
  }
</style>