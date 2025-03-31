<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';

  // Props
  export let x: number; // %
  export let y: number; // %
  export let initialDelay: number = 0;
  export let color: string = 'rgba(var(--color-teal-rgb), 0.6)'; // Default to teal, use RGB for opacity

  let element: HTMLElement;
  let pulseTween: gsap.core.Tween | null = null;

  const pulseStyle = `
    left: ${x}%; 
    top: ${y}%; 
    border-color: ${color};
  `;

  onMount(() => {
    if (!browser || !element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // If no motion, keep element hidden or set a static visible state if desired
        gsap.set(element, { opacity: 0 }); 
        return;
    }

    // Pulse animation
    pulseTween = gsap.fromTo(element,
      { scale: 0, opacity: 0.8 }, // Start small and somewhat opaque
      {
        scale: 2 + Math.random() * 3, // Expand to random size
        opacity: 0, // Fade out completely
        duration: 2 + Math.random() * 3, // Random duration
        delay: initialDelay,
        repeat: -1,
        ease: "sine.out" // Ease out for a smoother expansion
      }
    );
  });

  onDestroy(() => {
    pulseTween?.kill();
  });
</script>

<div class="cyber-pulse" bind:this={element} style={pulseStyle}></div>

<style>
  .cyber-pulse {
    position: absolute;
    border-style: solid;
    border-width: 1px; /* Or 2px if preferred */
    /* border-color is set dynamically */
    border-radius: 50%;
    width: 50px; /* Base width, scale will change size */
    height: 50px; /* Base height */
    transform-origin: center;
    pointer-events: none;
    z-index: 1; /* Below skills */
    opacity: 0; /* Start hidden */
    will-change: transform, opacity; /* Performance hint */
    /* Ensure it's positioned correctly relative to its container */
    transform: translate(-50%, -50%); /* Center the pulse on its x, y coords */
  }
</style>