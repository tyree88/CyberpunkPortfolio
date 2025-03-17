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
    
    // Set up main animation timeline
    const timeline = gsap.timeline({ 
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        // Add occasional glitch effect to the hero section after initial animation
        scheduleGlitchEffect();
      }
    });
    
    // Enhanced intro animation sequence
    timeline
      .from('.title-section', { 
        y: -30, 
        opacity: 0, 
        duration: 1,
        ease: "power3.out"
      })
      .from('.description', {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        opacity: 0.5,
        duration: 0.8,
        ease: "power2.inOut"
      }, "-=0.3")
      .from('.cyber-circuits', { 
        opacity: 0, 
        scale: 0.95,
        filter: "hue-rotate(90deg) brightness(0.7)",
        duration: 1.2,
        ease: "back.out(1.2)"
      }, '-=0.5')
      .from('.system-stats', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7
      }, "-=0.8");
    
    // Add both scan effect elements
    if (cyberCircuits) {
      const scanLine = document.createElement('div');
      scanLine.classList.add('scan-line');
      cyberCircuits.appendChild(scanLine);
      
      const scanInterference = document.createElement('div');
      scanInterference.classList.add('scan-interference');
      cyberCircuits.appendChild(scanInterference);
    }
    
    // Create and animate floating skills with cyberpunk aesthetics
    if (cyberCircuits) {
      // Cyberpunk prefixes and suffixes for visual diversity
      const cyberpunkPrefixes = ['>', 'SYS:', '[v]', '//', 'NET:', '*', 'RAM:'];
      const cyberpunkSuffixes = ['<<', '.exe', '::', '_v2', '--', '+'];
      
      // Create skills with more visual variety
      skills.forEach((skill, index) => {
        // Apply cyberpunk formatting to some skills
        let displaySkill = skill;
        if (index % 4 === 0) {
          const prefix = cyberpunkPrefixes[Math.floor(Math.random() * cyberpunkPrefixes.length)];
          displaySkill = `${prefix} ${skill}`;
        } else if (index % 5 === 0) {
          const suffix = cyberpunkSuffixes[Math.floor(Math.random() * cyberpunkSuffixes.length)];
          displaySkill = `${skill} ${suffix}`;
        }
        
        // Create element with enhanced styling
        const skillElement = document.createElement('div');
        skillElement.classList.add('floating-skill');
        skillElement.innerText = displaySkill;
        
        // Better distribution to avoid clumping
        const section = Math.floor(index / (skills.length / 4)); // Divide into 4 sections
        let randomX, randomY;
        
        // Distribute skills more evenly across the container
        switch (section) {
          case 0: // Top left
            randomX = 10 + Math.random() * 35;
            randomY = 10 + Math.random() * 35;
            break;
          case 1: // Top right
            randomX = 55 + Math.random() * 35;
            randomY = 10 + Math.random() * 35;
            break;
          case 2: // Bottom left
            randomX = 10 + Math.random() * 35;
            randomY = 55 + Math.random() * 35;
            break;
          case 3: // Bottom right
            randomX = 55 + Math.random() * 35;
            randomY = 55 + Math.random() * 35;
            break;
        }
        
        // Apply initial position with slight rotation for dynamic feel
        skillElement.style.left = `${randomX}%`;
        skillElement.style.top = `${randomY}%`;
        skillElement.style.transform = `rotate(${-2 + Math.random() * 4}deg)`;
        skillElement.style.opacity = '0'; // Start invisible for staggered reveal
        
        // Add to DOM
        cyberCircuits.appendChild(skillElement);
        
        // Delayed appearance for a cascading effect
        gsap.to(skillElement, {
          opacity: 1,
          duration: 0.5,
          delay: 1 + (index * 0.05), // Staggered reveal
          ease: "power1.inOut"
        });
        
        // More dynamic floating animation
        gsap.to(skillElement, {
          x: `random(-15, 15)`,
          y: `random(-15, 15)`,
          rotation: `random(-3, 3)`,
          duration: `random(4, 8)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.08
        });
        
        // Add slight pulsing effect
        gsap.to(skillElement, {
          scale: `random(0.95, 1.05)`,
          boxShadow: index % 2 === 0 
            ? '0 0 8px rgba(73, 197, 182, 0.7)' 
            : '0 0 8px rgba(255, 82, 82, 0.7)',
          duration: `random(2, 4)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: `random(0, 2)`
        });
        
        // Add occasional glitch effect to some skills
        if (index % 6 === 0) {
          scheduleSkillGlitch(skillElement);
        }
        
        // Add connecting data flow lines with enhanced visuals
        addDataFlowLine(cyberCircuits, randomX, randomY, index);
      });
    }
    
    // Add additional cyber pulse effects in various positions
    addCyberPulseEffects(cyberCircuits, 8);
    
    // Function to schedule random glitch effects
    function scheduleGlitchEffect() {
      const delay = 5 + Math.random() * 15; // Random delay between 5-20 seconds
      
      gsap.delayedCall(delay, () => {
        // Create a quick glitch sequence
        const glitchTl = gsap.timeline({
          onComplete: scheduleGlitchEffect // Schedule next glitch when done
        });
        
        glitchTl
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
      });
    }
    
    // Function to add data flow lines with enhanced visuals
    function addDataFlowLine(container, targetX, targetY, index) {
      const dataLine = document.createElement('div');
      dataLine.classList.add('data-flow-line');
      
      // Center point (origin of data flow)
      const centerX = 50;
      const centerY = 50;
      
      // Calculate angle and distance for positioning
      const angle = Math.atan2(targetY - centerY, targetX - centerX);
      const distance = Math.sqrt(Math.pow(targetX - centerX, 2) + Math.pow(targetY - centerY, 2));
      
      // Set line dimensions with variation
      dataLine.style.width = `${distance}%`;
      dataLine.style.height = `${0.5 + Math.random() * 1}px`;
      
      // Position and rotate the line
      dataLine.style.top = `${centerY}%`;
      dataLine.style.left = `${centerX}%`;
      dataLine.style.transformOrigin = 'left center';
      dataLine.style.transform = `rotate(${angle}rad)`;
      dataLine.style.opacity = '0'; // Start invisible
      
      container.appendChild(dataLine);
      
      // Delayed appearance and pulsing animation
      gsap.to(dataLine, {
        opacity: 0.7,
        duration: 0.8,
        delay: 1.2 + (index * 0.03),
        ease: "power1.inOut"
      });
      
      // Pulsing animation
      gsap.to(dataLine, {
        opacity: index % 2 === 0 ? 0.3 : 0.6,
        scale: 1,
        duration: 1 + Math.random(),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random()
      });
      
      // Add data pulse traveling along some lines
      if (index % 3 === 0) {
        addDataPulse(dataLine);
      }
    }
    
    // Function to add a traveling data pulse on a line
    function addDataPulse(dataLine) {
      const dataPulse = document.createElement('div');
      dataPulse.style.position = 'absolute';
      dataPulse.style.width = '4px';
      dataPulse.style.height = '4px';
      dataPulse.style.borderRadius = '50%';
      dataPulse.style.backgroundColor = '#49c5b6';
      dataPulse.style.boxShadow = '0 0 4px #49c5b6';
      dataPulse.style.top = '50%';
      dataPulse.style.transform = 'translateY(-50%)';
      dataPulse.style.opacity = '0.8';
      dataPulse.style.zIndex = '5';
      dataLine.appendChild(dataPulse);
      
      // Animation for the pulse traveling along the line
      gsap.fromTo(dataPulse,
        { left: '0%' },
        { 
          left: '100%', 
          duration: 1.5 + Math.random(),
          repeat: -1,
          ease: "power1.inOut",
          delay: Math.random() * 2
        }
      );
    }
    
    // Function to add cyber pulse effects
    function addCyberPulseEffects(container, count) {
      for (let i = 0; i < count; i++) {
        const pulse = document.createElement('div');
        pulse.classList.add('cyber-pulse');
        
        // Position with better distribution
        const sector = i % 4; // Divide into 4 sectors
        let randomX, randomY;
        
        switch (sector) {
          case 0: // Top left
            randomX = Math.random() * 40 + 10;
            randomY = Math.random() * 40 + 10;
            break;
          case 1: // Top right
            randomX = Math.random() * 40 + 50;
            randomY = Math.random() * 40 + 10;
            break;
          case 2: // Bottom left
            randomX = Math.random() * 40 + 10;
            randomY = Math.random() * 40 + 50;
            break;
          case 3: // Bottom right
            randomX = Math.random() * 40 + 50;
            randomY = Math.random() * 40 + 50;
            break;
        }
        
        pulse.style.left = `${randomX}%`;
        pulse.style.top = `${randomY}%`;
        
        // Alternate colors for visual variety
        if (i % 3 === 0) {
          pulse.style.borderColor = 'rgba(255, 82, 82, 0.6)';
        } else if (i % 3 === 1) {
          pulse.style.borderColor = 'rgba(236, 208, 111, 0.6)';
        }
        
        container.appendChild(pulse);
        
        // Pulse animation with slight delay for each
        gsap.fromTo(pulse,
          { scale: 0, opacity: 0.8 },
          {
            scale: 2 + Math.random() * 3,
            opacity: 0,
            duration: 2 + Math.random() * 3,
            delay: i * 0.3 + Math.random(),
            repeat: -1,
            ease: "sine.out"
          }
        );
      }
    }
    
    // Function to schedule glitch effect for skills
    function scheduleSkillGlitch(element) {
      const delay = 3 + Math.random() * 10;
      
      gsap.delayedCall(delay, () => {
        // Quick glitch sequence
        const glitchTl = gsap.timeline({
          onComplete: () => scheduleSkillGlitch(element) // Schedule next glitch
        });
        
        // Store original values to restore later
        const originalColor = element.style.color || '#49c5b6';
        const originalTransform = element.style.transform;
        
        glitchTl
          .to(element, {
            x: '+=3',
            color: '#ff5252',
            textShadow: '0 0 5px #ff5252',
            duration: 0.08,
            ease: "steps(1)"
          })
          .to(element, {
            x: '-=6',
            color: '#ecd06f',
            textShadow: '0 0 5px #ecd06f',
            duration: 0.08,
            ease: "steps(1)"
          })
          .to(element, {
            x: '+=3',
            color: originalColor,
            textShadow: '0 0 5px rgba(73, 197, 182, 0.8)',
            transform: originalTransform,
            duration: 0.08,
            ease: "steps(1)"
          });
      });
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
      
      <!-- Slot for adding content after description, like the 'Enter Cyberdeck' button -->
      <div class="after-description">
        <slot name="after-description"></slot>
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
    background-color: rgba(0, 0, 0, 0.8); /* Reduced opacity from 0.95 to 0.8 */
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
    background-image: 
      linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.1)), /* Reduced opacity */
      radial-gradient(at 20% 30%, rgba(73, 197, 182, 0.5) 0%, transparent 70%), /* Increased cyan glow */
      radial-gradient(at 80% 70%, rgba(255, 82, 82, 0.5) 0%, transparent 70%); /* Increased red glow */
    background-size: cover;
    background-position: center;
    z-index: 0;
    opacity: 1;
    animation: backgroundPulse 8s ease-in-out infinite alternate;
  }
  
  @keyframes backgroundPulse {
    0% {
      filter: hue-rotate(0deg) brightness(1);
      background-position: 0% 0%;
    }
    50% {
      filter: hue-rotate(30deg) brightness(1.1);
      background-position: 20% 10%;
    }
    100% {
      filter: hue-rotate(-10deg) brightness(0.9);
      background-position: 10% 20%;
    }
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
  
  /* Styling for after-description slot */
  .after-description {
    margin-top: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
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
    box-shadow: 0 0 30px rgba(73, 197, 182, 0.3);
    overflow: hidden;
    animation: circuitGlow 5s ease-in-out infinite alternate;
    position: relative;
  }
  
  .cyber-circuits::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 20%, rgba(73, 197, 182, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(255, 82, 82, 0.15) 0%, transparent 40%);
    filter: blur(20px);
    animation: glowShift 8s ease-in-out infinite alternate;
    z-index: 0;
  }
  
  @keyframes circuitGlow {
    0% {
      box-shadow: 0 0 20px rgba(73, 197, 182, 0.3), inset 0 0 15px rgba(73, 197, 182, 0.1);
    }
    50% {
      box-shadow: 0 0 25px rgba(255, 82, 82, 0.2), inset 0 0 20px rgba(255, 82, 82, 0.1);
    }
    100% {
      box-shadow: 0 0 30px rgba(236, 208, 111, 0.3), inset 0 0 25px rgba(236, 208, 111, 0.1);
    }
  }
  
  @keyframes glowShift {
    0% {
      opacity: 0.7;
      background-position: 0% 0%;
    }
    50% {
      opacity: 0.9; 
      background-position: 10% 20%;
    }
    100% {
      opacity: 0.8;
      background-position: 20% 10%;
    }
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
    animation: gridSlideVertical 30s linear infinite;
  }
  
  .grid-vertical {
    background-image: repeating-linear-gradient(
      to right,
      rgba(73, 197, 182, 0.1) 0%,
      rgba(73, 197, 182, 0.1) 1px,
      transparent 1px,
      transparent 50px
    );
    animation: gridSlideHorizontal 30s linear infinite;
  }
  
  .grid-diagonal-1 {
    background-image: repeating-linear-gradient(
      45deg,
      rgba(255, 82, 82, 0.05) 0%,
      rgba(255, 82, 82, 0.05) 1px,
      transparent 1px,
      transparent 100px
    );
    animation: gridSlidePositive 60s linear infinite;
  }
  
  .grid-diagonal-2 {
    background-image: repeating-linear-gradient(
      -45deg,
      rgba(255, 82, 82, 0.05) 0%,
      rgba(255, 82, 82, 0.05) 1px,
      transparent 1px,
      transparent 100px
    );
    animation: gridSlideNegative 60s linear infinite;
  }
  
  @keyframes gridSlideVertical {
    0% { background-position: 0 0; }
    100% { background-position: 0 50px; }
  }
  
  @keyframes gridSlideHorizontal {
    0% { background-position: 0 0; }
    100% { background-position: 50px 0; }
  }
  
  @keyframes gridSlidePositive {
    0% { background-position: 0 0; }
    100% { background-position: 100px 100px; }
  }
  
  @keyframes gridSlideNegative {
    0% { background-position: 0 0; }
    100% { background-position: 100px -100px; }
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
    box-shadow: 0 0 5px rgba(73, 197, 182, 0.5);
    text-shadow: 0 0 5px rgba(73, 197, 182, 0.8);
    backdrop-filter: blur(1px);
    animation: skillGlow 3s infinite alternate;
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
  
  :global(.floating-skill)::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 5px;
    height: 5px;
    border-bottom: 1px solid #ff5252;
    border-right: 1px solid #ff5252;
  }
  
  @keyframes skillGlow {
    0% {
      box-shadow: 0 0 5px rgba(73, 197, 182, 0.5);
      border-color: rgba(73, 197, 182, 0.5);
    }
    50% {
      box-shadow: 0 0 8px rgba(255, 82, 82, 0.5);
      border-color: rgba(255, 82, 82, 0.5);
    }
    100% {
      box-shadow: 0 0 10px rgba(236, 208, 111, 0.5);
      border-color: rgba(236, 208, 111, 0.5);
    }
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
  
  /* Scan line animation */
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
    animation: scanAnimation 4s linear infinite;
    opacity: 0.7;
    filter: drop-shadow(0 0 2px rgba(73, 197, 182, 0.8));
  }
  
  :global(.scan-interference) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(73, 197, 182, 0.02) 50%,
      transparent 100%
    );
    z-index: 9;
    pointer-events: none;
    animation: interferenceAnimation 4s ease-in-out infinite;
    opacity: 0.3;
  }
  
  @keyframes scanAnimation {
    0% {
      top: 0;
      opacity: 0.7;
    }
    25% {
      opacity: 0.9;
    }
    50% {
      opacity: 0.7;
    }
    75% {
      opacity: 0.9;
    }
    100% {
      top: 100%;
      opacity: 0.7;
    }
  }
  
  @keyframes interferenceAnimation {
    0% {
      background-position: 0 -100%;
      opacity: 0.2;
    }
    50% {
      background-position: 0 100%;
      opacity: 0.3;
    }
    100% {
      background-position: 0 300%;
      opacity: 0.2;
    }
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