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
    color: #49c5b6;
    letter-spacing: 1px;
    cursor: default;
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
    transition: opacity 0.2s ease;
  }
  
  .glitch-text::before {
    left: 2px;
    text-shadow: -1px 0 #ff5252;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim-1 5s infinite linear alternate-reverse;
  }
  
  .glitch-text::after {
    left: -2px;
    text-shadow: -1px 0 #49c5b6;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim-2 5s infinite linear alternate-reverse;
  }
  
  /* Show glitch effect on hover or periodically */
  .glitch-text.hover::before,
  .glitch-text.hover::after {
    opacity: 0.8;
  }
  
  /* Random pseudo-elements to simulate glitching */
  .glitch-text:nth-child(3n)::before,
  .glitch-text:nth-child(3n)::after {
    animation-duration: 3.7s;
    opacity: 0.3;
  }
  
  @keyframes glitch-anim-1 {
    0% {
      clip: rect(2px, 9999px, 14px, 0);
    }
    10% {
      clip: rect(26px, 9999px, 94px, 0);
    }
    20% {
      clip: rect(39px, 9999px, 30px, 0);
    }
    30% {
      clip: rect(82px, 9999px, 79px, 0);
    }
    40% {
      clip: rect(36px, 9999px, 13px, 0);
    }
    50% {
      clip: rect(22px, 9999px, 53px, 0);
    }
    60% {
      clip: rect(67px, 9999px, 98px, 0);
    }
    70% {
      clip: rect(18px, 9999px, 13px, 0);
    }
    80% {
      clip: rect(94px, 9999px, 4px, 0);
    }
    90% {
      clip: rect(22px, 9999px, 76px, 0);
    }
    100% {
      clip: rect(1px, 9999px, 48px, 0);
    }
  }
  
  @keyframes glitch-anim-2 {
    0% {
      clip: rect(68px, 9999px, 23px, 0);
    }
    10% {
      clip: rect(82px, 9999px, 64px, 0);
    }
    20% {
      clip: rect(68px, 9999px, 14px, 0);
    }
    30% {
      clip: rect(4px, 9999px, 15px, 0);
    }
    40% {
      clip: rect(11px, 9999px, 36px, 0);
    }
    50% {
      clip: rect(8px, 9999px, 4px, 0);
    }
    60% {
      clip: rect(43px, 9999px, 81px, 0);
    }
    70% {
      clip: rect(34px, 9999px, 96px, 0);
    }
    80% {
      clip: rect(13px, 9999px, 61px, 0);
    }
    90% {
      clip: rect(57px, 9999px, 30px, 0);
    }
    100% {
      clip: rect(84px, 9999px, 7px, 0);
    }
  }
</style>