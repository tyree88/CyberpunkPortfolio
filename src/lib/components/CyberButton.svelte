<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';

  // Props
  export let text: string = 'Button';
  export let variant: 'primary' | 'secondary' | 'warning' | 'danger' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let icon: string = ''; // Optional icon (use font awesome classes)
  export let loading: boolean = false;
  export let disabled: boolean = false;
  export let fullWidth: boolean = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let href: string = ''; // If provided, renders as <a> instead of <button>
  export let glitchEffect: boolean = true;
  export let scanEffect: boolean = true;
  export let pulseEffect: boolean = false; // Subtle pulsing
  export let initialDelay: number = 0;
  export let ariaLabel: string = '';
  
  // Internal state
  let buttonElement: HTMLElement;
  const dispatch = createEventDispatcher();
  
  // Handle click with optional sound effect
  function handleClick(event: MouseEvent) {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    
    // Add click effect
    if (browser && buttonElement) {
      gsap.fromTo(buttonElement, 
        { scale: 0.97 },
        { scale: 1, duration: 0.3, ease: "elastic.out(1.2, 0.3)" }
      );
    }
    
    dispatch('click', event);
  }
  
  // Keyboard handler for custom elements
  function handleKeypress(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ' ') && !disabled && !loading) {
      event.preventDefault();
      dispatch('click', event);
    }
  }
  
  onMount(() => {
    if (!browser || !buttonElement) return;
    
    // Initial animation
    gsap.from(buttonElement, {
      opacity: 0,
      y: 10,
      delay: initialDelay,
      duration: 0.5,
      ease: "power2.out"
    });
    
    // Random glitch effect
    if (glitchEffect) {
      // Schedule occasional glitch
      const scheduleGlitch = () => {
        const delay = 3 + Math.random() * 12; // Random delay between 3-15 seconds
        setTimeout(() => {
          if (!buttonElement) return;
          
          // Create glitch effect
          const glitchTimeline = gsap.timeline({
            onComplete: scheduleGlitch
          });
          
          glitchTimeline
            .to(buttonElement, {
              x: -2,
              opacity: 0.8,
              color: variant === 'primary' ? 'var(--color-gold)' : 'var(--color-teal)',
              duration: 0.1,
              ease: "steps(1)"
            })
            .to(buttonElement, {
              x: 2,
              opacity: 1,
              color: '',
              duration: 0.1,
              ease: "steps(1)"
            })
            .to(buttonElement, {
              x: 0,
              opacity: 1,
              duration: 0.1,
              ease: "steps(1)"
            });
        }, delay * 1000);
      };
      
      // Start the glitch cycle
      scheduleGlitch();
    }
  });
</script>

{#if href}
  <a
    {href}
    class="cyber-button {variant} {size}"
    class:loading={loading}
    class:disabled={disabled}
    class:full-width={fullWidth}
    class:glitch-effect={glitchEffect}
    class:scan-effect={scanEffect}
    class:pulse-effect={pulseEffect}
    bind:this={buttonElement}
    on:click={handleClick}
    aria-disabled={disabled}
    role="button"
    tabindex={disabled ? -1 : 0}
    aria-label={ariaLabel || text}
  >
    <div class="button-content">
      {#if loading}
        <div class="loading-indicator"></div>
      {/if}
      {#if icon}
        <i class={icon}></i>
      {/if}
      <span class="button-text">{text}</span>
    </div>
    <div class="button-borders">
      <div class="border-top-left"></div>
      <div class="border-top-right"></div>
      <div class="border-bottom-right"></div>
      <div class="border-bottom-left"></div>
    </div>
  </a>
{:else}
  <button
    {type}
    class="cyber-button {variant} {size}"
    class:loading={loading}
    class:disabled={disabled}
    class:full-width={fullWidth}
    class:glitch-effect={glitchEffect}
    class:scan-effect={scanEffect}
    class:pulse-effect={pulseEffect}
    bind:this={buttonElement}
    on:click={handleClick}
    disabled={disabled}
    aria-label={ariaLabel || text}
  >
    <div class="button-content">
      {#if loading}
        <div class="loading-indicator"></div>
      {/if}
      {#if icon}
        <i class={icon}></i>
      {/if}
      <span class="button-text">{text}</span>
    </div>
    <div class="button-borders">
      <div class="border-top-left"></div>
      <div class="border-top-right"></div>
      <div class="border-bottom-right"></div>
      <div class="border-bottom-left"></div>
    </div>
  </button>
{/if}

<style>
  .cyber-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: var(--color-teal);
    font-family: 'Roboto Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0;
    cursor: pointer;
    border: none;
    outline: none;
    text-decoration: none;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s, color 0.2s;
    /* Better performance with GPU acceleration */
    will-change: transform;
    transform: translateZ(0);
  }
  
  /* Size variations */
  .cyber-button.small {
    min-height: 32px;
    min-width: 80px;
    font-size: 0.75rem;
  }
  
  .cyber-button.medium {
    min-height: 40px;
    min-width: 120px;
    font-size: 0.85rem;
  }
  
  .cyber-button.large {
    min-height: 48px;
    min-width: 160px;
    font-size: 1rem;
  }
  
  .full-width {
    width: 100%;
  }
  
  /* Button content container */
  .button-content {
    position: relative;
    z-index: 2;
    padding: 0.8rem 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
  /* Icon styles */
  i {
    margin-right: 8px;
  }
  
  /* Variant styles */
  .primary {
    border: 1px solid var(--color-teal);
    box-shadow: 0 0 10px rgba(var(--color-teal-rgb), 0.3);
    color: var(--color-teal);
  }
  
  .secondary {
    border: 1px solid var(--color-gold);
    box-shadow: 0 0 10px rgba(var(--color-gold-rgb), 0.3);
    color: var(--color-gold);
  }
  
  .warning {
    border: 1px solid var(--color-gold);
    box-shadow: 0 0 10px rgba(var(--color-gold-rgb), 0.3);
    color: var(--color-gold);
  }
  
  .danger {
    border: 1px solid var(--color-red);
    box-shadow: 0 0 10px rgba(var(--color-red-rgb), 0.3);
    color: var(--color-red);
  }
  
  /* Corner border elements */
  .button-borders {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
  }
  
  .border-top-left, .border-top-right, .border-bottom-left, .border-bottom-right {
    position: absolute;
    width: 8px;
    height: 8px;
  }
  
  .border-top-left {
    top: 0;
    left: 0;
    border-top: 2px solid currentColor;
    border-left: 2px solid currentColor;
  }
  
  .border-top-right {
    top: 0;
    right: 0;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
  }
  
  .border-bottom-left {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid currentColor;
    border-left: 2px solid currentColor;
  }
  
  .border-bottom-right {
    bottom: 0;
    right: 0;
    border-bottom: 2px solid currentColor;
    border-right: 2px solid currentColor;
  }
  
  /* Hover and focus styles */
  .cyber-button:hover, .cyber-button:focus-visible {
    transform: translateY(-2px);
  }
  
  .primary:hover, .primary:focus-visible {
    box-shadow: 0 0 15px rgba(var(--color-teal-rgb), 0.5);
    background-color: rgba(var(--color-teal-rgb), 0.15);
  }
  
  .secondary:hover, .secondary:focus-visible {
    box-shadow: 0 0 15px rgba(var(--color-gold-rgb), 0.5);
    background-color: rgba(var(--color-gold-rgb), 0.15);
  }
  
  .warning:hover, .warning:focus-visible {
    box-shadow: 0 0 15px rgba(var(--color-gold-rgb), 0.5);
    background-color: rgba(var(--color-gold-rgb), 0.15);
  }
  
  .danger:hover, .danger:focus-visible {
    box-shadow: 0 0 15px rgba(var(--color-red-rgb), 0.5);
    background-color: rgba(var(--color-red-rgb), 0.15);
  }
  
  /* Active (pressed) state */
  .cyber-button:active:not(.disabled):not(.loading) {
    transform: translateY(1px);
  }
  
  /* Disabled state */
  .cyber-button.disabled, .cyber-button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none !important;
    transform: none !important;
  }
  
  /* Loading state */
  .loading-indicator {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  /* Scan effect */
  .scan-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    z-index: 1;
    pointer-events: none;
    animation: scanEffect 3s ease-in-out infinite;
  }
  
  @keyframes scanEffect {
    0% { left: -100%; }
    100% { left: 200%; }
  }
  
  /* Pulse effect */
  .pulse-effect {
    animation: pulseEffect 3s ease-in-out infinite;
  }
  
  @keyframes pulseEffect {
    0%, 100% {
      box-shadow: 0 0 10px rgba(var(--color-teal-rgb), 0.3);
    }
    50% {
      box-shadow: 0 0 15px rgba(var(--color-teal-rgb), 0.6);
    }
  }
  
  /* Glitch effect is handled via JS/GSAP */
</style>