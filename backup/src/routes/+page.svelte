<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { currentSection } from '$lib/stores/navigationStore';
  import CyberdeckHeader from '$lib/components/CyberdeckHeader.svelte';
  import QuickhackList from '$lib/components/QuickhackList.svelte';
  import ContentPanel from '$lib/components/ContentPanel.svelte';

  let loaded = false;

  onMount(() => {
    // Loading sequence
    const timeline = gsap.timeline();
    
    timeline
      .to('.loading-text', { 
        opacity: 1, 
        duration: 0.5 
      })
      .to('.loading-text', { 
        text: {
          value: "INITIALIZING CYBERDECK...",
          delimiter: ""
        }, 
        duration: 1.5,
        ease: "none"
      })
      .to('.loading-text', { 
        text: {
          value: "ESTABLISHING NEURAL LINK...",
          delimiter: ""
        }, 
        duration: 1,
        ease: "none"
      })
      .to('.loading-text', { 
        text: {
          value: "LOADING PORTFOLIO DATA...",
          delimiter: ""
        }, 
        duration: 1,
        ease: "none"
      })
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
          
          // Animate in main content
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
        } 
      });
  });
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
  }
</style>
