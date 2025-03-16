<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  import GlitchText from './GlitchText.svelte';
  import TypewriterText from './TypewriterText.svelte';
  
  export let title: string = "NETRUNNER PROFILE";
  export let subtitle: string = "Web Development | UI/UX Design | Creative Coding";
  export let description: string = "AUTHORIZED ACCESS ONLY: This terminal contains advanced development capabilities and creative coding skills. Proceed with caution.";
  
  let heroContainer: HTMLElement;
  let cyberCircuits: HTMLElement;
  
  // Tech skills to animate
  const skills = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue", 
    "Svelte", "Node.js", "Express", "MongoDB", "PostgreSQL", 
    "GraphQL", "REST API", "AWS", "Docker", "Git", "CI/CD", 
    "Python", "Django", "Flask", "UI/UX", "Figma", "WebGL", 
    "Three.js", "GSAP", "Motion Design", "Responsive Design"
  ];
  
  onMount(() => {
    // Skip animations if not in browser environment
    if (!browser) return;
    
    // Set up animations
    const timeline = gsap.timeline({ defaults: { ease: "power2.inOut" }});
    
    // Animate title & subtitle
    timeline
      .from('.title-section', { 
        y: -30, 
        opacity: 0, 
        duration: 1 
      })
      .from('.cyber-circuits', { 
        opacity: 0, 
        scale: 0.9, 
        duration: 0.8 
      }, '-=0.5');
    
    // Create and animate floating text elements
    if (cyberCircuits) {
      skills.forEach((skill, index) => {
        // Create a floating skill tag
        const skillElement = document.createElement('div');
        skillElement.classList.add('floating-skill');
        skillElement.innerText = skill;
        
        // Random position
        const randomX = Math.floor(Math.random() * 80) + 10; // 10-90%
        const randomY = Math.floor(Math.random() * 80) + 10; // 10-90%
        
        // Set initial position
        skillElement.style.left = `${randomX}%`;
        skillElement.style.top = `${randomY}%`;
        
        // Add to DOM
        cyberCircuits.appendChild(skillElement);
        
        // Animate each skill with random movement
        gsap.to(skillElement, {
          x: `random(-50, 50)`,
          y: `random(-50, 50)`,
          opacity: `random(0.4, 1)`,
          duration: `random(5, 15)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1
        });
        
        // Random pulse effect
        gsap.to(skillElement, {
          scale: `random(0.8, 1.2)`,
          duration: `random(2, 5)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: `random(0, 3)`
        });
      });
    }
    
    // Add data flow lines
    const numLines = 20;
    for (let i = 0; i < numLines; i++) {
      const line = document.createElement('div');
      line.classList.add('data-flow-line');
      
      // Random position and size
      const randomLeft = Math.random() * 100;
      const randomWidth = Math.random() * 50 + 50;
      const randomDuration = Math.random() * 5 + 3;
      const randomDelay = Math.random() * 5;
      
      line.style.left = `${randomLeft}%`;
      line.style.width = `${randomWidth}px`;
      
      cyberCircuits.appendChild(line);
      
      // Animate data flow
      gsap.fromTo(line, 
        { top: '-5%', opacity: 0 },
        { 
          top: '105%', 
          opacity: `random(0.3, 0.7)`,
          duration: randomDuration,
          delay: randomDelay,
          repeat: -1,
          ease: "none"
        }
      );
    }
    
    // Add scan line effect
    if (heroContainer) {
      const scanLine = document.createElement('div');
      scanLine.classList.add('scan-line');
      heroContainer.appendChild(scanLine);
      
      // Animate the scan line
      gsap.to(scanLine, {
        top: '100%',
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: false,
        repeatDelay: 1
      });
    }
    
    // Add circular pulse effects
    const numPulses = 5;
    for (let i = 0; i < numPulses; i++) {
      const pulse = document.createElement('div');
      pulse.classList.add('cyber-pulse');
      
      // Random position
      const randomX = Math.random() * 80 + 10;
      const randomY = Math.random() * 80 + 10;
      
      pulse.style.left = `${randomX}%`;
      pulse.style.top = `${randomY}%`;
      
      cyberCircuits.appendChild(pulse);
      
      // Animate pulse
      gsap.fromTo(pulse,
        { scale: 0, opacity: 0.8 },
        {
          scale: `random(1, 2)`,
          opacity: 0,
          duration: `random(2, 5)`,
          delay: i * 0.5,
          repeat: -1,
          ease: "sine.out"
        }
      );
    }
  });
</script>

<div class="hero-section" bind:this={heroContainer}>
  <div class="hero-content">
    <div class="title-section">
      <GlitchText text={title} class_name="hero-title" />
      <div class="subtitle">{subtitle}</div>
      <div class="description">
        <TypewriterText text={description} speed={30} />
      </div>
    </div>
    
    <div class="cyber-grid">
      <!-- Dynamic cyberpunk visualization -->
      <div class="cyber-circuits" bind:this={cyberCircuits}>
        <!-- Generated elements will be added here with JavaScript -->
        
        <!-- Core element -->
        <div class="cyber-core">
          <div class="core-inner"></div>
          <div class="core-ring"></div>
        </div>
        
        <!-- Grid lines -->
        <div class="grid-horizontal"></div>
        <div class="grid-vertical"></div>
        <div class="grid-diagonal-1"></div>
        <div class="grid-diagonal-2"></div>
      </div>
    </div>
    
    <!-- System stats -->
    <div class="system-stats">
      <div class="stat">
        <div class="stat-label">RAM</div>
        <div class="stat-value">16/16</div>
      </div>
      <div class="stat">
        <div class="stat-label">CPU</div>
        <div class="stat-value">98%</div>
      </div>
      <div class="stat">
        <div class="stat-label">STATUS</div>
        <div class="stat-value text-active">ACTIVE</div>
      </div>
    </div>
  </div>
</div>

<style>
  .hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.95);
    overflow: hidden;
    padding: 2rem;
  }
  
  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/images/cyberpunk-bg-gradient.svg');
    background-size: cover;
    background-position: center;
    z-index: 0;
    opacity: 0.8;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .title-section {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  :global(.hero-title) {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #49c5b6;
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: #ff5252;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .description {
    font-size: 1rem;
    max-width: 600px;
    margin: 0 auto;
    color: rgba(73, 197, 182, 0.8);
    border: 1px solid rgba(73, 197, 182, 0.3);
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
  }
  
  .description::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #49c5b6;
    border-left: 2px solid #49c5b6;
  }
  
  .description::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid #49c5b6;
    border-right: 2px solid #49c5b6;
  }
  
  /* New cyber circuit visualization */
  .cyber-grid {
    position: relative;
    width: 100%;
    height: 500px;
    margin-top: 2rem;
    overflow: hidden;
  }
  
  .cyber-circuits {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    box-shadow: 0 0 30px rgba(73, 197, 182, 0.2);
    overflow: hidden;
  }
  
  /* Core element in the center */
  .cyber-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
  
  .core-inner {
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, #ff5252 0%, rgba(255, 82, 82, 0.2) 70%);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(255, 82, 82, 0.8);
    animation: pulse 2s infinite;
  }
  
  .core-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border: 2px solid #49c5b6;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(73, 197, 182, 0.5);
    animation: rotating 10s linear infinite;
  }
  
  /* Grid background */
  .grid-horizontal,
  .grid-vertical,
  .grid-diagonal-1,
  .grid-diagonal-2 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  
  .grid-horizontal {
    background-image: repeating-linear-gradient(
      to bottom,
      rgba(73, 197, 182, 0.1) 0%,
      rgba(73, 197, 182, 0.1) 1px,
      transparent 1px,
      transparent 50px
    );
  }
  
  .grid-vertical {
    background-image: repeating-linear-gradient(
      to right,
      rgba(73, 197, 182, 0.1) 0%,
      rgba(73, 197, 182, 0.1) 1px,
      transparent 1px,
      transparent 50px
    );
  }
  
  .grid-diagonal-1 {
    background-image: repeating-linear-gradient(
      45deg,
      rgba(255, 82, 82, 0.05) 0%,
      rgba(255, 82, 82, 0.05) 1px,
      transparent 1px,
      transparent 100px
    );
  }
  
  .grid-diagonal-2 {
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(255, 82, 82, 0.05) 0%,
      rgba(255, 82, 82, 0.05) 1px,
      transparent 1px,
      transparent 100px
    );
  }
  
  /* Floating skills */
  :global(.floating-skill) {
    position: absolute;
    font-size: 0.8rem;
    color: #49c5b6;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.25rem 0.5rem;
    border: 1px solid rgba(73, 197, 182, 0.5);
    white-space: nowrap;
    z-index: 3;
    transform-origin: center;
  }
  
  :global(.floating-skill)::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    border-top: 1px solid #ff5252;
    border-left: 1px solid #ff5252;
  }
  
  /* Data flow lines */
  :global(.data-flow-line) {
    position: absolute;
    height: 1px;
    background: linear-gradient(
      to right,
      rgba(73, 197, 182, 0) 0%,
      rgba(73, 197, 182, 0.8) 50%,
      rgba(73, 197, 182, 0) 100%
    );
  }
  
  /* Pulse circles */
  :global(.cyber-pulse) {
    position: absolute;
    border: 1px solid rgba(73, 197, 182, 0.6);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    transform-origin: center;
  }
  
  /* System stats (kept from original) */
  .system-stats {
    position: absolute;
    bottom: 0;
    right: 5%;
    display: flex;
    gap: 1rem;
  }
  
  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .stat-label {
    font-size: 0.7rem;
    color: #ff5252;
  }
  
  .stat-value {
    font-size: 0.9rem;
    color: #49c5b6;
  }
  
  .text-active {
    color: #49c5b6;
    animation: blink 2s infinite;
  }
  
  /* Scan line animation - added as element in JS */
  :global(.scan-line) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      to right,
      rgba(73, 197, 182, 0) 0%,
      rgba(73, 197, 182, 0.5) 50%,
      rgba(73, 197, 182, 0) 100%
    );
    z-index: 10;
    pointer-events: none;
  }
  
  /* Animations */
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.95); }
  }
  
  @keyframes rotating {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    :global(.hero-title) {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1rem;
    }
    
    .cyber-grid {
      height: 300px;
    }
    
    .system-stats {
      position: relative;
      right: auto;
      bottom: auto;
      margin-top: 1rem;
      justify-content: center;
    }
  }
</style>