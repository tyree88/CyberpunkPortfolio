<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { currentSection } from '$lib/stores/navigationStore';
  import { browser } from '$app/environment';
  import CyberdeckHeader from '$lib/components/CyberdeckHeader.svelte';
  import QuickhackList from '$lib/components/QuickhackList.svelte';
  import ContentPanel from '$lib/components/ContentPanel.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';

  // Initialize loaded to true for server-side rendering
  let loaded = !browser;

  // Track if we should show the hero or main content
  let showMainContent = false;
  let skipHero = false;

  onMount(() => {
    // Skip animations if not in browser environment
    if (!browser) {
      loaded = true;
      return;
    }
    
    // Set loaded to false for browser animation
    loaded = false;
    
    // Loading sequence
    const timeline = gsap.timeline();
    
    timeline
      .to('.loading-text', { 
        opacity: 1, 
        duration: 0.5 
      })
      .call(() => {
        const element = document.querySelector('.loading-text');
        if (element) element.textContent = "INITIALIZING CYBERDECK...";
      }, null, null, 1.5)
      .call(() => {
        const element = document.querySelector('.loading-text');
        if (element) element.textContent = "ESTABLISHING NEURAL LINK...";
      }, null, null, 1)
      .call(() => {
        const element = document.querySelector('.loading-text');
        if (element) element.textContent = "LOADING PORTFOLIO DATA...";
      }, null, null, 1)
      .to('.loading-text', { 
        opacity: 0, 
        duration: 0.5 
      })
      .to('.loading-container', { 
        opacity: 0, 
        display: 'none', 
        duration: 0.5,
        onComplete: () => {
          loaded = true;
        } 
      });
  });
  
  // Function to skip hero and go to main content
  function enterMainContent() {
    // If we're already showing main content, do nothing
    if (showMainContent) return;
    
    // Animate transition
    const tl = gsap.timeline();
    
    tl.to('.hero-container', {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        showMainContent = true;
        
        // Animate in main content
        setTimeout(() => {
          gsap.from('.main-container', { 
            opacity: 0, 
            duration: 1 
          });
          gsap.from('.cyberdeck-header', { 
            y: -50, 
            opacity: 0, 
            duration: 0.8, 
            delay: 0.2 
          });
          gsap.from('.quickhack-list', { 
            x: -50, 
            opacity: 0, 
            duration: 0.8, 
            delay: 0.4 
          });
          gsap.from('.content-panel', { 
            x: 50, 
            opacity: 0, 
            duration: 0.8, 
            delay: 0.6 
          });
        }, 100);
      }
    });
  }
</script>

<svelte:head>
  <title>Cyberpunk Portfolio | Netrunner Resume</title>
</svelte:head>

{#if !loaded}
  <div class="loading-container">
    <div class="loading-text"></div>
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
  </div>
{:else if !showMainContent}
  <div class="hero-container">
    <HeroSection />
    <div class="enter-button" on:click={enterMainContent}>
      <span class="enter-text">ENTER CYBERDECK</span>
      <div class="button-corner top-left"></div>
      <div class="button-corner top-right"></div>
      <div class="button-corner bottom-left"></div>
      <div class="button-corner bottom-right"></div>
    </div>
  </div>
{:else}
  <div class="main-container">
    <CyberdeckHeader />
    <div class="content-container">
      <QuickhackList class="quickhack-list" />
      <ContentPanel class="content-panel" currentSection={$currentSection} />
    </div>
  </div>
{/if}

<style>
  .loading-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000000;
    z-index: 1000;
  }

  .loading-text {
    font-family: 'Roboto Mono', monospace;
    color: #49c5b6;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0;
    white-space: nowrap;
  }

  .loading-bar {
    width: 60%;
    max-width: 400px;
    height: 4px;
    background-color: rgba(73, 197, 182, 0.3);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }

  .loading-progress {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #49c5b6;
    animation: load 3.5s ease-in-out;
  }

  @keyframes load {
    0% { width: 0; }
    100% { width: 100%; }
  }
  
  .hero-container {
    position: relative;
    min-height: 100vh;
    width: 100%;
  }
  
  .enter-button {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    position: relative;
  }
  
  .enter-button:hover {
    background-color: rgba(73, 197, 182, 0.1);
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.5);
  }
  
  .enter-button:hover .enter-text {
    color: #fff;
  }
  
  .enter-text {
    color: #49c5b6;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  
  .button-corner {
    position: absolute;
    width: 10px;
    height: 10px;
  }
  
  .top-left {
    top: -1px;
    left: -1px;
    border-top: 2px solid #ff5252;
    border-left: 2px solid #ff5252;
  }
  
  .top-right {
    top: -1px;
    right: -1px;
    border-top: 2px solid #ff5252;
    border-right: 2px solid #ff5252;
  }
  
  .bottom-left {
    bottom: -1px;
    left: -1px;
    border-bottom: 2px solid #ff5252;
    border-left: 2px solid #ff5252;
  }
  
  .bottom-right {
    bottom: -1px;
    right: -1px;
    border-bottom: 2px solid #ff5252;
    border-right: 2px solid #ff5252;
  }

  .main-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }

  .content-container {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    .content-container {
      flex-direction: column;
    }
    
    .enter-button {
      padding: 0.8rem 1.5rem;
    }
    
    .enter-text {
      font-size: 0.9rem;
    }
  }
</style>
