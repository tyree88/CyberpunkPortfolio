<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';

  // Props with defaults
  export let size: number = 100; // Size in pixels
  export let strokeColor: string = 'var(--color-teal)';
  export let strokeWidth: number = 2;
  export let fillColor: string = 'transparent';
  export let glowColor: string = 'rgba(var(--color-teal-rgb), 0.5)';
  export let glowIntensity: number = 0.5;
  export let animate: boolean = true;
  export let rotationSpeed: number = 0; // degrees per second, 0 = no rotation
  export let initialDelay: number = 0;
  export let initialRotation: number = 0;
  export let pulseEffect: boolean = false;
  export let scanEffect: boolean = false;
  export let glitchEffect: boolean = false;
  export let interactive: boolean = false; // Enables hover/focus effects

  // Calculated properties
  let hexPoints: string;
  let rotationAnimation: gsap.core.Tween | null = null;
  let svgElement: SVGSVGElement;
  let preferReducedMotion = false;

  // Create points for hexagon
  $: {
    const r = size / 2; // Radius
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = r + r * Math.cos(angle);
      const y = r + r * Math.sin(angle);
      points.push(`${x},${y}`);
    }
    hexPoints = points.join(' ');
  }

  // Handle interactive states
  function handleMouseEnter() {
    if (!interactive) return;
    gsap.to(svgElement, { 
      scale: 1.05, 
      filter: `drop-shadow(0 0 ${5 * glowIntensity}px ${glowColor})`,
      duration: 0.3
    });
  }

  function handleMouseLeave() {
    if (!interactive) return;
    gsap.to(svgElement, { 
      scale: 1, 
      filter: `drop-shadow(0 0 ${3 * glowIntensity}px ${glowColor})`,
      duration: 0.3
    });
  }

  onMount(() => {
    if (!browser) return;
    
    // Check for reduced motion preference
    preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initial settings
    if (svgElement) {
      gsap.set(svgElement, { 
        rotation: initialRotation,
        opacity: 0,
        scale: 0.9,
        filter: `drop-shadow(0 0 ${3 * glowIntensity}px ${glowColor})`
      });
      
      // Entrance animation
      gsap.to(svgElement, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        delay: initialDelay,
        ease: "back.out(1.5)"
      });
    }
    
    // Start rotation if enabled and motion is not reduced
    if (animate && rotationSpeed !== 0 && !preferReducedMotion) {
      rotationAnimation = gsap.to(svgElement, {
        rotation: `+=${rotationSpeed >= 0 ? 360 : -360}`,
        duration: Math.abs(360 / rotationSpeed),
        ease: "none",
        repeat: -1
      });
    }
    
    // Add pulse animation if enabled
    if (animate && pulseEffect && !preferReducedMotion) {
      gsap.to(svgElement, {
        scale: 1.05,
        filter: `drop-shadow(0 0 ${6 * glowIntensity}px ${glowColor})`,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    return () => {
      // Clean up animations
      if (rotationAnimation) rotationAnimation.kill();
      gsap.killTweensOf(svgElement);
    };
  });
</script>

<svg 
  bind:this={svgElement}
  width={size} 
  height={size} 
  viewBox={`0 0 ${size} ${size}`}
  class="hex-shape"
  class:animate={animate}
  class:pulse-effect={pulseEffect}
  class:scan-effect={scanEffect}
  class:glitch-effect={glitchEffect}
  class:interactive={interactive}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:focus={handleMouseEnter}
  on:blur={handleMouseLeave}
  aria-hidden={!interactive}
  role={interactive ? 'button' : undefined}
  tabindex={interactive ? 0 : -1}
>
  <!-- Base Hexagon -->
  <polygon 
    points={hexPoints} 
    stroke={strokeColor} 
    stroke-width={strokeWidth} 
    fill={fillColor}
    class="hex-base"
  />
  
  <!-- Scan effect overlay if enabled -->
  {#if scanEffect && animate && !preferReducedMotion}
    <polygon 
      points={hexPoints} 
      fill="url(#scanGradient)"
      class="hex-scan"
    />
  {/if}
  
  <!-- Define gradients and effects -->
  <defs>
    <!-- Linear gradient for scan effect -->
    <linearGradient id="scanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(var(--color-teal-rgb), 0)" />
      <stop offset="50%" stop-color="rgba(var(--color-teal-rgb), 0.3)" />
      <stop offset="100%" stop-color="rgba(var(--color-teal-rgb), 0)" />
    </linearGradient>
  </defs>
</svg>

<style>
  .hex-shape {
    display: inline-block;
    transform-origin: center;
    will-change: transform, filter;
  }
  
  .hex-base {
    vector-effect: non-scaling-stroke;
  }
  
  /* Scan effect animation */
  .hex-scan {
    opacity: 0;
  }
  
  .scan-effect .hex-scan {
    animation: hexScan 2s ease-in-out infinite;
  }
  
  @keyframes hexScan {
    0%, 100% {
      opacity: 0;
      transform: translateY(-100%);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Glitch effect style */
  .glitch-effect {
    animation: hexGlitch 15s ease-in-out infinite;
  }
  
  @keyframes hexGlitch {
    0%, 100% {
      filter: none;
      transform: translate(0, 0) scale(1);
    }
    92.5% {
      filter: hue-rotate(-30deg) brightness(1.2);
      transform: translate(-2px, 1px) scale(1.01);
    }
    93.5% {
      filter: hue-rotate(30deg) brightness(0.9);
      transform: translate(2px, 1px) scale(0.99);
    }
    94.5% {
      filter: none;
      transform: translate(0, 0) scale(1);
    }
    95.5% {
      filter: brightness(1.2);
      transform: translate(-1px, -1px) scale(1.01);
    }
    96.5% {
      filter: none;
      transform: translate(0, 0) scale(1);
    }
  }
  
  /* Interactive state styles (hover/focus) */
  .interactive {
    cursor: pointer;
    transition: transform 0.3s ease, filter 0.3s ease;
  }
  
  /* Ensure there's a visible focus style for keyboard users */
  .interactive:focus-visible {
    outline: 2px solid var(--color-teal);
    outline-offset: 2px;
  }
</style>