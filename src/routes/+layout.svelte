<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  import ScanLines from '$lib/components/ScanLines.svelte';
  import CursorTrail from '$lib/components/CursorTrail.svelte';
  import InteractiveBackground from '$lib/components/InteractiveBackground.svelte';
  import '../lib/styles/variables.css';
  import '../lib/styles/global.css';
  import '../lib/styles/cyberpunk.css';

  // Register GSAP plugins conditionally when in browser
  if (browser) {
    import('gsap/TextPlugin').then(module => {
      gsap.registerPlugin(module.TextPlugin);
    });
  }

  // Interactive background colors
  const bgColor = '#49c5b6'; // Cyberpunk teal
  const bgIntensity = 0.8; // Slightly subtle
  const bgDensity = 100; // More particles for complexity

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

    // Random glitch effect on load - more subtle
    const glitchTimeline = gsap.timeline();
    glitchTimeline
      .to('body', { 
        skewX: 10, // Reduced skew
        duration: 0.1,
        opacity: 0.9 // Less opacity change
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
  <!-- 3D interactive background -->
  <InteractiveBackground 
    color={bgColor} 
    intensity={bgIntensity} 
    density={bgDensity} 
  />
  
  <!-- Other UI components -->
  <ScanLines />
  <CursorTrail />
  
  <!-- Page content -->
  <div class="content-container">
    <slot />
  </div>
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

  .content-container {
    position: relative;
    z-index: 10; /* Ensure content stays above background */
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    opacity: 0;
    background-color: #000000;
    font-family: 'Roboto Mono', monospace;
  }
</style>
