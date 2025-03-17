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
      duration: 20,
      ease: "none",
      repeat: -1
    });
    
    // Add random glitch effect occasionally
    const glitchInterval = setInterval(() => {
      // Random glitch effect
      const timeline = gsap.timeline();
      
      if (Math.random() > 0.7) { // Only trigger sometimes
        timeline
          .to(scanLinesContainer, {
            opacity: 0.5,
            duration: 0.05,
            ease: "steps(1)"
          })
          .to(scanLinesContainer, {
            opacity: 0.3,
            duration: 0.05
          });
      }
    }, 3000);
    
    return () => {
      clearInterval(glitchInterval);
    };
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
      rgba(73, 197, 182, 0.03) 2px,
      rgba(73, 197, 182, 0.03) 2px
    );
    opacity: 0.3;
    background-size: 100% 3px;
    mix-blend-mode: overlay;
  }
  
  /* Add CRT effect - enhanced flicker */
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
      rgba(0, 0, 0, 0.3) 70%,
      rgba(0, 0, 0, 0.5) 100%
    );
    animation: flicker 3s infinite;
    mix-blend-mode: multiply;
  }
  
  /* Add horizontal distortion lines */
  .scan-lines:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      rgba(73, 197, 182, 0.04) 51%,
      transparent 52%
    );
    background-size: 100% 8px;
    animation: horizontalDistortion 10s infinite alternate;
    opacity: 0.7;
    mix-blend-mode: overlay;
  }
  
  @keyframes horizontalDistortion {
    0% {
      transform: translateY(0);
    }
    10% {
      transform: translateY(1px);
    }
    20% {
      transform: translateY(-1px);
    }
    30% {
      transform: translateY(0);
    }
    70% {
      transform: translateY(0);
    }
    80% {
      transform: translateY(2px);
    }
    90% {
      transform: translateY(-1px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  @keyframes flicker {
    0% { opacity: 0.3; }
    3% { opacity: 0.4; }
    5% { opacity: 0.3; }
    10% { opacity: 0.35; }
    15% { opacity: 0.45; }
    20% { opacity: 0.3; }
    30% { opacity: 0.35; }
    40% { opacity: 0.3; }
    50% { opacity: 0.35; }
    60% { opacity: 0.3; }
    70% { opacity: 0.35; }
    80% { opacity: 0.3; }
    85% { opacity: 0.4; }
    90% { opacity: 0.3; }
    95% { opacity: 0.35; }
    100% { opacity: 0.3; }
  }
</style>
