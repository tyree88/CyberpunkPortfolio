<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  import GlitchText from './GlitchText.svelte';
  import TypewriterText from './TypewriterText.svelte';
  import HexGrid from './HexGrid.svelte';
  import HexShape from './HexShape.svelte';
  import StatBar from './StatBar.svelte';
  import CyberButton from './CyberButton.svelte';
  import QuickHackMenu from './QuickHackMenu.svelte';

  // Props
  export let title: string = "NETRUNNER PROFILE";
  export let subtitle: string = "Web Development | UI/UX Design | Creative Coding";
  export let name: string = "V";
  export let level: number = 42;
  export let jobTitle: string = "Freelance Developer";
  export let cyberdeckName: string = "NEUROMANCER MK4";
  
  // State variables
  let heroContainer: HTMLElement;
  let preferReducedMotion = false;
  let quickHackMenuVisible = false;
  let showSysInfo = false;
  let timeline: gsap.core.Timeline | null = null;
  let glitchTimelineInstance: gsap.core.Timeline | null = null;
  let glitchTimeout: number;
  
  // System stats
  const ramUsage = 6;
  const ramTotal = 10;
  const cpuUsage = 78;
  const netStatus = "CONNECTED";
  const systemTemp = 42;
  
  // Skills with their proficiency levels
  const skills = [
    { name: "Frontend Development", level: 92 },
    { name: "UI/UX Design", level: 85 },
    { name: "Backend Development", level: 76 },
    { name: "Creative Coding", level: 88 },
    { name: "3D Visualization", level: 68 }
  ];
  
  // Quick hack options
  const quickHackOptions = [
    { 
      id: "view-portfolio", 
      label: "View Portfolio", 
      description: "Explore completed projects and case studies with full documentation.",
      ramCost: 1,
      category: "navigation"
    },
    { 
      id: "contact-me", 
      label: "Establish Connection", 
      description: "Direct communication channel to discuss potential collaboration.",
      ramCost: 2,
      category: "communication"
    },
    { 
      id: "download-resume", 
      label: "Extract Resume Data", 
      description: "Download comprehensive professional background information.",
      ramCost: 3,
      category: "data"
    },
    { 
      id: "view-process", 
      label: "Breach Process Protocol", 
      description: "Gain insight into project methodology and workflow approaches.",
      ramCost: 2,
      category: "intel"
    },
    { 
      id: "toggle-theme", 
      label: "Reboot Interface", 
      description: "Toggle between different system visual configurations.",
      ramCost: 1,
      category: "system"
    }
  ];
  
  // Function to handle quickhack selection
  function handleQuickHackSelect(event: CustomEvent) {
    const selectedOption = event.detail;
    console.log('Selected quickhack:', selectedOption);
    // Here you would handle the action based on the selected option
    
    // Hide the menu after selection
    quickHackMenuVisible = false;
  }
  
  // Toggle quick hack menu visibility
  function toggleQuickHackMenu() {
    quickHackMenuVisible = !quickHackMenuVisible;
  }
  
  // Toggle system info
  function toggleSysInfo() {
    showSysInfo = !showSysInfo;
    
    if (browser) {
      gsap.to('.sys-info-panel', {
        height: showSysInfo ? 'auto' : '0',
        opacity: showSysInfo ? 1 : 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
  }
  
  // Function to schedule random glitch effects on the whole hero section
  function scheduleGlitchEffect() {
    if (!browser || !heroContainer || preferReducedMotion) return;
    
    const delay = 5 + Math.random() * 15; // Random delay between 5-20 seconds
    
    glitchTimeout = window.setTimeout(() => {
      // Create a quick glitch sequence
      glitchTimelineInstance = gsap.timeline({
        onComplete: scheduleGlitchEffect // Schedule next glitch when done
      });
      
      glitchTimelineInstance
        .to(heroContainer, {
          filter: 'hue-rotate(90deg) brightness(1.2) contrast(1.2)',
          duration: 0.08,
          ease: "steps(1)"
        })
        .to(heroContainer, {
          filter: 'hue-rotate(-40deg) brightness(0.8) contrast(1.3)',
          duration: 0.08,
          ease: "steps(1)"
        })
        .to(heroContainer, {
          filter: 'hue-rotate(0deg) brightness(1) contrast(1)',
          duration: 0.08,
          ease: "steps(1)"
        });
    }, delay * 1000);
  }
  
  // Initialize animations
  function initAnimations() {
    if (!browser || preferReducedMotion) return;
    
    // Main animation timeline
    timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
    
    // Staggered fade in for main elements
    timeline
      .from('.hero-header', { 
        y: -30,
        opacity: 0,
        duration: 0.8
      })
      .from('.hero-subtitle', { 
        opacity: 0,
        duration: 0.5
      }, '-=0.4')
      .from('.cyberdeck-info', { 
        x: -20,
        opacity: 0,
        duration: 0.6
      }, '-=0.2')
      .from('.hero-actions', { 
        y: 20,
        opacity: 0,
        duration: 0.6
      }, '-=0.4')
      .from('.hero-skills', { 
        opacity: 0,
        scale: 0.95,
        duration: 0.8
      }, '-=0.4')
      .from('.skill-item', { 
        opacity: 0,
        x: -10,
        stagger: 0.1,
        duration: 0.5
      }, '-=0.6')
      .from('.hero-character', { 
        opacity: 0,
        scale: 0.9,
        duration: 0.8
      }, '-=1.2')
      .from('.hero-status-bars', { 
        opacity: 0,
        y: 20,
        duration: 0.7
      }, '-=0.6')
      .from('.system-controls', { 
        opacity: 0,
        duration: 0.5
      }, '-=0.4');
    
    // Start occasional glitch effect after initial animation
    timeline.add(() => {
      scheduleGlitchEffect();
    });
  }
  
  onMount(() => {
    if (browser) {
      // Check for reduced motion preference
      preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Start animations
      initAnimations();
    }
  });
  
  onDestroy(() => {
    // Clean up animations and timeouts
    if (timeline) timeline.kill();
    if (glitchTimelineInstance) glitchTimelineInstance.kill();
    if (glitchTimeout) clearTimeout(glitchTimeout);
  });
</script>

<div class="hero-section" bind:this={heroContainer}>
  <!-- Hex Grid Background -->
  <div class="background-layer">
    <HexGrid density={15} color="var(--color-teal)" pulseIntensity={0.3} />
  </div>
  
  <!-- Scan lines and noise overlay for cyberpunk feel -->
  <div class="scan-line"></div>
  <div class="scan-interference"></div>
  <div class="noise-overlay"></div>
  
  <!-- Main hero content -->
  <div class="hero-content">
    <div class="hero-left">
      <!-- Profile header section -->
      <header class="hero-header">
        <GlitchText text={title} class_name="hero-title" />
        <p class="hero-subtitle">{subtitle}</p>
      </header>
      
      <!-- Cyberdeck info -->
      <div class="cyberdeck-info">
        <div class="cyberdeck-model">
          <span class="label">CYBERDECK:</span> 
          <span class="value">{cyberdeckName}</span>
        </div>
        <div class="cyberdeck-status">
          <span class="status-indicator"></span>
          <span class="status-text">{netStatus}</span>
        </div>
      </div>
      
      <!-- Main skills section -->
      <div class="hero-skills">
        <h3 class="section-title">SKILL MATRIX</h3>
        
        <div class="skills-list">
          {#each skills as skill, i}
            <div class="skill-item">
              <StatBar 
                label={skill.name}
                value={skill.level}
                maxValue={100}
                color="var(--color-teal)"
                labelPosition="left"
                scanEffect={i === 1 || i === 3}
                pulseEffect={i === 0 || i === 4}
                initialDelay={0.3 + (i * 0.1)}
              />
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Action buttons -->
      <div class="hero-actions">
        <CyberButton 
          text="Launch Portfolio" 
          variant="primary" 
          size="large"
          glitchEffect={true}
          scanEffect={true}
          initialDelay={0.8}
        />
        
        <CyberButton 
          text="Quick Hack" 
          variant="secondary" 
          size="medium"
          glitchEffect={true}
          pulseEffect={true}
          initialDelay={0.9}
          on:click={toggleQuickHackMenu}
        />
      </div>
      
      <!-- System info (collapsible) -->
      <div class="system-controls">
        <button 
          class="sys-info-toggle"
          aria-expanded={showSysInfo}
          on:click={toggleSysInfo}
        >
          {showSysInfo ? 'HIDE SYSTEM INFO' : 'SHOW SYSTEM INFO'}
          <div class="toggle-icon">{showSysInfo ? '−' : '+'}</div>
        </button>
        
        <div class="sys-info-panel" aria-hidden={!showSysInfo}>
          <div class="sys-info-grid">
            <div class="sys-info-item">
              <span class="info-label">SYSTEM TEMP</span>
              <span class="info-value">{systemTemp}°C</span>
            </div>
            <div class="sys-info-item">
              <span class="info-label">RAM USAGE</span>
              <span class="info-value">{ramUsage}/{ramTotal} GB</span>
            </div>
            <div class="sys-info-item">
              <span class="info-label">CPU LOAD</span>
              <span class="info-value">{cpuUsage}%</span>
            </div>
            <div class="sys-info-item">
              <span class="info-label">NET STATUS</span>
              <span class="info-value">{netStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="hero-right">
      <!-- Character profile section -->
      <div class="hero-character">
        <div class="character-frame">
          <div class="frame-inner">
            <div class="character-avatar">
              <!-- Profile image placeholder - with animated hexagon border -->
              <div class="avatar-wrapper">
                <HexShape 
                  size={300}
                  strokeColor="var(--color-teal)"
                  fillColor="rgba(var(--color-teal-rgb), 0.1)"
                  glowIntensity={0.7}
                  animate={true}
                  rotationSpeed={10}
                  scanEffect={true}
                />
                <div class="avatar-placeholder">
                  <span class="initial">{name[0]}</span>
                </div>
              </div>
            </div>
            
            <div class="character-id">
              <div class="id-name">{name}</div>
              <div class="id-level">LEVEL {level}</div>
              <div class="id-class">{jobTitle}</div>
            </div>
          </div>
        </div>
        
        <!-- Status bars -->
        <div class="hero-status-bars">
          <StatBar 
            label="RAM"
            value={ramUsage}
            maxValue={ramTotal}
            segments={ramTotal}
            scanEffect={true}
            initialDelay={1.2}
          />
          
          <StatBar 
            label="CPU"
            value={cpuUsage}
            maxValue={100}
            color="var(--color-gold)"
            pulseEffect={true}
            initialDelay={1.3}
            valueSuffix="%"
          />
        </div>
      </div>
    </div>
  </div>
  
  <!-- Quick Hack Menu (conditionally shown) -->
  <div class="quick-hack-container">
    <QuickHackMenu
      options={quickHackOptions}
      show={quickHackMenuVisible}
      initialDelay={0.1}
      on:select={handleQuickHackSelect}
      on:close={() => quickHackMenuVisible = false}
    />
  </div>
</div>

<style>
  /* Base layout */
  .hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-black);
    overflow: hidden;
    color: var(--color-white);
    padding: 2rem 1rem;
    /* Add filter property for glitch effect */
    filter: hue-rotate(0deg) brightness(1) contrast(1);
    will-change: filter, transform;
  }
  
  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    display: flex;
    margin: 0 auto;
    gap: 2rem;
  }
  
  .hero-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .hero-right {
    width: 35%;
    min-width: 320px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  /* Header styles */
  .hero-header {
    margin-bottom: 1rem;
  }
  
  :global(.hero-title) {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-teal);
    margin-bottom: 0.5rem;
    line-height: 1.1;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
    color: var(--color-red);
    opacity: 0.9;
    margin: 0;
  }
  
  /* Cyberdeck info */
  .cyberdeck-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(var(--color-teal-rgb), 0.3);
    padding: 0.5rem 1rem;
    margin-bottom: 0.5rem;
  }
  
  .cyberdeck-model {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .label {
    color: var(--color-light-gray);
    font-size: 0.8rem;
  }
  
  .value {
    color: var(--color-teal);
    font-weight: 500;
  }
  
  .cyberdeck-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-teal);
    box-shadow: 0 0 5px var(--color-teal);
    animation: blink 2s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  .status-text {
    font-size: 0.8rem;
    color: var(--color-teal);
  }
  
  /* Skills section */
  .section-title {
    font-size: 1rem;
    color: var(--color-gold);
    margin-bottom: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .section-title::before, .section-title::after {
    content: '';
    height: 1px;
    background-color: rgba(var(--color-gold-rgb), 0.5);
  }
  
  .section-title::before {
    width: 30px;
  }
  
  .section-title::after {
    flex: 1;
  }
  
  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  
  /* Action buttons */
  .hero-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  /* Character section */
  .hero-character {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .character-frame {
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(var(--color-teal-rgb), 0.5);
    padding: 0.5rem;
    position: relative;
    box-shadow: 0 0 20px rgba(var(--color-teal-rgb), 0.2);
  }
  
  .frame-inner {
    border: 1px solid rgba(var(--color-teal-rgb), 0.3);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .character-avatar {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .avatar-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
  }
  
  .avatar-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background-color: rgba(var(--color-teal-rgb), 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  
  .initial {
    font-size: 5rem;
    font-weight: bold;
    color: var(--color-teal);
  }
  
  .character-id {
    text-align: center;
    width: 100%;
    padding: 0.5rem;
    border-top: 1px solid rgba(var(--color-teal-rgb), 0.3);
  }
  
  .id-name {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-teal);
    margin-bottom: 0.2rem;
  }
  
  .id-level {
    font-size: 0.9rem;
    color: var(--color-gold);
    margin-bottom: 0.2rem;
  }
  
  .id-class {
    font-size: 0.8rem;
    color: var(--color-light-gray);
  }
  
  /* Status bars styling is handled by the StatBar component */
  .hero-status-bars {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  /* System info panel */
  .system-controls {
    margin-top: 1rem;
  }
  
  .sys-info-toggle {
    width: 100%;
    background-color: transparent;
    border: none;
    color: var(--color-teal);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 1px solid rgba(var(--color-teal-rgb), 0.3);
  }
  
  .toggle-icon {
    font-size: 1.2rem;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(var(--color-teal-rgb), 0.5);
  }
  
  .sys-info-panel {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: height 0.3s, opacity 0.3s;
  }
  
  .sys-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 1rem 0;
  }
  
  .sys-info-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .info-label {
    font-size: 0.7rem;
    color: var(--color-light-gray);
  }
  
  .info-value {
    font-size: 0.9rem;
    color: var(--color-teal);
  }
  
  /* Quick hack menu positioning */
  .quick-hack-container {
    position: absolute;
    top: 30%;
    right: 5%;
    z-index: 100;
  }
  
  /* Scan line and cyberpunk effects */
  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      to right,
      rgba(var(--color-teal-rgb), 0) 0%,
      rgba(var(--color-teal-rgb), 0.5) 50%,
      rgba(var(--color-teal-rgb), 0) 100%
    );
    z-index: 10;
    pointer-events: none;
    animation: scanAnimation 4s linear infinite;
    opacity: 0.7;
    filter: drop-shadow(0 0 2px rgba(var(--color-teal-rgb), 0.8));
  }
  
  .scan-interference {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(var(--color-teal-rgb), 0.02) 50%,
      transparent 100%
    );
    z-index: 9;
    pointer-events: none;
    animation: interferenceAnimation 4s ease-in-out infinite;
    opacity: 0.3;
  }
  
  /* Cyberpunk 2077 style noise overlay */
  .noise-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.07;
    z-index: 8;
    pointer-events: none;
    mix-blend-mode: overlay;
    animation: noiseAnimation 0.5s steps(1) infinite;
  }
  
  @keyframes noiseAnimation {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-1px, 1px); }
    20% { transform: translate(1px, -1px); }
    30% { transform: translate(-1px, -1px); }
    40% { transform: translate(1px, 1px); }
    50% { transform: translate(-1px, 0); }
    60% { transform: translate(1px, 0); }
    70% { transform: translate(0, 1px); }
    80% { transform: translate(0, -1px); }
    90% { transform: translate(1px, -1px); }
    100% { transform: translate(0, 0); }
  }
  
  @keyframes scanAnimation {
    0% { top: 0; opacity: 0.7; }
    25% { opacity: 0.9; }
    50% { opacity: 0.7; }
    75% { opacity: 0.9; }
    100% { top: 100%; opacity: 0.7; }
  }
  
  @keyframes interferenceAnimation {
    0% { background-position: 0 -100%; opacity: 0.2; }
    50% { background-position: 0 100%; opacity: 0.3; }
    100% { background-position: 0 300%; opacity: 0.2; }
  }
  
  /* Responsive styles */
  @media (max-width: 1100px) {
    .hero-content {
      flex-direction: column;
    }
    
    .hero-right {
      width: 100%;
      order: 1;
    }
    
    .hero-left {
      order: 2;
    }
    
    .character-frame {
      max-width: 600px;
      margin: 0 auto;
    }
    
    .quick-hack-container {
      top: 20%;
      right: 50%;
      transform: translateX(50%);
    }
  }
  
  @media (max-width: 768px) {
    :global(.hero-title) {
      font-size: 2rem;
    }
    
    .hero-subtitle {
      font-size: 0.9rem;
    }
    
    .avatar-wrapper {
      width: 150px;
      height: 150px;
    }
    
    .hero-actions {
      flex-direction: column;
    }
    
    .sys-info-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .hero-section {
      padding: 1rem;
    }
    
    :global(.hero-title) {
      font-size: 1.6rem;
    }
    
    .avatar-wrapper {
      width: 120px;
      height: 120px;
    }
    
    .initial {
      font-size: 3rem;
    }
  }
</style>