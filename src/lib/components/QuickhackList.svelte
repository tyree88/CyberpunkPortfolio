<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { currentSection, navigateTo, goBack } from '$lib/stores/navigationStore';
  import GlitchText from './GlitchText.svelte';
  import { browser } from '$app/environment';
  
  type QuickhackItem = {
    id: string;
    name: string;
    ramCost: number;
    icon: string;
    category: 'expert' | 'intermediate' | 'advanced';
    isLocked?: boolean;
  };

  const quickhacks: QuickhackItem[] = [
    { 
      id: 'about', 
      name: 'PROFILE', 
      ramCost: 2, 
      icon: '🔍', 
      category: 'whoami' 
    },
    { 
      id: 'projects', 
      name: 'PROJECTS', 
      ramCost: 5, 
      icon: '💻', 
      category: 'ls -la' 
    },
    { 
      id: 'experience', 
      name: 'EXPERIENCE', 
      ramCost: 6, 
      icon: '🧠', 
      category: 'history' 
    },
    { 
      id: 'skills', 
      name: 'SKILLS', 
      ramCost: 3, 
      icon: '🔧', 
      category: 'chmod' 
    },
    { 
      id: 'contact', 
      name: 'PING', 
      ramCost: 1, 
      icon: '📡', 
      category: 'telnet' 
    }
  ];

  let hoveredItem: string | null = null;

  function selectSection(id: string) {
    gsap.to('.quick-hack-item', {
      opacity: 0.7,
      color: '#49c5b6',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      duration: 0.3
    });

    gsap.to(`.quick-hack-item[data-id="${id}"]`, {
      opacity: 1,
      color: '#ECD06F',
      backgroundColor: 'rgba(73, 197, 182, 0.2)',
      duration: 0.3
    });

    // Create glitch effect on selection
    const timeline = gsap.timeline();
    timeline
      .to('.content-wrapper', { 
        x: 3, 
        opacity: 0.8, 
        duration: 0.05 
      })
      .to('.content-wrapper', { 
        x: -3, 
        opacity: 0.9, 
        duration: 0.05 
      })
      .to('.content-wrapper', { 
        x: 0, 
        opacity: 1, 
        duration: 0.05 
      });

    // Use navigateTo instead of directly setting currentSection
    // This will update the navigation history
    navigateTo(id);
  }

  function handleHover(id: string | null) {
    hoveredItem = id;
  }

  // Function to handle back navigation
  function handleBack() {
    // Attempt to go back to previous section
    const success = goBack();
    
    if (success) {
      // Get current section to update UI
      let currentSectionValue = 'about'; 
      const unsubscribe = currentSection.subscribe(value => {
        currentSectionValue = value;
      });
      unsubscribe();
      
      // Update UI to reflect the new section
      gsap.to('.quick-hack-item', {
        opacity: 0.7,
        color: '#49c5b6',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        duration: 0.3
      });

      gsap.to(`.quick-hack-item[data-id="${currentSectionValue}"]`, {
        opacity: 1,
        color: '#ECD06F',
        backgroundColor: 'rgba(73, 197, 182, 0.2)',
        duration: 0.3
      });
      
      // Create glitch effect on back navigation
      const timeline = gsap.timeline();
      timeline
        .to('.content-wrapper', { 
          x: -3, 
          opacity: 0.8, 
          duration: 0.05 
        })
        .to('.content-wrapper', { 
          x: 3, 
          opacity: 0.9, 
          duration: 0.05 
        })
        .to('.content-wrapper', { 
          x: 0, 
          opacity: 1, 
          duration: 0.05 
        });
    }
  }
  
  // Handle keyboard events for navigation
  function handleKeydown(event: KeyboardEvent) {
    // Q key for back navigation
    if (event.key.toLowerCase() === 'q') {
      handleBack();
    }
  }
  
  onMount(() => {
    // Set default section and highlight it
    selectSection('about');
    
    // Explicitly highlight the about section with higher opacity
    gsap.to('.quick-hack-item[data-id="about"]', {
      opacity: 1,
      color: '#ECD06F',
      backgroundColor: 'rgba(73, 197, 182, 0.2)',
      duration: 0.3,
      delay: 0.5 // Add a small delay to ensure it happens after initial animations
    });
    
    // Stagger animate in items
    gsap.from('.quick-hack-item', {
      y: 20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        // Ensure about section remains highlighted after animation
        gsap.to('.quick-hack-item[data-id="about"]', {
          opacity: 1,
          color: '#ECD06F',
          backgroundColor: 'rgba(73, 197, 182, 0.2)',
          duration: 0.3
        });
      }
    });
    
    // Add keyboard event listener
    if (browser) {
      window.addEventListener('keydown', handleKeydown);
      
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  });
</script>

<div class="quickhack-panel">
  <div class="panel-header">
    <GlitchText text="AVAILABLE QUICKHACKS:" />
  </div>
  
  <div class="quickhack-list">
    {#each quickhacks as quickhack}
      <div 
        class="quick-hack-item" 
        data-id={quickhack.id}
        class:locked={quickhack.isLocked}
        on:click={() => !quickhack.isLocked && selectSection(quickhack.id)}
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            !quickhack.isLocked && selectSection(quickhack.id);
          }
        }}
        on:mouseenter={() => handleHover(quickhack.id)}
        on:mouseleave={() => handleHover(null)}
        role="button"
        tabindex="0"
      >
        <div class="hack-details">
          <span class="hack-name">
            {quickhack.name}
          </span>
          <div class="hack-tags">
            <span class="tag">{quickhack.category.toUpperCase()}</span>
            {#if quickhack.category === 'advanced'}
              <span class="tag">TRACEABLE</span>
            {/if}
          </div>
        </div>
        
        <div class="ram-cost">
          <span class="cost-value">
            <span class="plus-sign">+</span> {quickhack.ramCost}
          </span>
          <span class="cost-icon">{quickhack.icon}</span>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="panel-footer">
    <div class="key-hint">
      <span class="key">F</span>
      <span class="hint">EXECUTE</span>
    </div>
    <div 
      class="key-hint" 
      on:click={handleBack} 
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleBack();
        }
      }}
      role="button" 
      tabindex="0"
    >
      <span class="key">Q</span>
      <span class="hint">PREVIOUS</span>
    </div>
  </div>
</div>

<style>
  .quickhack-panel {
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.7);
    border-right: 1px solid #49c5b6;
    box-shadow: 0 0 15px rgba(73, 197, 182, 0.2);
    width: 350px;
    height: 100%;
    overflow: hidden;
  }

  .panel-header {
    padding: 1rem;
    border-bottom: 1px solid rgba(73, 197, 182, 0.5);
    color: #49c5b6;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .quickhack-list {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
  }

  .quick-hack-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem 0;
    padding: 0.8rem;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(73, 197, 182, 0.3);
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .quick-hack-item:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #49c5b6;
    opacity: 0.7;
  }

  .quick-hack-item:hover {
    background-color: rgba(73, 197, 182, 0.2);
    border-color: rgba(73, 197, 182, 0.7);
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.3);
  }

  .hack-details {
    display: flex;
    flex-direction: column;
  }

  .hack-name {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    letter-spacing: 0.5px;
  }

  .hack-tags {
    display: flex;
    gap: 0.5rem;
  }

  .tag {
    font-size: 0.6rem;
    color: rgba(73, 197, 182, 0.7);
    padding: 0.1rem 0.3rem;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(73, 197, 182, 0.3);
  }

  .ram-cost {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .cost-value {
    font-size: 1.1rem;
    color: #49c5b6;
  }

  .plus-sign {
    font-size: 0.8rem;
    font-weight: bold;
  }

  .cost-icon {
    font-size: 1.2rem;
  }

  .locked {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .locked .hack-name {
    text-decoration: line-through;
    color: #ff5252;
  }

  .locked:before {
    background-color: #ff5252;
  }

  .panel-footer {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    border-top: 1px solid rgba(73, 197, 182, 0.5);
  }

  .key-hint {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .key {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    background-color: rgba(73, 197, 182, 0.2);
    border: 1px solid #49c5b6;
    color: #ECD06F;
    font-size: 0.8rem;
  }

  .hint {
    color: #49c5b6;
    font-size: 0.8rem;
  }

  /* Custom scrollbar */
  .quickhack-list::-webkit-scrollbar {
    width: 5px;
  }

  .quickhack-list::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  .quickhack-list::-webkit-scrollbar-thumb {
    background: rgba(73, 197, 182, 0.5);
  }

  .quickhack-list::-webkit-scrollbar-thumb:hover {
    background: rgba(73, 197, 182, 0.8);
  }

  @media (max-width: 768px) {
    .quickhack-panel {
      width: 100%;
      height: auto;
      max-height: 40vh;
      border-right: none;
      border-bottom: 1px solid #49c5b6;
    }
  }
</style>
