<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  
  export let text: string = '';
  export let speed: number = 20; // Characters per second
  export let startDelay: number = 0; // Delay before typing starts
  export let cursor: boolean = true;
  export let typingVariability: number = 0.2; // Randomness in typing (0-1)
  
  let displayText = '';
  let textElement: HTMLElement;
  let cursorElement: HTMLElement;
  let isTyping = false;
  let initialRender = true;
  
  onMount(() => {
    if (initialRender) {
      initialRender = false;
      startTyping();
    }
    
    return () => {
      // Clear any running animations on unmount
      gsap.killTweensOf({});
    };
  });
  
  function startTyping() {
    if (isTyping) return;
    isTyping = true;
    displayText = '';
    
    // Calculate duration based on text length and speed
    const baseDuration = text.length / speed;
    
    // Create GSAP timeline for typing
    const timeline = gsap.timeline({
      delay: startDelay,
      onComplete: () => {
        isTyping = false;
        
        // Blink cursor after typing is complete
        if (cursor && cursorElement) {
          gsap.to(cursorElement, {
            opacity: 0,
            repeat: -1,
            yoyo: true,
            duration: 0.6
          });
        }
      }
    });
    
    // Type out text character by character
    timeline.to(textElement, {
      duration: baseDuration,
      text: {
        value: text,
        delimiter: "", // Type character by character
        speed: 1, // Speed multiplier
        scramble: {
          chars: "!<>-_\\/[]{}%#", // Characters for scramble effect
          chance: 0.1, // Chance of scramble
          revealDelay: 0.1 // Delay before revealing correct character
        },
        type: "diff" // Use efficient diffing algorithm
      },
      ease: "none",
      onUpdate: function() {
        // Random glitch effect during typing
        if (Math.random() < 0.01) { // 1% chance each update
          const glitchDuration = 0.05;
          gsap.to(textElement, {
            opacity: 0.7,
            skewX: 5,
            duration: glitchDuration,
            yoyo: true,
            repeat: 1
          });
        }
      }
    });
  }
</script>

<div class="typewriter-container">
  <span class="typewriter-text" bind:this={textElement}>{displayText}</span>
  {#if cursor}
    <span class="cursor" bind:this={cursorElement}>_</span>
  {/if}
</div>

<style>
  .typewriter-container {
    position: relative;
    display: inline-block;
  }
  
  .typewriter-text {
    white-space: pre-wrap;
    line-height: 1.6;
  }
  
  .cursor {
    display: inline-block;
    color: #49c5b6;
    font-weight: bold;
    margin-left: 2px;
  }
</style>
