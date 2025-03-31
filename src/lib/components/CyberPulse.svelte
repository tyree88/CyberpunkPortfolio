<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';

  /**
   * CyberPulse.svelte
   * Creates an expanding circular pulse effect.
   */

  export let initialX: number; // Percentage
  export let initialY: number; // Percentage
  export let index: number;   // For staggering and variation

  let element: HTMLElement;
  let ctx: gsap.Context;

  // Alternate colors for visual variety
  let borderColor = 'rgba(73, 197, 182, 0.6)'; // Default Teal
  if (index % 3 === 0) {
    borderColor = 'rgba(255, 82, 82, 0.6)'; // Red
  } else if (index % 3 === 1) {
    borderColor = 'rgba(236, 208, 111, 0.6)'; // Gold
  }

  $: pulseStyle = `
    left: ${initialX}%;
    top: ${initialY}%;
    border-color: ${borderColor};
  `;

  onMount(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(element,
        { scale: 0, opacity: 0.8 },
        {
          scale: 2 + Math.random() * 3, // Random end scale
          opacity: 0,
          duration: 2 + Math.random() * 3, // Random duration
          delay: index * 0.3 + Math.random(), // Staggered + random delay
          repeat: -1,
          ease: "sine.out"
        }
      );
    }, element); // Scope context
  });

  onDestroy(() => {
    ctx?.revert(); // Cleanup GSAP
  });

</script>

<div bind:this={element} class="cyber-pulse" style={pulseStyle}></div>

<style>
  .cyber-pulse {
    position: absolute;
    border: 1px solid rgba(73, 197, 182, 0.6); /* Default border, overridden by style prop */
    border-radius: 50%;
    width: 50px; /* Base size, scale animation changes this */
    height: 50px;
    transform-origin: center;
    z-index: 1; /* Below skills */
    pointer-events: none;
    will-change: transform, opacity;
    transform: translate(-50%, -50%); /* Center the pulse on its coordinates */
  }
</style>