<script lang="ts">
  import { gsap } from 'gsap';
  import TypewriterText from './TypewriterText.svelte';
  import GlitchText from './GlitchText.svelte';
  import { browser } from '$app/environment';
  import type { CyberwareSystem, MemoryArchive, BreachProtocol } from '$lib/types/cyberware';
  import { onMount } from 'svelte';

  // Props
  export let cyberwareSystems: CyberwareSystem[] = [];
  export let memoryArchives: MemoryArchive[] = [];
  export let breachProtocols: BreachProtocol[] = [];
  export let portfolioData: any = {};

  // State
  let currentSystem = 'frontal-cortex';
  let scanEffect: HTMLElement | null = null;
  let bodyDisplay: HTMLElement | null = null;
  let currentFrame = 0;
  let totalFrames = 12;
  let scanIntervalId: number | null = null;

  // Set active system and show relevant data
  function selectSystem(systemId: string) {
    // Create a glitch effect for transition
    const timeline = gsap.timeline();
    timeline
      .to('.system-details', { 
        x: 3, 
        opacity: 0.8, 
        duration: 0.05,
        ease: "steps(1)"
      })
      .to('.system-details', { 
        x: -6, 
        opacity: 0.9, 
        duration: 0.05,
        ease: "steps(1)"
      })
      .to('.system-details', { 
        x: 0, 
        opacity: 1, 
        duration: 0.05 
      });
    
    // Update current system
    currentSystem = systemId;
    
    // Highlight the active system
    gsap.to('.system-node', {
      borderColor: '#49c5b6',
      boxShadow: '0 0 8px rgba(73, 197, 182, 0.4)',
      duration: 0.3
    });
    
    gsap.to(`.system-node[data-system="${systemId}"]`, {
      borderColor: '#ECD06F',
      boxShadow: '0 0 15px rgba(236, 208, 111, 0.7)',
      duration: 0.3
    });
  }

  // Animate scan effect
  function animateScan() {
    if (!browser) return;
    
    // Ensure scanEffect exists
    setTimeout(() => {
      scanEffect = document.querySelector('.scan-effect');
      
      if (!scanEffect) {
        console.error('Scan effect element not found');
        return;
      }
      
      // Start the scan animation if not already running
      if (scanIntervalId === null) {
        scanIntervalId = window.setInterval(() => {
          // Update to next frame
          currentFrame = (currentFrame + 1) % totalFrames;
          
          // Apply scan effect
          if (scanEffect) {
            scanEffect.style.backgroundImage = `linear-gradient(to bottom, 
              rgba(73, 197, 182, 0.05), 
              rgba(73, 197, 182, 0.1) ${currentFrame * 8}%, 
              rgba(73, 197, 182, 0.2) ${currentFrame * 8 + 1}%, 
              rgba(73, 197, 182, 0.05) ${currentFrame * 8 + 2}%, 
              rgba(73, 197, 182, 0.0))`;
          }
        }, 200);
      }
    }, 500); // Give DOM time to render
  }

  // Setup glow effects for nodes
  function setupGlowEffects() {
    if (!browser) return;
    
    // Wait a moment to ensure DOM elements are ready
    setTimeout(() => {
      // Add glow effects to system nodes
      const nodes = document.querySelectorAll('.system-node');
      
      if (nodes.length > 0) {
        nodes.forEach(node => {
          // Create a subtle pulse animation for each node
          gsap.to(node, {
            boxShadow: '0 0 15px rgba(73, 197, 182, 0.7)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          });
        });
      }
    }, 500); // Wait 500ms to ensure DOM is ready
  }

  onMount(() => {
    if (!browser) return;
    
    // Ensure bodyDisplay is initialized
    bodyDisplay = document.querySelector('.body-display');
    
    // Start scan animation
    animateScan();
    
    // Setup glow effects
    setupGlowEffects();
    
    // Initialize page animations
    const masterTimeline = gsap.timeline();
    masterTimeline
      .from('.cyberware-header', { y: -30, opacity: 0, duration: 0.5 })
      .from('.system-node', { scale: 0.5, opacity: 0, duration: 0.5 });
  });
</script>

<!-- Main cyberware system interface -->
<div class="cyberware-system">
  <!-- Central body display with system nodes -->
  <div class="body-display-container">
    <!-- Body scan visualization -->
    <div class="body-display" bind:this={bodyDisplay}>
      <!-- Animated scan effect overlay -->
      <div class="scan-effect" bind:this={scanEffect}></div>
      <div class="scan-line"></div>
      <!-- We don't need fallback content since we're using the real image -->
      <div class="body-fallback" style="display: none;"></div>
    </div>
    
    <!-- System nodes positioned around body -->
    <div class="system-nodes-container">
      {#each cyberwareSystems as system}
        <div 
          class="system-node" 
          data-system={system.id}
          style="top: {system.position.top || 'auto'}; 
                 left: {system.position.left || 'auto'}; 
                 right: {system.position.right || 'auto'}; 
                 bottom: {system.position.bottom || 'auto'};
                 transform: {system.position.transform || 'none'};
                 border-color: {system.color};
                 z-index: 100;"
          on:click={() => selectSystem(system.id)}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              selectSystem(system.id);
            }
          }}
          tabindex="0"
          role="button"
          aria-pressed={currentSystem === system.id}
        >
          <div class="node-content">
            <span class="node-title" style="font-size: 0.9rem; color: #ECD06F; font-weight: bold;">{system.title}</span>
          </div>
        </div>
      {/each}
    </div>
  </div>
  
  <!-- System details panel -->
  <div class="system-details-panel">
    {#if currentSystem}
      <!-- Get current system data -->
      {@const system = cyberwareSystems.find(sys => sys.id === currentSystem)}
      
      {#if system}
        <div class="system-details">
          <div class="system-header">
            <h2 class="system-title">{system.title}</h2>
            <p class="system-description">Improved information retention and recall abilities</p>
          </div>
          
          <div class="system-items">
            {#each system.items as item}
              <div class="system-item">
                <div class="item-header">
                  <h3 class="item-name">{item.name}</h3>
                  <div class="item-level">
                    <div class="level-bar">
                      <div class="level-fill" style="width: {item.level}%; background-color: {system.color}"></div>
                    </div>
                    <div class="level-value">{item.level}</div>
                  </div>
                </div>
                <div class="item-description">
                  <TypewriterText text={item.description} speed={20} />
                </div>
              </div>
            {/each}
            
            <div class="system-memory">
              <div class="memory-header">
                <h3 class="memory-title">SYSTEM MEMORY</h3>
              </div>
              
              <div class="memory-archives">
                {#if system.id === 'memory-booster'}
                  <!-- Profile info when viewing memory booster -->
                  <div class="memory-item profile-data">
                    <div class="profile-header">
                      <h4>IDENTITY: {portfolioData.about.name}</h4>
                    </div>
                    <div class="profile-data-row">
                      <span class="data-label">CLASS:</span>
                      <span class="data-value">{portfolioData.about.title}</span>
                    </div>
                    <div class="profile-data-row">
                      <span class="data-label">LOCATION:</span>
                      <span class="data-value">{portfolioData.about.location}</span>
                    </div>
                    <div class="profile-data-row">
                      <span class="data-label">STATUS:</span>
                      <span class="data-value status-active">{portfolioData.about.status}</span>
                    </div>
                  </div>
                  
                  <div class="memory-item profile-bio">
                    <div class="bio-content">
                      <TypewriterText text={portfolioData.about.bio} speed={15} />
                    </div>
                  </div>
                {:else if system.id === 'operating-system'}
                  <!-- Projects/Breach protocols for operating system -->
                  {#each breachProtocols.slice(0, 2) as protocol}
                    <div class="memory-item breach-protocol">
                      <h4 class="protocol-name">{protocol.title}</h4>
                      <div class="protocol-description">
                        <TypewriterText text={protocol.description} speed={15} />
                      </div>
                      <div class="protocol-tech">
                        {#each protocol.technologies.slice(0, 3) as tech}
                          <span class="tech-tag">{tech}</span>
                        {/each}
                      </div>
                    </div>
                  {/each}
                {:else}
                  <!-- Experience/Memory archives for all other systems -->
                  {#if memoryArchives.length > 0}
                    <div class="memory-item experience-data">
                      <h4 class="experience-title">{memoryArchives[0].title}</h4>
                      <div class="experience-company">{memoryArchives[0].company}</div>
                      <div class="experience-duration">{memoryArchives[0].duration}</div>
                      <div class="experience-description">
                        <TypewriterText text={memoryArchives[0].description} speed={15} />
                      </div>
                    </div>
                  {/if}
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</div>

<style>
  /* Body display styles */
  .body-display-container {
    position: relative;
    border: 1px solid #49c5b6;
    background-color: #000;
    height: 100%;
    flex: 1;
    border-radius: 0;
    box-shadow: 0 0 20px rgba(73, 197, 182, 0.3);
    margin-right: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  
  .body-display {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url('/images/cyberware/ultimate-upscale-raw.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: drop-shadow(0 0 15px rgba(73, 197, 182, 0.5));
    background-color: #000;
    border-radius: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .body-fallback {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    padding: 0;
  }
  

  
  .scan-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 6;
  }
  
  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(73, 197, 182, 0.7);
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.7);
    z-index: 7;
    animation: scanAnimation 4s linear infinite;
  }
  
  /* System nodes */
  .system-nodes-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    pointer-events: none;
  }

  .system-node {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid #49c5b6;
    border-radius: 50%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 5px rgba(73, 197, 182, 0.8), inset 0 0 5px rgba(73, 197, 182, 0.8);
    z-index: 200;
    pointer-events: auto;
    animation: glow 3s infinite alternate;
  }
  
  .system-node:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(236, 208, 111, 0.7);
    z-index: 250;
  }
  
  @keyframes glow {
    0% {
      box-shadow: 0 0 10px rgba(73, 197, 182, 0.5), inset 0 0 15px rgba(73, 197, 182, 0.3);
    }
    100% {
      box-shadow: 0 0 15px rgba(73, 197, 182, 0.7), inset 0 0 20px rgba(73, 197, 182, 0.5);
    }
  }
  
  .node-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
    color: #49c5b6;
  }
  
  .node-title {
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.7rem;
    text-shadow: 0 0 5px #000000;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 2px 6px;
    border-radius: 3px;
    border: 1px solid rgba(73, 197, 182, 0.3);
  }
  
  .system-node:hover .node-title {
    opacity: 1;
  }
  

  
  /* System details panel */
  .system-details-panel {
    flex: 1;
    background-color: rgb(0, 0, 0);
    border: 1px solid #49c5b6;
    border-radius: 0;
    padding: 0;
    box-shadow: 0 0 20px rgba(73, 197, 182, 0.3);
    height: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #49c5b6 #000000;
  }
  
  .system-details-panel::-webkit-scrollbar {
    width: 6px;
  }
  
  .system-details-panel::-webkit-scrollbar-track {
    background: #000000;
  }
  
  .system-details-panel::-webkit-scrollbar-thumb {
    background-color: #49c5b6;
    border-radius: 3px;
  }
  
  .system-header {
    border-bottom: none;
    padding: 0.8rem;
    margin-bottom: 0;
    position: relative;
  }
  
  .system-title {
    color: #ECD06F;
    font-size: 1.2rem;
    margin: 0 0 0.3rem 0;
    letter-spacing: 1px;
  }
  
  .system-description {
    color: #ffffff;
    font-size: 0.85rem;
    margin: 0;
    letter-spacing: 0.5px;
  }
  
  .system-items {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 0 0.8rem 0.8rem 0.8rem;
  }
  
  .system-item {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(73, 197, 182, 0.3);
    border-radius: 0;
    padding: 0.8rem;
    position: relative;
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
  }
  
  .item-name {
    color: #ffffff;
    font-size: 0.95rem;
    margin: 0;
    font-weight: 500;
  }
  
  .item-level {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .level-bar {
    width: 100px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
  }
  
  .level-fill {
    height: 100%;
    background-color: #49c5b6;
    border-radius: 3px;
  }
  
  .level-value {
    color: #ECD06F;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .item-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.85rem;
    line-height: 1.3;
  }
  
  /* Memory archives */
  .system-memory {
    margin-top: 0.8rem;
    border: 1px solid #49c5b6;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .memory-header {
    border-bottom: 1px solid rgba(73, 197, 182, 0.5);
    padding: 0.5rem 0.8rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  .memory-title {
    color: #49c5b6;
    font-size: 0.95rem;
    margin: 0;
  }
  
  .memory-archives {
    display: flex;
    flex-direction: column;
    padding: 0.8rem;
  }
  
  .memory-item {
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    border-radius: 0;
    padding: 0;
  }
  
  /* Profile data */
  .profile-data {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .profile-header {
    margin-bottom: 0.5rem;
  }
  
  .profile-header h4 {
    color: #ECD06F;
    margin: 0;
    font-size: 0.9rem;
  }
  
  .profile-data-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
  }
  
  .data-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
  }
  
  .data-value {
    color: #ffffff;
    font-size: 0.8rem;
  }
  
  .status-active {
    color: #49c5b6;
    background-color: rgba(73, 197, 182, 0.2);
    padding: 0.1rem 0.3rem;
    border-radius: 2px;
  }
  
  /* Breach protocol */
  .breach-protocol {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .protocol-name {
    color: #ECD06F;
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }
  
  .protocol-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;
  }
  
  .protocol-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tech-tag {
    background-color: rgba(73, 197, 182, 0.2);
    color: #49c5b6;
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
    font-size: 0.8rem;
    border: 1px solid rgba(73, 197, 182, 0.5);
  }
  
  /* Experience data */
  .experience-data {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .experience-title {
    color: #ECD06F;
    margin: 0;
    font-size: 1rem;
  }
  
  .experience-company {
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .experience-duration {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  
  .experience-description {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    line-height: 1.4;
  }
  
  /* Main layout */
  .cyberware-system {
    display: flex;
    padding: 0;
    gap: 0;
    height: calc(100vh - 110px);
  }
  
  /* Animations */
  @keyframes scanAnimation {
    0% {
      top: 0;
    }
    100% {
      top: 100%;
    }
  }
  
  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.5);
      opacity: 0.7;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  
  /* Responsive styles */
  @media (max-width: 1024px) {
    .cyberware-system {
      flex-direction: column;
      height: auto;
    }
    
    .body-display-container {
      margin-bottom: 0;
      height: 50vh;
    }
    
    .system-details-panel {
      height: auto;
    }
  }
</style>
