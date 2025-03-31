<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';

  // Props
  export let startX: number = 50; // %
  export let startY: number = 50; // %
  export let endX: number; // % - Skill's X position
  export let endY: number; // % - Skill's Y position
  export let initialDelay: number = 0;
  export let pulse: boolean = false; // Whether to show the traveling pulse

  let lineElement: HTMLElement;
  let pulseElement: HTMLElement | null = null;
  let linePulseTween: gsap.core.Tween | null = null;
  let travelPulseTween: gsap.core.Tween | null = null;

  // Calculate angle and distance for positioning
  const angleRad = Math.atan2(endY - startY, endX - startX);
  const angleDeg = angleRad * (180 / Math.PI);
  const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const baseHeight = 0.5 + Math.random() * 1; // Calculate base height
  const randomDelay = Math.random() * 2; // Calculate random delay for CSS animation

  // Dynamic styles
  const lineStyle = `
    top: ${startY}%;
    left: ${startX}%;
    width: ${distance}%;
    transform-origin: left center;
    transform: rotate(${angleRad}rad);
    opacity: 0; /* Start invisible */
    --base-height: ${baseHeight}px; /* Set CSS variable */
    height: ${baseHeight}px; /* Initial height */
    animation-delay: ${randomDelay}s; /* Add random delay inline */
  `;

  onMount(() => {
    if (!browser || !lineElement || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // If no motion, just set final state
        gsap.set(lineElement, { opacity: 0.7 }); // Or desired static opacity
        if (pulse && pulseElement) {
            gsap.set(pulseElement, { opacity: 0 }); // Hide pulse if no motion
        }
        // If no motion, also remove the CSS animation to prevent it starting later
        if (lineElement) {
            lineElement.style.animationName = 'none'; 
        }
        return;
    }

    // Enhanced Cyberpunk 2077 data transmission appearance effect
    gsap.fromTo(lineElement,
      { 
        opacity: 0,
        "--line-progress": "0%", // Start with 0% width for authentic data transmission look
        filter: "brightness(1.5)" // Start brighter
      },
      {
        opacity: 0.7,
        "--line-progress": "100%", // Animate to full width
        filter: "brightness(1)", // Normal brightness
        duration: 0.5, // Faster animation for a more snappy feel
        delay: initialDelay,
        ease: "power3.out", // More accelerated easing for tech feel
        onComplete: () => {
          // Flash effect when connection is established
          if (Math.random() > 0.7) { // Only some lines flash
            gsap.to(lineElement, {
              opacity: 0.9,
              duration: 0.1,
              yoyo: true,
              repeat: 1
            });
          }
        }
      }
    );

    // Performance-optimized pulsing animation
    // Using CSS custom properties for better performance
    // This reduces the overhead of JavaScript animation calculations
    linePulseTween = gsap.to(lineElement, {
      "--line-opacity": Math.random() > 0.5 ? "0.3" : "0.6", // Random opacity via CSS var
      duration: 0.8 + Math.random() * 0.4, // More consistent, shorter durations
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: initialDelay + Math.random() * 0.5, // Smaller delay variation
      overwrite: true // Cleaner animation management
    });

    // Add and animate data pulse if enabled - more authentic cyberpunk animation
    if (pulse && pulseElement) {
      // Choose a shorter, more consistent duration for performance
      const pulseDuration = 0.7 + Math.random() * 0.6; // Between 0.7-1.3s
      
      // More authentic Cyberpunk data packet movement
      travelPulseTween = gsap.fromTo(pulseElement,
        { 
          left: '0%', 
          opacity: 0.9,
          scale: 1.3, // Start slightly larger
          boxShadow: "0 0 5px var(--color-teal)" // Start with glow
        },
        {
          left: '100%', // Travel to the end
          opacity: 0.7, // Fade slightly during travel
          scale: 1, // Shrink slightly
          boxShadow: "0 0 3px var(--color-teal)", // Reduce glow
          duration: pulseDuration,
          repeat: -1,
          ease: "power1.in", // Accelerating movement feels more tech-like
          delay: initialDelay + Math.random() * 0.4, // Smaller delay for more consistency
          
          // Performance optimization
          force3D: true // Forces 3D transforms for better GPU acceleration
        }
      );
    }
  });

  onDestroy(() => {
    linePulseTween?.kill();
    travelPulseTween?.kill();
  });
</script>

<div class="data-flow-line" bind:this={lineElement} style={lineStyle}>
  {#if pulse}
    <div class="data-pulse" bind:this={pulseElement}></div>
  {/if}
</div>

<style>
  .data-flow-line {
    position: absolute;
    /* height is set dynamically via inline style & CSS var */
    background: linear-gradient(
      to right,
      rgba(var(--color-teal-rgb), 0) 0%, /* Use CSS var */
      rgba(var(--color-teal-rgb), var(--line-opacity, 0.8)) 50%,
      rgba(var(--color-teal-rgb), 0) 100%
    );
    z-index: 1; /* Below skills */
    pointer-events: none;
    
    /* Authentic Cyberpunk 2077 data line effect using CSS variables */
    /* animating width using CSS variables controlled by GSAP */
    width: var(--line-progress, 100%);
    
    /* Performance optimizations */
    will-change: opacity, transform; /* Reduced properties for better performance */
    
    /* Apply the height pulse animation - smoother with reduced animation time */
    animation-name: pulseLineWidth; 
    animation-duration: 3s; /* Faster animation for better performance */
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    /* animation-delay is set via inline style */
    
    /* Slight texture for more authentic cyberpunk feel */
    background-blend-mode: screen;
  }

  .data-pulse {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: var(--color-teal); /* Use CSS var */
    box-shadow: 0 0 4px var(--color-teal);
    top: 50%;
    transform: translateY(-50%);
    opacity: 0; /* Start hidden until animation */
    z-index: 5; /* Above line gradient */
    will-change: transform, opacity, left; /* Performance hint - transform added for scale */
    
    /* Authentic Cyberpunk 2077 data packet style */
    /* Sharp, technological edges */
    clip-path: polygon(
      20% 0%, 
      80% 0%, 
      100% 50%, 
      80% 100%, 
      20% 100%, 
      0% 50%
    );
    
    /* Add cyber texture with pseudo-element */
    position: relative;
  }
  
  /* Add inner detail for more authenticity */
  .data-pulse::after {
    content: '';
    position: absolute;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
    background-color: rgba(255, 255, 255, 0.8);
    clip-path: polygon(0% 50%, 50% 0%, 100% 50%, 50% 100%);
  }

 @keyframes pulseLineWidth {
   0%, 100% { height: var(--base-height, 1px); } /* Use CSS var for base height */
   50% { height: calc(var(--base-height, 1px) * 2); } /* Double height at peak */
 }
</style>