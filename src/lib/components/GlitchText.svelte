<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let text: string = '';
  export let class_name: string = '';
  
  // Simpler implementation without dynamically changing text content
  let containerElement: HTMLElement;
  let isHovered = false;
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
  
  onMount(() => {
    if (!browser || !containerElement) return;
    
    // Just set the data-text attribute once
    containerElement.setAttribute('data-text', text);
  });
</script>

<span 
  class="glitch-text {class_name} {isHovered ? 'hover' : ''}" 
  bind:this={containerElement} 
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:focus={handleMouseEnter}
  on:blur={handleMouseLeave}
  role="presentation"
  aria-label={text}
  data-text={text}
>
  {text}
</span>

<style>
  .glitch-text {
    display: inline-block;
    position: relative;
    color: var(--color-teal); /* Use CSS variable instead of hardcoded value */
    letter-spacing: 1px;
    cursor: default;
    
    /* Authentic Cyberpunk 2077 styling */
    font-family: 'Rajdhani', 'Chakra Petch', sans-serif; /* More cyberpunk-like font */
    font-weight: 600; /* Semi-bold for better visibility */
    text-transform: uppercase; /* Many Cyberpunk UI elements use uppercase */
    
    /* Improve clarity with text shadow */
    text-shadow: 0 0 2px rgba(var(--color-teal-rgb), 0.5);
    
    /* Performance optimizations */
    will-change: transform, opacity; /* Hint for browser optimization */
    transform: translateZ(0); /* Force GPU acceleration */
  }
  
  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    opacity: 0;
    
    /* Faster transition for more responsive feel */
    transition: opacity 0.1s ease;
    
    /* Performance optimization */
    will-change: clip, text-shadow, transform;
    
    /* Critical for performance - reduce painted areas */
    backface-visibility: hidden;
  }
  
  .glitch-text::before {
    left: 1.5px; /* Reduced offset for subtler effect */
    text-shadow: -1px 0 var(--color-red); /* Use CSS variable */
    clip: rect(44px, 450px, 56px, 0);
    
    /* Faster, more efficient animation */
    animation: glitch-anim-1 3s infinite linear alternate-reverse;
    animation-play-state: paused;
  }
  
  .glitch-text::after {
    left: -1.5px; /* Reduced offset for subtler effect */
    text-shadow: -1px 0 var(--color-teal); /* Use CSS variable */
    clip: rect(44px, 450px, 56px, 0);
    
    /* Faster, more efficient animation */
    animation: glitch-anim-2 2.7s infinite linear alternate-reverse;
    animation-play-state: paused;
  }
  
  /* Show glitch effect on hover with authentic Cyberpunk styling */
  .glitch-text.hover::before,
  .glitch-text.hover::after {
    opacity: 0.85; /* Slightly reduced opacity for better readability */
    animation-play-state: running; /* Only run animations on hover for performance */
  }
  
  /* Add highlight glow on hover - authentic to Cyberpunk 2077 UI */
  .glitch-text.hover {
    text-shadow: 0 0 4px rgba(var(--color-teal-rgb), 0.8);
    animation: pulse-glow 1.5s infinite alternate;
  }
  
  /* Random pseudo-elements to simulate glitching - more specific and performance-friendly */
  .glitch-text:nth-child(3n)::before,
  .glitch-text:nth-child(3n)::after {
    animation-duration: 2.9s; /* Faster animation */
    opacity: 0.2; /* Reduced default opacity */
  }
  
  /* Cyberpunk UI often has subtle animated elements */
  @keyframes pulse-glow {
    from { text-shadow: 0 0 3px rgba(var(--color-teal-rgb), 0.7); }
    to { text-shadow: 0 0 5px rgba(var(--color-teal-rgb), 0.9); }
  }
  
  /* More authentic Cyberpunk 2077 glitch animations */
  /* Based on the game's UI with sharper, more digital distortions */
  /* Reduced keyframe count for better performance while maintaining effect */
  @keyframes glitch-anim-1 {
    0% {
      clip: rect(1px, 9999px, 6px, 0);
      transform: translateX(-1px);
    }
    20% {
      clip: rect(18px, 9999px, 22px, 0);
      transform: translateX(1px);
    }
    40% {
      clip: rect(42px, 9999px, 54px, 0);
      transform: translateX(-0.5px);
    }
    60% {
      clip: rect(12px, 9999px, 16px, 0);
      transform: translateX(0.5px);
    }
    80% {
      clip: rect(32px, 9999px, 44px, 0);
      transform: translateX(-1px);
    }
    100% {
      clip: rect(5px, 9999px, 10px, 0);
      transform: translateX(1px);
    }
  }
  
  @keyframes glitch-anim-2 {
    0% {
      clip: rect(34px, 9999px, 42px, 0);
      transform: translateX(1px) translateY(1px);
    }
    25% {
      clip: rect(16px, 9999px, 24px, 0);
      transform: translateX(-1px) translateY(-1px);
    }
    50% {
      clip: rect(4px, 9999px, 12px, 0);
      transform: translateX(1px) translateY(-0.5px);
    }
    75% {
      clip: rect(28px, 9999px, 36px, 0);
      transform: translateX(-1px) translateY(0.5px);
    }
    100% {
      clip: rect(10px, 9999px, 18px, 0);
      transform: translateX(1px) translateY(1px);
    }
  }
  
  /* Additional scanline effect animation - authentic to Cyberpunk 2077 */
  @keyframes scanline {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 0 100%;
    }
  }
</style>