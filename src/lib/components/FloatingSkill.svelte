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

    // Initial delayed appearance with Cyberpunk-style data load animation
    gsap.fromTo(element, 
      {
        opacity: 0,
        scale: 0.7,
        filter: "blur(2px)"
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.3,
        delay: initialDelay,
        ease: "power2.out",
        onComplete: () => {
          // Flash effect like data loading completion
          gsap.to(element, {
            backgroundColor: "rgba(var(--color-teal-rgb), 0.2)",
            duration: 0.1,
            yoyo: true,
            repeat: 1
          });
        }
      }
    );

    // Performance optimized floating animation - using transforms only
    // This is more GPU-friendly than animating multiple properties
    floatingTween = gsap.to(element, {
      x: `random(-10, 10)`, // Smaller range for more subtle motion
      y: `random(-10, 10)`,
      rotation: `random(-2, 2)`, // Less rotation
      duration: `random(5, 7)`, // More consistent durations
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: initialDelay + Math.random() * 0.3, // Smaller delay variation
      
      // Performance optimization
      force3D: true, // Forces 3D transforms for better GPU acceleration
      overwrite: true
    });

    // Simplified pulsing animation that uses CSS variables for performance
    // We'll only animate a single property to reduce JS overhead
    const pulseColor = Math.random() > 0.7 
      ? 'var(--color-red-rgb)' 
      : (Math.random() > 0.5 ? 'var(--color-teal-rgb)' : 'var(--color-gold-rgb)');
    
    pulseTween = gsap.to(element, {
      "--pulse-intensity": Math.random() > 0.5 ? "0.3" : "0.5", // CSS variable for glow intensity
      duration: 2 + Math.random(), // Randomized duration
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: initialDelay,
      onStart: () => {
        // Set the pulse color on start
        element.style.setProperty('--pulse-color', pulseColor);
      }
    });

    // Start glitching if enabled - with more authentic Cyberpunk 2077 style
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
    /* Base properties */
    position: absolute;
    font-family: 'Roboto Mono', monospace; /* Or your chosen mono font */
    font-size: 0.8rem;
    color: var(--color-teal); /* Use CSS variable */
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.25rem 0.5rem;
    border: 1px solid rgba(var(--color-teal-rgb), 0.5); /* Use RGB version for opacity */
    white-space: nowrap;
    z-index: 3;
    
    /* Performance optimizations */
    transform-origin: center;
    box-shadow: 0 0 5px rgba(var(--pulse-color, var(--color-teal-rgb)), var(--pulse-intensity, 0.5));
    text-shadow: 0 0 5px rgba(var(--pulse-color, var(--color-teal-rgb)), 0.8);
    will-change: transform; /* Reduced properties for better performance */
    
    /* Visual enhancements */
    backdrop-filter: blur(1px);
    
    /* Authentic Cyberpunk 2077 touch - simulating data transmission */
    border-left: 2px solid var(--color-teal);
    
    /* Accessibility - ensure good contrast */
    --high-contrast: rgba(0, 0, 0, 0.9);
    
    /* Initial state set by JS */
    /* Using CSS variable animation instead of keyframes for better performance */
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