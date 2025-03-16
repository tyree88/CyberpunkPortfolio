<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  import ScanLines from '$lib/components/ScanLines.svelte';
  import CursorTrail from '$lib/components/CursorTrail.svelte';
  import '../lib/styles/global.css';
  import '../lib/styles/cyberpunk.css';

  onMount(() => {
    // Skip animations if not in browser environment
    if (!browser) return;
    
    // Initialize GSAP animations
    gsap.to('body', { 
      opacity: 1, 
      duration: 1.5, 
      ease: 'power2.inOut',
      delay: 0.3
    });

    // Random glitch effect on load
    const glitchTimeline = gsap.timeline();
    glitchTimeline
      .to('body', { 
        skewX: 20, 
        duration: 0.1,
        opacity: 0.8
      })
      .to('body', { 
        skewX: 0, 
        duration: 0.1,
        opacity: 1
      })
      .to('body', { 
        opacity: 0.95, 
        duration: 0.1 
      })
      .to('body', { 
        opacity: 1, 
        duration: 0.1 
      });
  });
</script>

<div class="cyberpunk-container">
  <ScanLines />
  <CursorTrail />
  <slot />
</div>

<style>
  .cyberpunk-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #000000;
    color: #49c5b6;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    opacity: 0;
    background-color: #000000;
    font-family: 'Roboto Mono', monospace;
  }
</style>
