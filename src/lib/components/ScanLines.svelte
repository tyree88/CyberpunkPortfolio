<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  
  let scanLinesContainer: HTMLElement;
  
  onMount(() => {
    // Skip animations if not in browser environment
    if (!browser) return;
    
    // Add slight animation to scan lines
    gsap.to(scanLinesContainer, {
      backgroundPosition: "0 100%",
      duration: 30,
      ease: "none",
      repeat: -1
    });
  });
</script>

<div class="scan-lines" bind:this={scanLinesContainer}></div>

<style>
  .scan-lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
    background: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 1px,
      rgba(0, 0, 0, 0.05) 2px,
      rgba(0, 0, 0, 0.05) 2px
    );
    opacity: 0.2;
    background-size: 100% 4px;
  }
  
  /* Add CRT effect - subtle flicker */
  .scan-lines:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 80%,
      rgba(0, 0, 0, 0.4) 100%
    );
    animation: flicker 5s infinite;
  }
  
  @keyframes flicker {
    0% { opacity: 0.2; }
    5% { opacity: 0.25; }
    10% { opacity: 0.2; }
    15% { opacity: 0.3; }
    20% { opacity: 0.2; }
    70% { opacity: 0.2; }
    75% { opacity: 0.3; }
    80% { opacity: 0.2; }
    85% { opacity: 0.25; }
    90% { opacity: 0.23; }
    100% { opacity: 0.2; }
  }
</style>
