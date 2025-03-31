<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';

  export let text: string;
  export let x: number; // Percentage
  export let y: number; // Percentage
  export let initialDelay: number = 0;
  export let glitch: boolean = false; // Whether to enable occasional glitching

  let element: HTMLElement;
  let floatingTween: gsap.core.Tween | null = null;
  let pulseTween: gsap.core.Tween | null = null;
  let glitchTimeline: gsap.core.Timeline | null = null;
  let glitchTimeout: number | undefined = undefined;

  // Function to schedule random glitch effects for this skill
  function scheduleSkillGlitch() {
    if (!glitch || !browser || !element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Reduced delay for more frequency
    const delay = 1.5 + Math.random() * 5; 

    glitchTimeout = window.setTimeout(() => {
      // Store original values to restore later
      const originalColor = element.style.color || 'var(--color-teal)'; 
      const originalTransform = element.style.transform; 
      const originalTextShadow = element.style.textShadow || 'none';
      const originalBoxShadow = element.style.boxShadow || 'none';

      glitchTimeline = gsap.timeline({
        onComplete: scheduleSkillGlitch // Schedule next glitch
      });

      // Increased intensity glitch animation
      glitchTimeline
        .to(element, {
          x: '+=5', // Increased horizontal shift
          color: 'var(--color-red)', 
          textShadow: '0 0 5px var(--color-red)',
          boxShadow: '0 0 8px var(--color-red)',
          scale: 1.02, // Slight scale up
          duration: 0.06, // Slightly longer duration
          ease: "steps(1)"
        })
        .to(element, {
          x: '-=10', // Increased opposite shift
          color: 'var(--color-gold)', 
          textShadow: '0 0 5px var(--color-gold)',
          boxShadow: '0 0 8px var(--color-gold)',
          scale: 0.98, // Slight scale down
          duration: 0.06,
          ease: "steps(1)"
        })
        .to(element, {
          x: '+=5', // Return shift
          color: originalColor,
          textShadow: originalTextShadow,
          boxShadow: originalBoxShadow,
          scale: 1, // Return to normal scale
          // transform: originalTransform, // Avoid resetting transform directly if floating tween is active
          duration: 0.08,
          ease: "steps(1)"
        });
    }, delay * 1000);
  }

  onMount(() => {
    if (!browser || !element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // If no motion, just set final state
        gsap.set(element, { opacity: 1 });
        return;
    }

    // Initial delayed appearance
    gsap.to(element, {
      opacity: 1,
      duration: 0.5,
      delay: initialDelay,
      ease: "power1.inOut"
    });

    // Floating animation
    floatingTween = gsap.to(element, {
      x: `random(-15, 15)`,
      y: `random(-15, 15)`,
      rotation: `random(-3, 3)`,
      duration: `random(4, 8)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: initialDelay + Math.random() * 0.5 // Add slight random offset to start
    });

    // Pulsing animation (scale and shadow)
    pulseTween = gsap.to(element, {
      scale: `random(0.95, 1.05)`,
      // Use CSS variables for colors
      boxShadow: Math.random() > 0.5
        ? '0 0 8px rgba(var(--color-teal-rgb), 0.7)' // Assumes --color-teal-rgb exists
        : '0 0 8px rgba(var(--color-red-rgb), 0.7)', // Assumes --color-red-rgb exists
      duration: `random(2, 4)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: initialDelay + Math.random() * 2
    });

    // Start glitching if enabled
    if (glitch) {
      scheduleSkillGlitch();
    }
  });

  onDestroy(() => {
    floatingTween?.kill();
    pulseTween?.kill();
    glitchTimeline?.kill();
    if (glitchTimeout) clearTimeout(glitchTimeout);
  });
</script>

<div
  class="floating-skill"
  bind:this={element}
  style="left: {x}%; top: {y}%; opacity: 0;"
>
  {text}
</div>

<style>
  .floating-skill {
    position: absolute;
    font-family: 'Roboto Mono', monospace; /* Or your chosen mono font */
    font-size: 0.8rem;
    color: var(--color-teal); /* Use CSS variable */
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.25rem 0.5rem;
    border: 1px solid rgba(var(--color-teal-rgb), 0.5); /* Use RGB version for opacity */
    white-space: nowrap;
    z-index: 3;
    transform-origin: center;
    box-shadow: 0 0 5px rgba(var(--color-teal-rgb), 0.5);
    text-shadow: 0 0 5px rgba(var(--color-teal-rgb), 0.8);
    backdrop-filter: blur(1px);
    will-change: transform, opacity, box-shadow, color, text-shadow; /* Performance hint */
    animation: cycleSkillGlow 9s ease-in-out infinite; /* Apply new color cycle animation */
    /* Initial state set by JS */
  }

  /* Corner elements */
  .floating-skill::before,
  .floating-skill::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    border-color: var(--color-red); /* Use CSS variable */
    border-style: solid;
  }

  .floating-skill::before {
    top: -1px; /* Adjust for border */
    left: -1px;
    border-width: 1px 0 0 1px;
  }

  .floating-skill::after {
    bottom: -1px;
    right: -1px;
    border-width: 0 1px 1px 0;
  }

  /* Enhanced hover effect */
  .floating-skill:hover {
      /* Slightly larger scale on hover */
      transform: scale(1.15);
      /* Use gold color for border and glow */
      border-color: rgba(var(--color-gold-rgb), 0.8);
      box-shadow: 0 0 12px rgba(var(--color-gold-rgb), 0.7);
      text-shadow: 0 0 8px rgba(var(--color-gold-rgb), 0.9);
      /* Ensure it's above others */
      z-index: 10;
      /* Smooth transition for the hover effect */
      transition: transform 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out, text-shadow 0.2s ease-out;
      /* Pause the cycling animation on hover for clarity */
      animation-play-state: paused;
  }

 @keyframes cycleSkillGlow {
   0%, 100% { 
     border-color: rgba(var(--color-teal-rgb), 0.5);
     box-shadow: 0 0 5px rgba(var(--color-teal-rgb), 0.5);
     text-shadow: 0 0 5px rgba(var(--color-teal-rgb), 0.8);
   }
   33% { 
     border-color: rgba(var(--color-red-rgb), 0.5);
     box-shadow: 0 0 7px rgba(var(--color-red-rgb), 0.5); /* Slightly larger shadow for red */
     text-shadow: 0 0 5px rgba(var(--color-red-rgb), 0.8);
   }
   66% { 
     border-color: rgba(var(--color-gold-rgb), 0.5);
     box-shadow: 0 0 6px rgba(var(--color-gold-rgb), 0.5); /* Slightly different shadow for gold */
     text-shadow: 0 0 5px rgba(var(--color-gold-rgb), 0.8);
   }
 }
</style>