<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';

  /**
   * FloatingSkill.svelte
   * Represents a single floating skill element with cyberpunk styling and animation.
   */

  export let skillName: string;
  export let initialX: number; // Percentage
  export let initialY: number; // Percentage
  export let index: number; // For staggering delays

  let element: HTMLElement;
  let ctx: gsap.Context;

  // Cyberpunk prefixes and suffixes for visual diversity
  const cyberpunkPrefixes = ['>', 'SYS:', '[v]', '//', 'NET:', '*', 'RAM:'];
  const cyberpunkSuffixes = ['<<', '.exe', '::', '_v2', '--', '+'];

  // Apply cyberpunk formatting randomly
  let displaySkill = skillName;
  if (index % 4 === 0) {
    const prefix = cyberpunkPrefixes[Math.floor(Math.random() * cyberpunkPrefixes.length)];
    displaySkill = `${prefix} ${skillName}`;
  } else if (index % 5 === 0) {
    const suffix = cyberpunkSuffixes[Math.floor(Math.random() * cyberpunkSuffixes.length)];
    displaySkill = `${skillName} ${suffix}`;
  }

  onMount(() => {
    ctx = gsap.context(() => {
      // Initial position & appearance animation (handled by parent or Svelte transition)
      // gsap.from(element, { opacity: 0, scale: 0.5, duration: 0.5, delay: 0.5 + index * 0.05 });

      // Dynamic floating animation
      gsap.to(element, {
        x: `random(-15, 15)`,
        y: `random(-15, 15)`,
        rotation: `random(-3, 3)`,
        duration: `random(4, 8)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.08
      });

      // Slight pulsing effect
      gsap.to(element, {
        scale: `random(0.95, 1.05)`,
        boxShadow: index % 2 === 0
          ? '0 0 8px rgba(73, 197, 182, 0.7)'
          : '0 0 8px rgba(255, 82, 82, 0.7)',
        duration: `random(2, 4)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: `random(0, 2)`
      });

      // Occasional glitch effect
      if (index % 6 === 0) {
        scheduleSkillGlitch(element);
      }

    }, element); // Scope animations to this component's element
  });

  onDestroy(() => {
    ctx?.revert(); // Cleanup GSAP animations and contexts
  });

  // Function to schedule glitch effect for this skill
  function scheduleSkillGlitch(el: HTMLElement) {
    const delay = 3 + Math.random() * 10;

    gsap.delayedCall(delay, () => {
      if (!ctx || !ctx.isActive()) return; // Check if context is still active

      const originalColor = el.style.color || '#49c5b6';
      const originalTransform = el.style.transform;

      const glitchTl = gsap.timeline({
        onComplete: () => scheduleSkillGlitch(el) // Schedule next glitch
      });

      glitchTl
        .to(el, {
          x: '+=3',
          color: '#ff5252',
          textShadow: '0 0 5px #ff5252',
          duration: 0.08,
          ease: "steps(1)"
        })
        .to(el, {
          x: '-=6',
          color: '#ecd06f',
          textShadow: '0 0 5px #ecd06f',
          duration: 0.08,
          ease: "steps(1)"
        })
        .to(el, {
          x: '+=3',
          color: originalColor,
          textShadow: '0 0 5px rgba(73, 197, 182, 0.8)',
          // transform: originalTransform, // Avoid resetting transform if floating animation is running
          duration: 0.08,
          ease: "steps(1)"
        });
    });
  }

</script>

<div
  bind:this={element}
  class="floating-skill"
  style="left: {initialX}%; top: {initialY}%; transform: rotate({-2 + Math.random() * 4}deg);"
>
  {displaySkill}
</div>

<style>
  .floating-skill {
    position: absolute;
    font-size: 0.8rem;
    color: #49c5b6;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.25rem 0.5rem;
    border: 1px solid rgba(73, 197, 182, 0.5);
    white-space: nowrap;
    z-index: 3;
    transform-origin: center;
    box-shadow: 0 0 5px rgba(73, 197, 182, 0.5);
    text-shadow: 0 0 5px rgba(73, 197, 182, 0.8);
    backdrop-filter: blur(1px);
    opacity: 0; /* Start hidden, parent/transition will reveal */
    will-change: transform, opacity, box-shadow, color, text-shadow; /* Optimize animations */
  }

  .floating-skill::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    border-top: 1px solid #ff5252;
    border-left: 1px solid #ff5252;
  }

  .floating-skill::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 5px;
    height: 5px;
    border-bottom: 1px solid #ff5252;
    border-right: 1px solid #ff5252;
  }

  /* Removed skillGlow keyframes - handled by GSAP */
</style>