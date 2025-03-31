<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let text: string = '';
  export let speed: number = 2500; // Characters per second
  export let delay: number = 5; // Delay before starting in ms
  export let cursor: boolean = true; // Show cursor
  
  let container: HTMLElement;
  let displayText = '';
  let typingComplete = false;
  
  // Cyberpunk style: add occasional random character glitches during typing
  const glitchChars = '!<>[]{}#$%^&*-_+=|\\/:.;?"\'~←→↑↓■□▲▼';
  
  // Get a random glitch character
  const getGlitchChar = () => glitchChars[Math.floor(Math.random() * glitchChars.length)];
  
  // Performance optimization: Pre-calculate typing effects
  const shouldGlitch = (i: number) => Math.random() < 0.2 && i > 0; // 20% chance of glitching
  const getTypingSpeed = () => (1000 / speed) * (0.8 + Math.random() * 0.4); // Varied typing speed
  
  onMount(() => {
    if (!browser) {
      // For server-side rendering, show the full text
      displayText = text;
      typingComplete = true;
      return;
    }
    
    // Reset for client-side animation
    displayText = '';
    typingComplete = false;
    
    // Start typing after delay - reduced for more responsive feel
    const typingTimeout = setTimeout(() => {
      let index = 0;
      
      // Using a more efficient approach with requestAnimationFrame for smoother animation
      const typeNextChar = () => {
        if (index < text.length) {
          // Get the current character
          const currentChar = text.charAt(index);
          
          // Authentic Cyberpunk 2077 effect: occasionally (randomly) show a glitched character first
          // then quickly replace it with the correct one
          if (shouldGlitch(index)) {
            // Show a glitch character first
            displayText += getGlitchChar();
            
            // Then replace it with the correct character after a very brief delay
            setTimeout(() => {
              displayText = displayText.substring(0, index) + currentChar;
            }, 50); // Very quick glitch effect
          } else {
            // Regular typing without glitch
            displayText += currentChar;
          }
          
          index++;
          
          // Variable typing speed for more natural and dynamic feel
          setTimeout(typeNextChar, getTypingSpeed());
        } else {
          typingComplete = true;
          
          // Cyberpunk 2077 effect: occasionally glitch even after typing is complete
          if (cursor) {
            scheduleRandomGlitches();
          }
        }
      };
      
      // Start the typing animation
      typeNextChar();
      
    }, delay);
    
    // Function to occasionally glitch the text after typing is complete
    const scheduleRandomGlitches = () => {
      setTimeout(() => {
        if (Math.random() < 0.3) { // 30% chance to trigger a glitch
          // Save original text
          const originalText = displayText;
          
          // Create glitched version (replace 1-2 random characters)
          const glitchedChars = originalText.split('');
          const numGlitchChars = Math.floor(Math.random() * 2) + 1;
          
          for (let i = 0; i < numGlitchChars; i++) {
            const glitchPos = Math.floor(Math.random() * originalText.length);
            glitchedChars[glitchPos] = getGlitchChar();
          }
          
          // Display glitched text briefly
          displayText = glitchedChars.join('');
          
          // Restore original after brief moment
          setTimeout(() => {
            displayText = originalText;
            // Schedule next potential glitch
            scheduleRandomGlitches();
          }, 100);
        } else {
          // No glitch this time, schedule next check
          scheduleRandomGlitches();
        }
      }, 3000 + Math.random() * 5000); // Random interval between 3-8 seconds
    };
    
    return () => {
      clearTimeout(typingTimeout);
    };
  });
</script>

<span class="typewriter-container" bind:this={container}>
  <span class="typewriter-text">{displayText}</span>
  {#if cursor}
    <span class="cursor" class:blinking={typingComplete}>|</span>
  {/if}
</span>

<style>
  .typewriter-container {
    display: inline-block;
    position: relative;
    
    /* Performance optimization */
    will-change: contents;
    
    /* Add subtle tech glow to enhance Cyberpunk look */
    text-shadow: 0 0 2px rgba(var(--color-teal-rgb), 0.4);
  }
  
  .typewriter-text {
    /* Authentic Cyberpunk 2077 terminal styling */
    font-family: 'Rajdhani', 'Chakra Petch', 'Roboto Mono', monospace;
    letter-spacing: 0.5px;
    
    /* Provide a subtle highlight to make text more visible */
    text-shadow: 0 0 1px rgba(var(--color-teal-rgb), 0.7);
    
    /* For accessibility - ensure good contrast */
    color: var(--color-teal);
    
    /* Performance optimization */
    transform: translateZ(0); /* Force GPU acceleration */
  }
  
  .cursor {
    display: inline-block;
    width: 2px;
    height: 1.1em; /* Slightly taller cursor */
    background-color: var(--color-teal); /* Use CSS variable */
    margin-left: 2px;
    animation: none;
    vertical-align: middle;
    opacity: 0.9;
    
    /* Authentic Cyberpunk cursor shape */
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 80%,
      50% 100%,
      0% 80%
    );
    
    /* Performance optimization */
    will-change: opacity;
  }
  
  .cursor.blinking {
    /* Sharper, more digital-looking blink for Cyberpunk style */
    animation: cyberblink 1.2s infinite step-end;
  }
  
  /* Modified animation for more tech/digital feel */
  @keyframes cyberblink {
    0%, 100% { opacity: 0.9; }
    10%, 40% { opacity: 0; } /* Non-symmetrical timing for more computer-like effect */
    50%, 90% { opacity: 0.9; }
  }
  
  /* Additional Cyberpunk-style scan line effect */
  .typewriter-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      transparent 50%,
      rgba(var(--color-teal-rgb), 0.05) 50%,
      transparent 100%
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 1;
  }
</style>