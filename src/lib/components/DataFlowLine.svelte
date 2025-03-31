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

    // Delayed appearance for the line (GSAP handles initial delay)
    gsap.to(lineElement, {
      opacity: 0.7,
      duration: 0.8,
      delay: initialDelay,
      ease: "power1.inOut"
    });

    // Pulsing opacity animation for the line itself (GSAP handles this)
    // The CSS animation 'pulseLineWidth' will handle the height pulse
    linePulseTween = gsap.to(lineElement, {
      opacity: Math.random() > 0.5 ? 0.3 : 0.6, // Random target opacity
      duration: 1 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: initialDelay + Math.random() // Random start offset for opacity pulse
    });

    // Add and animate data pulse if enabled
    if (pulse && pulseElement) {
      travelPulseTween = gsap.fromTo(pulseElement,
        { left: '0%', opacity: 0.8 }, // Start at the beginning
        {
          left: '100%', // Travel to the end
          opacity: 0.8, // Maintain opacity during travel
          duration: 1 + Math.random() * 2, // Wider duration range (1s to 3s)
          repeat: -1,
          ease: "power1.inOut",
          delay: initialDelay + Math.random() * 1.5 // Slightly adjust delay range too
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
      rgba(var(--color-teal-rgb), 0.8) 50%,
      rgba(var(--color-teal-rgb), 0) 100%
    );
    z-index: 1; /* Below skills */
    pointer-events: none;
    will-change: opacity, height; /* Performance hint */
    /* Apply the height pulse animation */
    animation-name: pulseLineWidth; 
    animation-duration: 4s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    /* animation-delay is set via inline style */
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
    will-change: left, opacity; /* Performance hint */
  }

 @keyframes pulseLineWidth {
   0%, 100% { height: var(--base-height, 1px); } /* Use CSS var for base height */
   50% { height: calc(var(--base-height, 1px) * 2); } /* Double height at peak */
 }
</style>