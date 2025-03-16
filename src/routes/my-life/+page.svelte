<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  import TypewriterText from '$lib/components/TypewriterText.svelte';
  import GlitchText from '$lib/components/GlitchText.svelte';
  import { portfolioData } from '$lib/data/portfolioData';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  
  // Page state
  let isLoaded = false;
  let currentSystem = 'frontal-cortex';
  let mousePosition = { x: 0, y: 0 };
  let trailElements: HTMLElement[] = [];
  let trailContainer: HTMLElement | null = null;
  let scanEffect: HTMLElement | null = null;
  let bodyDisplay: HTMLElement | null = null;
  
  // Current frame for scan animation
  let currentFrame = 0;
  let totalFrames = 12; // Based on the frames you provided
  let scanIntervalId: number | null = null;
  
  // Systems data structure based on the frames
  const cyberwareSystems = [
    {
      id: 'frontal-cortex',
      title: "FRONTAL CORTEX",
      icon: "🧠",
      color: "#49c5b6",
      position: { top: '8%', left: '50%', transform: 'translateX(-50%)' }, // Top center, near the head
      items: [
        { name: "Problem-Solving OS", level: 92, description: "Enhanced cognitive processing for complex problem-solving" },
        { name: "Creative Framework", level: 88, description: "Boost to creative thinking and innovation abilities" },
        { name: "Memory Booster", level: 85, description: "Improved information retention and recall abilities" }
      ]
    },
    {
      id: 'operating-system',
      title: "OPERATING SYSTEM",
      icon: "💻",
      color: "#ECD06F",
      position: { top: '35%', left: '50%', transform: 'translateX(-50%)' }, // Center of the body
      items: [
        { name: "Multitasking Processor", level: 90, description: "Efficient management of multiple concurrent tasks" },
        { name: "Focus Enhancer", level: 85, description: "Sustained concentration on complex problems" }
      ]
    },
    {
      id: 'face',
      title: "FACE",
      icon: "👁️",
      color: "#ff5252",
      position: { top: '15%', left: '50%', transform: 'translateX(-50%)' }, // Near the neck
      items: [
        { name: "Kiroshi Optics", level: 95, description: "Enhanced visual perception for design and attention to detail" },
        { name: "Vocal Modulator", level: 88, description: "Clear and effective communication skills" }
      ]
    },
    {
      id: 'arms',
      title: "ARMS",
      icon: "💪",
      color: "#9059ff",
      position: { top: '30%', right: '10%' }, // Right arm position
      items: [
        { name: "Gorilla Arms", level: 87, description: "Rapid keyboard input and precision coding" }
      ]
    },
    {
      id: 'skeleton',
      title: "SKELETON",
      icon: "🦴",
      color: "#2ecc71",
      position: { top: '40%', left: '10%' }, // Left side of body
      items: [
        { name: "Endoskeleton", level: 84, description: "Sustained work stamina and posture support" },
        { name: "Reinforced Tendons", level: 82, description: "Comfort during long development sessions" },
        { name: "Bioplastic Frame", level: 78, description: "Ergonomic adaptation to work environments" }
      ]
    },
    {
      id: 'hands',
      title: "HANDS",
      icon: "✋",
      color: "#1abc9c",
      position: { top: '40%', right: '5%' }, // Right hand position
      items: [
        { name: "Precision Grip", level: 95, description: "Micro-precision for detailed coding and design work" },
        { name: "Smart Link", level: 90, description: "Enhanced human-computer interface interaction" }
      ]
    },
    {
      id: 'nervous-system',
      title: "NERVOUS SYSTEM",
      icon: "⚡",
      color: "#f39c12",
      position: { top: '50%', left: '50%', transform: 'translateX(-50%)' }, // Central nervous system position
      items: [
        { name: "Kerenzikov", level: 88, description: "Rapid reaction time for debugging and problem-solving" },
        { name: "Reflexes", level: 85, description: "Quick adaptation to changing project requirements" },
        { name: "Synaptic Accelerator", level: 83, description: "Faster learning of new technologies and frameworks" }
      ]
    },
    {
      id: 'circulatory-system',
      title: "CIRCULATORY SYSTEM",
      icon: "❤️",
      color: "#e74c3c",
      position: { top: '25%', left: '50%', transform: 'translateX(-50%)' }, // Heart/chest area
      items: [
        { name: "Biomonitor", level: 86, description: "Stress management during challenging projects" },
        { name: "Blood Pump", level: 82, description: "Maintained performance during high-pressure deadlines" },
        { name: "Adrenaline", level: 80, description: "Heightened focus for critical problem-solving" }
      ]
    },
    {
      id: 'integumentary-system',
      title: "INTEGUMENTARY SYSTEM",
      icon: "🛡️",
      color: "#3498db",
      position: { top: '60%', left: '15%' }, // Skin/surface area - left side
      items: [
        { name: "Heat Converter", level: 79, description: "Comfortable work under varying environmental conditions" },
        { name: "Pain Editor", level: 76, description: "Reduced fatigue during extended work sessions" },
        { name: "Subdermal Socket", level: 85, description: "Enhanced tactile feedback with development tools" }
      ]
    },
    {
      id: 'legs',
      title: "LEGS",
      icon: "🦿",
      color: "#8e44ad",
      position: { bottom: '15%', left: '50%', transform: 'translateX(-50%)' }, // Bottom of body
      items: [
        { name: "Reinforced Joints", level: 75, description: "Stability and endurance during long work sessions" },
        { name: "Lynx Paws", level: 72, description: "Silent and efficient movement throughout work environments" }
      ]
    }
  ];
  
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
  
  // Handle back navigation
  function handleBack() {
    // Navigate back to the main page with a glitch effect
    const timeline = gsap.timeline({
      onComplete: () => goto('/')
    });
    
    timeline
      .to('.cyberware-page', { 
        filter: 'hue-rotate(90deg) brightness(1.2)',
        duration: 0.08,
        ease: "steps(1)"
      })
      .to('.cyberware-page', { 
        filter: 'hue-rotate(-40deg) brightness(0.8)',
        duration: 0.08,
        ease: "steps(1)"
      })
      .to('.cyberware-page', { 
        x: 0, 
        opacity: 0, 
        filter: 'hue-rotate(0) brightness(1)',
        duration: 0.2 
      });
  }
  
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
    if (!browser || !scanEffect) return;
    
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
  }
  
  // Create cursor trail elements
  function createTrailElements() {
    if (!browser) return;
    
    // Create container if it doesn't exist
    if (!trailContainer) {
      trailContainer = document.createElement('div');
      trailContainer.className = 'cursor-trail-container';
      document.body.appendChild(trailContainer);
    } else {
      // Clear any existing trail elements
      trailContainer.innerHTML = '';
      trailElements = [];
    }
    
    // Create new trail elements
    if (trailContainer) {
      for (let i = 0; i < 15; i++) {
        const trailElement = document.createElement('div');
        trailElement.className = 'cursor-trail';
        trailElement.style.width = `${3 + (i * 0.1)}px`;
        trailElement.style.height = `${3 + (i * 0.1)}px`;
        trailElement.style.opacity = `${1 - (i * 0.06)}`;
        trailElement.style.backgroundColor = i % 2 === 0 ? '#49c5b6' : '#ECD06F';
        
        trailContainer.appendChild(trailElement);
        trailElements.push(trailElement);
      }
    }
  }
  
  // Update cursor trail positions
  function updateTrailPositions(e: MouseEvent) {
    if (!browser || !trailElements.length) return;
    
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
    
    // Update trail element positions with delay
    trailElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.left = `${mousePosition.x}px`;
        element.style.top = `${mousePosition.y}px`;
      }, index * 15);
    });
  }
  
  // Add glitch effect to an element
  function triggerGlitchEffect(element: HTMLElement) {
    const timeline = gsap.timeline();
    
    timeline
      .to(element, {
        x: '+=' + (Math.random() * 6 - 3),
        y: '+=' + (Math.random() * 4 - 2),
        filter: 'hue-rotate(' + (Math.random() * 90) + 'deg) brightness(' + (0.8 + Math.random() * 0.4) + ')',
        duration: 0.08,
        ease: "steps(1)"
      })
      .to(element, {
        x: '+=' + (Math.random() * 6 - 3),
        y: '+=' + (Math.random() * 4 - 2),
        filter: 'hue-rotate(' + (Math.random() * -90) + 'deg) brightness(' + (0.8 + Math.random() * 0.4) + ')',
        duration: 0.08,
        ease: "steps(1)"
      })
      .to(element, {
        x: 0,
        y: 0,
        filter: 'hue-rotate(0) brightness(1)',
        duration: 0.08,
        ease: "steps(1)"
      });
  }
  
  // Initialize animations and event listeners
  onMount(() => {
    if (!browser) return;
    
    // Create cursor trail
    createTrailElements();
    window.addEventListener('mousemove', updateTrailPositions);
    
    // Start scan animation
    animateScan();
    
    // Initialize page animations
    const masterTimeline = gsap.timeline();
    
    masterTimeline
      .from('.cyberware-header', { 
        y: -30, 
        opacity: 0, 
        duration: 0.5 
      })
      .from('.system-node', { 
        scale: 0.5, 
        opacity: 0, 
        y: 20,
        stagger: 0.1, 
        duration: 0.5,
        ease: "back.out(2)",
        onComplete: () => {
          // Add a pulsing animation to each node to draw attention
          gsap.to('.system-node', {
            boxShadow: '0 0 25px rgba(73, 197, 182, 0.8)',
            border: '2px solid rgba(236, 208, 111, 0.9)',
            duration: 0.8,
            repeat: 2,
            yoyo: true
          });
        }
      }, '-=0.2')
      .from('.system-details', { 
        opacity: 0,
        y: 20,
        duration: 0.5 
      }, '-=0.1')
      .from('.body-display', {
        opacity: 0,
        duration: 0.8
      }, '-=0.3')
      .from('.scan-effect', {
        opacity: 0,
        duration: 0.3
      }, '-=0.5')
      .from('.hud-element', {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.4
      }, '-=0.3');
    
    // Add occasional glitch effects to various elements
    scheduleRandomGlitches();
    
    // Add glow effects to system nodes
    setupGlowEffects();
    
    isLoaded = true;
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', updateTrailPositions);
      
      // Clear scan interval
      if (scanIntervalId !== null) {
        window.clearInterval(scanIntervalId);
      }
      
      // Kill all GSAP animations
      gsap.killTweensOf('*');
    };
  });
  
  // Schedule random glitch effects on elements
  function scheduleRandomGlitches() {
    if (!browser) return;
    
    // System nodes glitches
    document.querySelectorAll('.system-node').forEach(node => {
      const glitchDelay = 5 + Math.random() * 15; // Random delay between 5-20 seconds
      
      setTimeout(() => {
        if (node instanceof HTMLElement) {
          triggerGlitchEffect(node);
          
          // Reschedule
          scheduleRandomGlitches();
        }
      }, glitchDelay * 1000);
    });
    
    // Body display glitch
    if (bodyDisplay) {
      const bodyGlitchDelay = 8 + Math.random() * 12;
      
      setTimeout(() => {
        triggerGlitchEffect(bodyDisplay);
      }, bodyGlitchDelay * 1000);
    }
  }
  
  // Set up glow effects for system nodes
  function setupGlowEffects() {
    if (!browser) return;
    
    // Wait a moment to ensure DOM elements are ready
    setTimeout(() => {
      // Default subtle glow on system nodes
      const systemNodes = document.querySelectorAll('.system-node');
      
      if (systemNodes.length > 0) {
        // Animate each node individually to ensure targeting
        systemNodes.forEach((node, index) => {
          // Add a staggered highlight effect for each node
          gsap.to(node, {
            boxShadow: '0 0 15px rgba(73, 197, 182, 0.7)',
            duration: 1.5,
            delay: index * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
          
          // Add event listeners for enhanced hover effect
          node.addEventListener('mouseenter', () => {
            gsap.to(node, {
              boxShadow: '0 0 20px rgba(236, 208, 111, 0.8)',
              borderColor: '#ECD06F',
              scale: 1.05,
              duration: 0.3
            });
          });
          
          node.addEventListener('mouseleave', () => {
            gsap.to(node, {
              boxShadow: '0 0 15px rgba(73, 197, 182, 0.7)',
              borderColor: '#49c5b6',
              scale: 1,
              duration: 0.3
            });
          });
        });
        
        // Add special animation for interactive dots
        const interactiveDots = document.querySelectorAll('.interactive-dot');
        if (interactiveDots.length > 0) {
          interactiveDots.forEach((dot) => {
            gsap.to(dot, {
              boxShadow: '0 0 20px rgba(255, 82, 82, 0.9)',
              scale: 1.2,
              duration: 1,
              repeat: -1,
              yoyo: true
            });
          });
        }
      }
    }, 500); // Wait 500ms to ensure DOM is ready
  }
</script>

<div class="cyberware-page" in:fade={{ duration: 300 }}>
  <!-- Cursor trail container -->
  <div class="cursor-trail-container" bind:this={trailContainer}></div>
  
  <!-- Scan lines overlay -->
  <div class="scan-lines"></div>
  
  <!-- Header with back button and title -->
  <div class="cyberware-header">
    <button 
      class="back-button" 
      on:click={handleBack}
      on:keydown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleBack();
        }
      }}
      aria-label="Go back"
    >
      <span class="back-icon">←</span>
      <span class="back-text">BACK</span>
    </button>
    <div class="title-container">
      <h1 class="cyberware-title"><GlitchText text="PERSONAL CYBERWARE SYSTEM" /></h1>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-label">LVL</span>
          <span class="stat-value">50</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-label">STREET CRED</span>
          <span class="stat-value">50</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main cyberware system interface -->
  <div class="cyberware-system">
    <!-- Central body display with system nodes -->
    <div class="body-display-container">
      <!-- Body scan visualization -->
      <div class="body-display" bind:this={bodyDisplay}>
        <!-- Animated scan effect overlay -->
        <div class="scan-effect" bind:this={scanEffect}></div>
        <div class="scan-line"></div>
      </div>
      
      <!-- System nodes positioned around body -->
      {#each cyberwareSystems as system}
        <div 
          class="system-node" 
          data-system={system.id}
          style="top: {system.position.top || 'auto'}; 
                 left: {system.position.left || 'auto'}; 
                 right: {system.position.right || 'auto'}; 
                 bottom: {system.position.bottom || 'auto'};
                 transform: {system.position.transform || 'none'};
                 border-color: {system.color};"
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
          <div class="interactive-dot"></div>
          <div class="node-content">
            <span class="node-icon">{system.icon}</span>
            <span class="node-title">{system.title}</span>
          </div>
          <div class="node-connector"></div>
        </div>
      {/each}
    </div>
    
    <!-- System details panel -->
    <div class="system-details-panel">
      {#if currentSystem}
        <!-- Get current system data -->
        {@const system = cyberwareSystems.find(sys => sys.id === currentSystem)}
        
        {#if system}
          <div class="system-details">
            <div class="system-header" style="border-color: {system.color}">
              <h2 class="system-title"><GlitchText text={system.title} /></h2>
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
                  {#if system.id === 'frontal-cortex'}
                    <!-- Profile info when viewing frontal cortex -->
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
  
  <!-- HUD elements -->
  <div class="hud-elements">
    <div class="hud-element top-right">
      <div class="hud-value">{portfolioData.about.name}</div>
      <div class="hud-label">IDENTITY</div>
    </div>
    
    <div class="hud-element top-left">
      <div class="hud-value">v1.0.7625269+</div>
      <div class="hud-label">OS VERSION</div>
    </div>
    
    <div class="hud-element bottom-left">
      <div class="hud-value">3.1415</div>
      <div class="hud-label">TRACE</div>
    </div>
    
    <div class="hud-element bottom-right">
      <div class="hud-value">100%</div>
      <div class="hud-label">SYSTEM STATUS</div>
    </div>
  </div>
</div>

<style>
  /* Global styles */
  :global(body) {
    font-family: 'Roboto Mono', monospace;
    background-color: #000000;
    color: #ffffff;
    overflow-x: hidden;
  }
  
  /* Main container */
  .cyberware-page {
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
    color: #ffffff;
    padding: 0;
    position: relative;
    overflow: hidden;
    background-image: url('/images/cyberware/cyber-grid.svg');
    background-position: center;
    background-repeat: repeat;
    background-size: 500px 500px;
  }
  
  /* Cursor trail */
  .cursor-trail-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
  }
  
  .cursor-trail {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: opacity 0.3s ease;
    filter: blur(1px);
  }
  
  /* Scan lines overlay */
  .scan-lines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 50%,
      rgba(0, 0, 0, 0.025) 50%
    );
    background-size: 100% 4px;
    z-index: 99;
    pointer-events: none;
    opacity: 0.15;
  }
  
  /* Header styles */
  .cyberware-header {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    background-color: rgba(0, 0, 0, 0.8);
    border-bottom: 1px solid #49c5b6;
    position: relative;
    z-index: 10;
  }
  
  .cyberware-title {
    color: #49c5b6;
    font-size: 1.8rem;
    letter-spacing: 2px;
    margin: 0;
    text-shadow: 0 0 10px rgba(73, 197, 182, 0.5);
  }
  
  .header-stats {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    color: #ECD06F;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
    letter-spacing: 1px;
    color: #49c5b6;
  }
  
  .stat-value {
    font-size: 1rem;
    letter-spacing: 1px;
    color: #ECD06F;
  }
  
  .stat-divider {
    width: 1px;
    height: 20px;
    background-color: #49c5b6;
    margin: 0 1rem;
  }
  
  .back-button {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #49c5b6;
    color: #49c5b6;
    padding: 0.4rem 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 2rem;
    font-family: 'Roboto Mono', monospace;
    position: relative;
    overflow: hidden;
  }
  
  .back-button::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    background: linear-gradient(45deg, #49c5b6, #ECD06F, #49c5b6);
    z-index: -1;
    animation: border-glow 3s linear infinite;
  }
  
  .back-button:hover {
    background: rgba(73, 197, 182, 0.2);
    box-shadow: 0 0 15px rgba(73, 197, 182, 0.7);
    color: #ECD06F;
  }
  
  .back-icon {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }
  
  .title-container {
    flex: 1;
    position: relative;
  }
  
  .about-title {
    color: #49c5b6;
    font-size: 1.8rem;
    letter-spacing: 2px;
    margin: 0;
    text-shadow: 0 0 10px rgba(73, 197, 182, 0.5);
  }
  
  .header-decoration {
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #49c5b6, #ECD06F, #49c5b6, transparent);
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  /* Navigation sidebar */
  .about-navigation {
    grid-area: nav;
    background-color: rgba(0, 0, 0, 0.7);
    border-right: 1px solid #49c5b6;
    padding: 2rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-item {
    padding: 1rem;
    border: 1px solid #49c5b6;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
  
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #49c5b6, transparent);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  .nav-item:hover {
    transform: translateY(-3px);
  }
  
  .nav-item:hover::after {
    transform: translateX(0);
  }
  
  .nav-icon {
    margin-right: 1rem;
    font-size: 1.2rem;
  }
  
  .nav-text {
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
  
  /* Cyberware system interface */
  .cyberware-system {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 2rem;
    padding: 2rem;
    position: relative;
    min-height: calc(100vh - 80px);
  }
  
  /* Body display and system nodes */
  .body-display-container {
    position: relative;
    border: 1px solid #49c5b6;
    background-color: rgba(0, 0, 0, 0.7);
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: inset 0 0 20px rgba(73, 197, 182, 0.3);
  }
  
  .body-display {
    position: relative;
    width: 100%;
    height: 95%;
    background-image: url('/images/cyberware/Ultimate-Upscale-Raw.jpg');
    background-position: 60% center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: drop-shadow(0 0 15px rgba(73, 197, 182, 0.5));
    background-color: transparent;
    border-radius: 2px;
    animation: body-glow 4s infinite alternate ease-in-out;
    max-height: 580px;
  }
  
  @keyframes body-glow {
    0% {
      filter: drop-shadow(0 0 10px rgba(73, 197, 182, 0.4));
    }
    50% {
      filter: drop-shadow(0 0 15px rgba(255, 82, 82, 0.3));
    }
    100% {
      filter: drop-shadow(0 0 20px rgba(236, 208, 111, 0.4));
    }
  }
  
  .scan-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.6;
    background-image: url('/images/cyberware/scan-frame.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 2;
  }
  
  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(73, 197, 182, 0.8);
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.8);
    z-index: 3;
    animation: scan-effect 4s infinite cubic-bezier(0.645, 0.045, 0.355, 1.000);
  }
  
  .system-node {
    position: absolute;
    width: 150px;
    height: 50px;
    background-color: rgba(0, 0, 0, 0.9);
    border: 2px solid #49c5b6;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 50; /* Higher z-index to ensure visibility */
    overflow: hidden;
    transform: translateX(0); /* Default transform to support the inline style transform */
    box-shadow: 0 0 15px rgba(73, 197, 182, 0.5);
  }
  
  .node-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    width: 100%;
    height: 100%;
  }
  
  .node-icon {
    font-size: 1rem;
  }
  
  .node-title {
    font-size: 0.7rem;
    letter-spacing: 0.5px;
    color: #ffffff;
    font-weight: bold;
  }
  
  .node-connector {
    position: absolute;
    width: 2px;
    height: 50px;
    background: linear-gradient(to bottom, #49c5b6, transparent);
    z-index: -1;
  }
  
  .interactive-dot {
    position: absolute;
    top: -8px;
    left: -8px;
    width: 16px;
    height: 16px;
    background-color: #ff5252;
    border-radius: 50%;
    z-index: 60; /* Higher z-index than parent node */
    box-shadow: 0 0 15px rgba(255, 82, 82, 0.8);
    animation: pulse-dot 2s infinite;
  }
  
  @keyframes pulse-dot {
    0% {
      transform: scale(0.8);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
    }
    70% {
      transform: scale(1.2);
      box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
    }
    100% {
      transform: scale(0.8);
      box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
    }
  }
  
  /* System details panel */
  .system-details-panel {
    border: 1px solid #49c5b6;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1.5rem;
    max-height: 600px;
    overflow-y: auto;
    position: relative;
  }
  
  .system-details-panel:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top left, rgba(73, 197, 182, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  
  .system-header {
    border-bottom: 2px solid #49c5b6;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .system-title {
    color: #ECD06F;
    margin: 0;
    font-size: 1.5rem;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(236, 208, 111, 0.5);
  }
  
  .system-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .system-item {
    background-color: rgba(0, 0, 0, 0.5);
    border-left: 3px solid #49c5b6;
    padding: 1rem;
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }
  
  .item-name {
    margin: 0;
    color: #ffffff;
    font-size: 1rem;
    letter-spacing: 0.5px;
  }
  
  .item-level {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .level-bar {
    width: 100px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    overflow: hidden;
  }
  
  .level-fill {
    height: 100%;
  }
  
  .level-value {
    font-size: 0.7rem;
    color: #ECD06F;
  }
  
  .item-description {
    font-size: 0.9rem;
    line-height: 1.4;
    color: #cccccc;
  }
  
  /* Memory system */
  .system-memory {
    margin-top: 2rem;
    border: 1px solid #49c5b6;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .memory-header {
    background-color: rgba(73, 197, 182, 0.1);
    padding: 0.8rem;
    border-bottom: 1px solid #49c5b6;
  }
  
  .memory-title {
    margin: 0;
    color: #49c5b6;
    font-size: 1rem;
    letter-spacing: 1px;
  }
  
  .memory-archives {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .memory-item {
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(73, 197, 182, 0.5);
    padding: 1rem;
  }
  
  /* Profile data styles */
  .profile-data {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  
  .profile-header {
    color: #ECD06F;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .profile-data-row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .data-label {
    flex: 0 0 90px;
    color: #49c5b6;
    font-size: 0.8rem;
  }
  
  .data-value {
    color: #ffffff;
    font-size: 0.9rem;
  }
  
  .status-active {
    color: #2ecc71;
  }
  
  /* Breach protocol styles */
  .breach-protocol {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .protocol-name {
    color: #ECD06F;
    margin: 0;
    font-size: 1rem;
  }
  
  .protocol-description {
    font-size: 0.9rem;
    line-height: 1.4;
    color: #cccccc;
  }
  
  .protocol-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  /* Experience data styles */
  .experience-data {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  
  .experience-title {
    color: #ECD06F;
    margin: 0;
    font-size: 1rem;
  }
  
  .experience-company {
    color: #ff5252;
    font-size: 0.9rem;
  }
  
  .experience-duration {
    color: #49c5b6;
    font-size: 0.8rem;
  }
  
  /* HUD elements */
  .hud-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
  }
  
  .hud-element {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 120px;
  }
  
  .hud-element.top-right {
    top: 100px;
    right: 20px;
  }
  
  .hud-element.top-left {
    top: 100px;
    left: 20px;
  }
  
  .hud-element.bottom-right {
    bottom: 20px;
    right: 20px;
  }
  
  .hud-element.bottom-left {
    bottom: 20px;
    left: 20px;
  }
  
  .hud-value {
    color: #ECD06F;
    font-size: 0.9rem;
    letter-spacing: 1px;
    margin-bottom: 0.3rem;
  }
  
  .hud-label {
    color: #49c5b6;
    font-size: 0.7rem;
    letter-spacing: 0.5px;
  }
  
  /* Section styles */
  .section-border {
    border: 1px solid #49c5b6;
    background-color: rgba(0, 0, 0, 0.7);
    position: relative;
    overflow: hidden;
  }
  
  .section-border::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(73, 197, 182, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
  
  .about-section-header {
    padding: 1rem;
    border-bottom: 1px solid #49c5b6;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .section-title {
    margin: 0;
    color: #ECD06F;
    font-size: 1.5rem;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(236, 208, 111, 0.5);
  }
  
  .about-section-content {
    padding: 2rem;
  }
  
  /* Profile section styles */
  .profile-container {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .profile-image-container {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .profile-image {
    width: 200px;
    height: 200px;
    border: 2px solid #49c5b6;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .profile-placeholder {
    font-size: 1.5rem;
    color: #49c5b6;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(73, 197, 182, 0.7);
  }
  
  .profile-scan-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: rgba(73, 197, 182, 0.7);
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.7);
    animation: scan-effect 3s linear infinite;
  }
  
  .profile-status {
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    padding: 0.5rem;
    text-align: center;
    color: #49c5b6;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
  
  .profile-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .info-row {
    display: flex;
    gap: 1rem;
    padding: 0.7rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-left: 3px solid #49c5b6;
  }
  
  .info-label {
    flex: 0 0 100px;
    color: #49c5b6;
    font-size: 0.9rem;
  }
  
  .info-value {
    flex: 1;
    color: #ffffff;
  }
  
  .status-available {
    color: #2ecc71;
  }
  
  .profile-bio {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #49c5b6;
    padding: 1.5rem;
  }
  
  .bio-title {
    color: #ECD06F;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  
  .bio-content {
    line-height: 1.6;
  }
  
  /* Skills section styles */
  .skill-category {
    margin-bottom: 2rem;
  }
  
  .category-title {
    color: #ECD06F;
    margin-bottom: 1rem;
    font-size: 1.2rem;
    letter-spacing: 1px;
    border-bottom: 1px solid rgba(236, 208, 111, 0.3);
    padding-bottom: 0.5rem;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
  }
  
  .skill-item {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.8rem;
    border-left: 3px solid #49c5b6;
  }
  
  .skill-name {
    margin-bottom: 0.5rem;
    color: #ffffff;
  }
  
  .skill-bar {
    height: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    position: relative;
    overflow: hidden;
  }
  
  .skill-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #49c5b6, #ECD06F);
    position: relative;
  }
  
  .skill-level {
    position: absolute;
    top: -1px;
    right: 5px;
    font-size: 0.7rem;
    color: #ECD06F;
  }
  
  /* Experience section styles */
  .experience-timeline {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  .experience-item {
    background-color: rgba(0, 0, 0, 0.5);
    border-left: 3px solid #ff5252;
    padding: 1.5rem;
    position: relative;
  }
  
  .experience-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    width: 15px;
    height: 15px;
    background-color: #ff5252;
    border: 2px solid #000000;
    border-radius: 50%;
  }
  
  .experience-header {
    margin-bottom: 1rem;
  }
  
  .experience-title {
    color: #ff5252;
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }
  
  .experience-company {
    color: #ECD06F;
    margin-bottom: 0.3rem;
  }
  
  .experience-duration {
    color: #49c5b6;
    font-size: 0.8rem;
  }
  
  .experience-description {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .experience-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .skill-tag {
    background-color: rgba(73, 197, 182, 0.2);
    border: 1px solid #49c5b6;
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    color: #49c5b6;
  }
  
  /* Projects section styles */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .project-card {
    height: 250px;
    perspective: 1000px;
    cursor: pointer;
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  
  .project-card.flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border: 1px solid #49c5b6;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  
  .card-front {
    background-color: rgba(0, 0, 0, 0.7);
    background-image: radial-gradient(circle at center, rgba(73, 197, 182, 0.1) 0%, transparent 70%);
  }
  
  .card-back {
    background-color: rgba(0, 0, 0, 0.8);
    transform: rotateY(180deg);
  }
  
  .project-title {
    color: #ECD06F;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.3rem;
    letter-spacing: 1px;
  }
  
  .project-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .tech-tag {
    background-color: rgba(236, 208, 111, 0.2);
    border: 1px solid #ECD06F;
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
    color: #ECD06F;
  }
  
  .card-footer {
    margin-top: auto;
    text-align: center;
    font-size: 0.8rem;
    color: #49c5b6;
    letter-spacing: 1px;
  }
  
  .project-description {
    margin-bottom: 1rem;
    flex: 1;
    line-height: 1.5;
  }
  
  .project-tech-full {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .project-links {
    display: flex;
    justify-content: space-around;
    margin-bottom: 1rem;
  }
  
  .project-link {
    background-color: rgba(73, 197, 182, 0.2);
    border: 1px solid #49c5b6;
    padding: 0.5rem 1rem;
    color: #49c5b6;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .project-link:hover {
    background-color: rgba(73, 197, 182, 0.4);
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.7);
    color: #ffffff;
  }
  
  /* Contact section styles */
  .contact-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .social-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .social-link {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #49c5b6;
    padding: 0.8rem 1rem;
    color: #49c5b6;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    background-color: rgba(73, 197, 182, 0.2);
    transform: translateX(5px);
  }
  
  .link-icon {
    margin-right: 1rem;
    font-weight: bold;
    color: #ECD06F;
  }
  
  .contact-form {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #49c5b6;
    padding: 1.5rem;
  }
  
  .form-header {
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #49c5b6;
    padding-bottom: 0.5rem;
  }
  
  .form-header h3 {
    margin: 0;
    color: #ECD06F;
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #49c5b6;
    font-size: 0.9rem;
  }
  
  .cyber-input {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    color: #ffffff;
    padding: 0.8rem;
    font-family: 'Roboto Mono', monospace;
    transition: all 0.3s ease;
  }
  
  .cyber-input:focus {
    outline: none;
    border-color: #ECD06F;
    box-shadow: 0 0 10px rgba(236, 208, 111, 0.5);
  }
  
  .submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: rgba(73, 197, 182, 0.2);
    border: 1px solid #49c5b6;
    color: #49c5b6;
    padding: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Roboto Mono', monospace;
    position: relative;
    overflow: hidden;
  }
  
  .submit-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(73, 197, 182, 0.3), transparent);
    transition: all 0.5s ease;
  }
  
  .submit-button:hover {
    background-color: rgba(73, 197, 182, 0.4);
    color: #ffffff;
  }
  
  .submit-button:hover::before {
    left: 100%;
  }
  
  .button-icon {
    margin-left: 0.5rem;
  }
  
  /* Animations */
  @keyframes scan-effect {
    0% {
      top: 0;
    }
    100% {
      top: 100%;
    }
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(73, 197, 182, 0.5);
    }
    50% {
      box-shadow: 0 0 15px rgba(73, 197, 182, 0.8);
    }
  }
  
  @keyframes border-glow {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .about-page {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto 1fr;
      grid-template-areas:
        "header"
        "nav"
        "content";
    }
    
    .about-navigation {
      flex-direction: row;
      overflow-x: auto;
      padding: 1rem;
    }
    
    .nav-item {
      flex: 0 0 auto;
    }
    
    .profile-container {
      flex-direction: column;
    }
    
    .contact-container {
      grid-template-columns: 1fr;
    }
    
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
