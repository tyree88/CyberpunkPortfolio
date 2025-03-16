<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let text: string = '';
  export let speed: number = 1500; // Characters per second
  export let delay: number = 5; // Delay before starting in ms
  export let cursor: boolean = true; // Show cursor
  
  let container: HTMLElement;
  let displayText = '';
  let typingComplete = false;
  
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
    
    // Calculate typing interval
    const typingInterval = 1000 / speed;
    
    // Start typing after delay
    const typingTimeout = setTimeout(() => {
      let index = 0;
      
      const typingTimer = setInterval(() => {
        if (index < text.length) {
          displayText += text.charAt(index);
          index++;
        } else {
          clearInterval(typingTimer);
          typingComplete = true;
        }
      }, typingInterval);
      
      return () => {
        clearInterval(typingTimer);
        clearTimeout(typingTimeout);
      };
    }, delay);
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
  }
  
  .typewriter-text {
    font-family: 'Roboto Mono', monospace;
  }
  
  .cursor {
    display: inline-block;
    width: 2px;
    height: 1em;
    background-color: #49c5b6;
    margin-left: 2px;
    animation: none;
    vertical-align: middle;
    opacity: 0.8;
  }
  
  .cursor.blinking {
    animation: blink 1s infinite step-end;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0; }
  }
</style>