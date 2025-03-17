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

  onMount(() => {
    if (!browser) return;
    // Any other initialization can go here if needed
  });
</script>

<div class="cyberware-page" in:fade={{ duration: 300 }}>
  <!-- Cursor trail container -->
  
  
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
  <HudElements />
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
  

</style>
