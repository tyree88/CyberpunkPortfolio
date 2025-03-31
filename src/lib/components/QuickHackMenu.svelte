<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  
  export let options: { id: string, label: string, description: string, ramCost: number, category: string }[] = [];
  export let initialDelay: number = 0;
  export let show: boolean = false;
  
  const dispatch = createEventDispatcher();
  let menuContainer: HTMLElement;
  let selectedIndex = 0;
  let timeline: gsap.core.Timeline | null = null;
  
  $: if (show && browser) {
    showMenu();
  } else if (!show && browser && timeline) {
    hideMenu();
  }
  
  function showMenu() {
    if (!menuContainer || !browser) return;
    
    // Kill any existing animation
    if (timeline) timeline.kill();
    
    // Create new timeline with staggered animations for options
    timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // Reset and show container
    gsap.set(menuContainer, { opacity: 0, scale: 0.9 });
    menuContainer.style.display = 'flex';
    
    // Animate container
    timeline.to(menuContainer, { 
      opacity: 1, 
      scale: 1, 
      duration: 0.3,
      delay: initialDelay
    });
    
    // Animate options with stagger
    timeline.from('.quick-hack-option', { 
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.4
    }, '-=0.1');
    
    // Reset selection
    selectedIndex = 0;
    updateSelection();
  }
  
  function hideMenu() {
    if (!menuContainer || !browser || !timeline) return;
    
    // Create hide animation
    gsap.to(menuContainer, { 
      opacity: 0, 
      scale: 0.9, 
      duration: 0.2,
      onComplete: () => {
        menuContainer.style.display = 'none';
      }
    });
  }
  
  function selectOption(index: number) {
    selectedIndex = index;
    updateSelection();
    
    // Dispatch selection event
    if (options[selectedIndex]) {
      dispatch('select', options[selectedIndex]);
    }
  }
  
  function updateSelection() {
    // Update visual selection state
    document.querySelectorAll('.quick-hack-option').forEach((el, i) => {
      if (i === selectedIndex) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if (!show) return;
    
    switch(event.key) {
      case 'ArrowUp':
        event.preventDefault();
        selectedIndex = (selectedIndex > 0) ? selectedIndex - 1 : options.length - 1;
        updateSelection();
        break;
      case 'ArrowDown':
        event.preventDefault();
        selectedIndex = (selectedIndex < options.length - 1) ? selectedIndex + 1 : 0;
        updateSelection();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        selectOption(selectedIndex);
        break;
      case 'Escape':
        event.preventDefault();
        dispatch('close');
        break;
    }
  }
  
  onMount(() => {
    if (browser) {
      window.addEventListener('keydown', handleKeydown);
      
      // Initialize with proper display state
      if (menuContainer) {
        menuContainer.style.display = show ? 'flex' : 'none';
      }
    }
    
    return () => {
      if (browser) {
        window.removeEventListener('keydown', handleKeydown);
      }
    };
  });
</script>

<div 
  class="quick-hack-menu" 
  bind:this={menuContainer} 
  role="menu" 
  aria-label="Quick Hack Options"
>
  <div class="menu-header">
    <div class="menu-title">QUICK HACKS</div>
    <div class="ram-indicator">
      <span>RAM:</span>
      <div class="ram-bar">
        {#each Array(10) as _, i}
          <div class="ram-unit" class:ram-used={i < 5}></div>
        {/each}
      </div>
      <span>5/10</span>
    </div>
  </div>
  
  <div class="menu-options">
    {#each options as option, i}
      <div 
        class="quick-hack-option"
        class:selected={i === selectedIndex}
        role="menuitem"
        tabindex={i === selectedIndex ? 0 : -1}
        on:click={() => selectOption(i)}
        on:keypress={(e) => e.key === 'Enter' && selectOption(i)}
        aria-current={i === selectedIndex ? 'true' : undefined}
      >
        <div class="option-header">
          <span class="option-name">{option.label}</span>
          <span class="option-cost">RAM: {option.ramCost}</span>
        </div>
        <div class="option-description">{option.description}</div>
        <div class="option-decoration">
          <div class="option-brackets"></div>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .quick-hack-menu {
    position: absolute;
    z-index: 100;
    background: rgba(0, 0, 0, 0.85);
    border: 1px solid var(--color-teal);
    width: 350px;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    color: var(--color-teal);
    font-family: 'Roboto Mono', monospace;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 20px rgba(var(--color-teal-rgb), 0.5);
    max-height: 80vh;
    overflow: hidden;
    transform-origin: top right;
    margin: 0;
    padding: 0;
    /* Hidden by default, controlled by JS */
    display: none;
  }
  
  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: rgba(var(--color-teal-rgb), 0.2);
    border-bottom: 1px solid var(--color-teal);
  }
  
  .menu-title {
    font-size: 1rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--color-teal);
  }
  
  .ram-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
  }
  
  .ram-bar {
    display: flex;
    gap: 2px;
  }
  
  .ram-unit {
    width: 6px;
    height: 10px;
    background: rgba(var(--color-teal-rgb), 0.3);
  }
  
  .ram-used {
    background: var(--color-teal);
    box-shadow: 0 0 4px var(--color-teal);
  }
  
  .menu-options {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
  }
  
  .quick-hack-option {
    position: relative;
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(var(--color-teal-rgb), 0.3);
    padding: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    overflow: hidden;
  }
  
  .quick-hack-option::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    background: rgba(var(--color-teal-rgb), 0.5);
    transition: all 0.2s ease;
  }
  
  .quick-hack-option.selected {
    background: rgba(var(--color-teal-rgb), 0.15);
    border-color: var(--color-teal);
    /* Add scan effect to selected item */
    position: relative;
    overflow: hidden;
  }
  
  .quick-hack-option.selected::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(var(--color-teal-rgb), 0.2),
      transparent
    );
    animation: scanEffect 1.5s ease-in-out infinite;
  }
  
  @keyframes scanEffect {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  .quick-hack-option.selected::before {
    background: var(--color-teal);
    box-shadow: 0 0 10px rgba(var(--color-teal-rgb), 0.7);
  }
  
  .option-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }
  
  .option-name {
    font-weight: bold;
    color: var(--color-teal);
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  
  .option-cost {
    color: var(--color-gold);
    font-size: 0.8rem;
  }
  
  .option-description {
    font-size: 0.75rem;
    color: var(--color-light-gray);
    margin-left: 5px;
  }
  
  .option-decoration {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 15px;
    overflow: hidden;
    opacity: 0.5;
  }
  
  /* Small screen adaptations */
  @media (max-width: 600px) {
    .quick-hack-menu {
      width: 300px;
    }
    
    .option-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .ram-indicator {
      font-size: 0.7rem;
    }
  }
</style>