<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';

  /**
   * DataFlowLine.svelte
   * Draws an animated line from the center to a target point,
   * optionally with a traveling data pulse.
   */

  export let targetX: number; // Percentage
  export let targetY: number; // Percentage
  export let index: number;   // For staggering and variation
  export let showPulse: boolean = false;

  let lineElement: HTMLElement;
  let pulseElement: HTMLElement | null = null;
  let ctx: gsap.Context;

  const centerX = 50; // Center X percentage
  const centerY = 50; // Center Y percentage

  // Calculate angle and distance
  const angleRad = Math.atan2(targetY - centerY, targetX - centerX);
  const distancePercent = Math.sqrt(Math.pow(targetX - centerX, 2) + Math.pow(targetY - centerY, 2));

  // Style for the line container
  $: lineStyle = `
    width: ${distancePercent}%;
    height: ${0.5 + Math.random() * 1}px; /* Varied thickness */
    top: ${centerY}%;
    left: ${centerX}%;
    transform: rotate(${angleRad}rad);
    opacity: 0; /* Start hidden */
  `;

  onMount(() => {
    ctx = gsap.context(() => {
      // Line appearance and pulsing animation
      gsap.to(lineElement, {
        opacity: 0.7,
        duration: 0.8,
        delay: 1.2 + (index * 0.03), // Stagger appearance
        ease: "power1.inOut"
      });
      gsap.to(lineElement, {
        opacity: index % 2 === 0 ? 0.3 : 0.6, // Alternate opacity pulse
        duration: 1 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() // Random start time for pulse
      });

      // Data pulse animation if enabled and element exists
      if (showPulse && pulseElement) {
        gsap.fromTo(pulseElement,
          { left: '0%' },
          {
            left: '100%',
            duration: 1.5 + Math.random(),
            repeat: -1,
            ease: "power1.inOut",
            delay: Math.random() * 2 // Random start time
          }
        );
      }
    }, lineElement); // Scope context
  });

  onDestroy(() => {
    ctx?.revert(); // Cleanup GSAP
  });

</script>

<div bind:this={lineElement} class="data-flow-line" style={lineStyle}>
  {#if showPulse}
    <div bind:this={pulseElement} class="data-pulse"></div>
  {/if}
</div>

<style>
  .data-flow-line {
    position: absolute;
    transform-origin: left center;
    background: linear-gradient(
      to right,
      rgba(73, 197, 182, 0) 0%,
      rgba(73, 197, 182, 0.8) 50%,
      rgba(73, 197, 182, 0) 100%
    );
    z-index: 1; /* Below skills */
    will-change: opacity;
  }

  .data-pulse {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #49c5b6;
    box-shadow: 0 0 4px #49c5b6;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.8;
    z-index: 5; /* Above line */
    will-change: left;
  }
</style>