<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { browser } from '$app/environment';
  import { portfolioData } from '$lib/data/portfolioData';
  import { cyberwareSystems } from '$lib/data/cyberwareSystems';
  import CyberwareSystem from '$lib/components/CyberwareSystem.svelte';
  import CyberwareHeader from '$lib/components/CyberwareHeader.svelte';
  import HudElements from '$lib/components/HudElements.svelte';
  import ScanLines from '$lib/components/ScanLines.svelte';
  import { createCursorTrail } from '$lib/utils/cursorEffects';
  
  // Experience data mapped to memory archives
  const memoryArchives = portfolioData.experience.map(job => ({
    title: job.title,
    company: job.company,
    duration: job.duration,
    description: job.description,
    skills: job.skills
  }));
  
  // Projects mapped to breach protocols
  const breachProtocols = portfolioData.projects.map(project => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    link: project.link,
    github: project.github
  }));

  // Cursor trail container reference
  let trailContainer: HTMLElement | null = null;
  let cursorTrailCleanup: (() => void) | null = null;

  onMount(() => {
    if (!browser) return;
    
    // Initialize cursor trail
    const { cleanup } = createCursorTrail({
      container: trailContainer
    });
    
    cursorTrailCleanup = cleanup;
    
    return () => {
      // Clean up cursor trail on component unmount
      if (cursorTrailCleanup) {
        cursorTrailCleanup();
      }
    };
  });
</script>

<div class="cyberware-page" in:fade={{ duration: 300 }}>
  <!-- Cursor trail container -->
  <div class="cursor-trail-container" bind:this={trailContainer}></div>
  
  <!-- Scan lines overlay -->
  <ScanLines />
  
  <!-- Header with back button and title -->
  <CyberwareHeader />
  
  <!-- Main cyberware system interface -->
  <CyberwareSystem 
    {cyberwareSystems}
    {memoryArchives}
    {breachProtocols}
    {portfolioData}
  />
  
  <!-- HUD elements -->
  <HudElements userData={portfolioData.about} />
</div>

<style>
  /* Main container */
  .cyberware-page {
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
    color: #ffffff;
    padding: 0;
    position: relative;
    overflow: hidden;
    background-image: 
      linear-gradient(0deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)),
      url('/images/cyberware/cyber-grid.svg');
    background-position: center;
    background-repeat: repeat;
    background-size: 500px 500px;
    display: flex;
    flex-direction: column;
  }
  
  /* Cursor trail container */
  .cursor-trail-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
  }
</style>
