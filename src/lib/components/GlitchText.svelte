<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  
  export let text: string = "";
  export let intensity: number = 0.3; // 0-1 scale for how often glitches occur
  export let className: string = "";
  
  let textElement: HTMLDivElement;
  let isGlitching = false;
  let originalText = text;
  let interval: ReturnType<typeof setInterval>;
  
  // Characters to use for glitch effect
  const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
  
  onMount(() => {
    // Start glitch interval
    startGlitchInterval();
    
    return () => {
      // Clean up interval on component destroy
      if (interval) clearInterval(interval);
    };
  });
  
  function startGlitchInterval() {
    // Clear any existing interval
    if (interval) clearInterval(interval);
    
    // Set random interval for glitch effect
    interval = setInterval(() => {
      // Only glitch sometimes based on intensity
      if (Math.random() < intensity && !isGlitching) {
        glitch();
      }
    }, 3000); // Check every 3 seconds
  }
  
  function glitch() {
    if (isGlitching) return;
    isGlitching = true;
    
    // Get the current text
    const currentText = originalText;
    const textLength = currentText.length;
    
    // Create glitch animation timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        isGlitching = false;
      }
    });
    
    // Number of glitch iterations
    const iterations = 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < iterations; i++) {
      // Create glitched text by replacing random characters
      const glitchedText = createGlitchedText(currentText);
      
      // Add to timeline - shorter duration for glitch frames
      timeline.to(textElement, {
        text: {
          value: glitchedText,
          delimiter: ""
        },
        duration: 0.05,
        ease: "none"
      });
    }
    
    // Return to original text
    timeline.to(textElement, {
      text: {
        value: currentText,
        delimiter: ""
      },
      duration: 0.1,
      ease: "none"
    });
  }
  
  function createGlitchedText(text: string): string {
    let result = "";
    const glitchIntensity = Math.random() * 0.1; // How many characters to replace (0-10%)
    
    for (let i = 0; i < text.length; i++) {
      // Replace with glitch character at random positions
      if (Math.random() < glitchIntensity) {
        const randomIndex = Math.floor(Math.random() * glitchChars.length);
        result += glitchChars[randomIndex];
      } else {
        result += text[i];
      }
    }
    
    return result;
  }
</script>

<div 
  class="glitch-text {className}" 
  bind:this={textElement}
  on:mouseenter={() => Math.random() < 0.5 && glitch()}
>
  {text}
</div>

<style>
  .glitch-text {
    display: inline-block;
    position: relative;
    color: #49c5b6;
    letter-spacing: 1px;
  }
  
  /* Add subtle shadow effect */
  .glitch-text:after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    color: #49c5b6;
    opacity: 0.2;
    z-index: -1;
    filter: blur(1px);
    transform: translateX(2px);
  }
</style>
