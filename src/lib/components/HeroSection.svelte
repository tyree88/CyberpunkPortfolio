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
  let bodyDisplay: HTMLElement;
  let augmentedSections: HTMLElement[] = [];
  
  const sections = [
    { 
      id: "frontal-cortex", 
      title: "FRONTAL CORTEX", 
      skills: ["React", "Vue", "Svelte"],
      position: { top: '5%', left: '10%' },
      connectionPoint: { x: 100, y: 50 },
      color: "#ff5252"
    },
    { 
      id: "operating-system", 
      title: "OPERATING SYSTEM", 
      skills: ["Node.js", "Express", "MongoDB"],
      position: { top: '5%', right: '10%' },
      connectionPoint: { x: 135, y: 80 },
      color: "#49c5b6"
    },
    { 
      id: "arms", 
      title: "ARMS", 
      skills: ["JavaScript", "TypeScript", "Responsive Design"],
      position: { top: '25%', left: '10%' },
      connectionPoint: { x: 70, y: 120 },
      color: "#ecd06f"
    },
    { 
      id: "face", 
      title: "FACE", 
      skills: ["UI/UX Design", "User Experience", "Design Systems"],
      position: { top: '25%', right: '10%' },
      connectionPoint: { x: 130, y: 70 },
      color: "#49c5b6"
    },
    { 
      id: "skeleton", 
      title: "SKELETON", 
      skills: ["System Architecture", "API Design", "Microservices"],
      position: { top: '45%', left: '10%' },
      connectionPoint: { x: 80, y: 180 },
      color: "#ff5252"
    },
    { 
      id: "hands", 
      title: "HANDS", 
      skills: ["Web Performance", "Optimization", "CSS"],
      position: { top: '45%', right: '10%' },
      connectionPoint: { x: 120, y: 160 },
      color: "#ecd06f"
    },
    { 
      id: "nervous-system", 
      title: "NERVOUS SYSTEM", 
      skills: ["State Management", "Redux", "Context API"],
      position: { bottom: '25%', left: '10%' },
      connectionPoint: { x: 85, y: 250 },
      color: "#ff5252"
    },
    { 
      id: "circulatory", 
      title: "CIRCULATORY SYSTEM", 
      skills: ["Docker", "CI/CD", "Cloud Services"],
      position: { bottom: '25%', right: '10%' },
      connectionPoint: { x: 115, y: 230 },
      color: "#49c5b6"
    },
    { 
      id: "integumentary", 
      title: "INTEGUMENTARY", 
      skills: ["Animation", "Motion Design", "Interactive UI"],
      position: { bottom: '5%', left: '10%' },
      connectionPoint: { x: 85, y: 320 },
      color: "#ecd06f"
    },
    { 
      id: "legs", 
      title: "LEGS", 
      skills: ["Mobile Development", "React Native", "PWAs"],
      position: { bottom: '5%', right: '10%' },
      connectionPoint: { x: 115, y: 330 },
      color: "#49c5b6"
    }
  ];
  
  onMount(() => {
    if (!browser) return;
    
    // Initialize sections
    const timeline = gsap.timeline({ delay: 0.5 });
    
    // Animate in the body silhouette
    timeline.from(bodyDisplay, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    });
    
    // Animate in each section
    augmentedSections.forEach((section, index) => {
      timeline.from(section, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "back.out(1.7)",
        delay: index * 0.1
      }, "-=0.2");
    });
    
    // Add scan line effect
    setTimeout(() => {
      // Create a scan line element and append it to the container
      if (heroContainer) {
        // Check if scan line already exists
        const existingScanLine = heroContainer.querySelector('.scan-line');
        if (!existingScanLine) {
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
      }
    }, 500);
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
    
    <div class="body-container">
      <div class="body-display" bind:this={bodyDisplay}>
        <!-- Cybernetic body silhouette -->
        <svg class="body-silhouette" width="200" height="400" viewBox="0 0 200 400">
          <defs>
            <linearGradient id="body-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#49c5b6" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#ff5252" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#ecd06f" stop-opacity="0.3" />
            </linearGradient>
            <radialGradient id="inner-glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.05" />
              <stop offset="80%" stop-color="#49c5b6" stop-opacity="0.1" />
              <stop offset="100%" stop-color="#49c5b6" stop-opacity="0" />
            </radialGradient>
          </defs>
          
          <!-- Human body silhouette with cybernetic/transparent appearance -->
          <!-- Torso -->
          <path d="M100,85 
                  C120,85 130,100 130,120 
                  C130,150 125,180 125,200 
                  C125,220 120,240 115,260 
                  L100,260 
                  L85,260 
                  C80,240 75,220 75,200 
                  C75,180 70,150 70,120 
                  C70,100 80,85 100,85" 
                fill="url(#body-gradient)" stroke="#49c5b6" stroke-width="0.8" opacity="0.7" />
          
          <!-- Head -->
          <ellipse cx="100" cy="50" rx="20" ry="25" fill="none" stroke="#49c5b6" stroke-width="0.8" opacity="0.8" />
          
          <!-- Neck -->
          <path d="M95,75 L95,85 L105,85 L105,75" fill="none" stroke="#49c5b6" stroke-width="0.8" />
          
          <!-- Left arm -->
          <path d="M70,120 
                  C65,130 60,150 55,170 
                  C50,190 45,210 40,230" 
                fill="none" stroke="#49c5b6" stroke-width="0.8" opacity="0.8" />
          
          <!-- Right arm -->
          <path d="M130,120 
                  C135,130 140,150 145,170 
                  C150,190 155,210 160,230" 
                fill="none" stroke="#49c5b6" stroke-width="0.8" opacity="0.8" />
          
          <!-- Left hand -->
          <path d="M40,230 C35,235 30,240 30,245" fill="none" stroke="#49c5b6" stroke-width="0.8" />
          
          <!-- Right hand -->
          <path d="M160,230 C165,235 170,240 170,245" fill="none" stroke="#49c5b6" stroke-width="0.8" />
          
          <!-- Left leg -->
          <path d="M85,260 
                  C80,280 75,300 70,320 
                  C68,330 66,340 65,350" 
                fill="none" stroke="#49c5b6" stroke-width="0.8" opacity="0.8" />
          
          <!-- Right leg -->
          <path d="M115,260 
                  C120,280 125,300 130,320 
                  C132,330 134,340 135,350" 
                fill="none" stroke="#49c5b6" stroke-width="0.8" opacity="0.8" />
          
          <!-- Brain outline for frontal cortex -->
          <path d="M90,40 C85,35 85,30 90,25 C95,20 105,20 110,25 C115,30 115,35 110,40" 
                fill="none" stroke="#ff5252" stroke-width="0.8" opacity="0.6" />
          
          <!-- Inner body glow -->
          <rect x="0" y="0" width="200" height="400" fill="url(#inner-glow)" opacity="0.3" />
          
          <!-- Grid pattern overlay -->
          <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#49c5b6" stroke-width="0.2" />
          </pattern>
          <rect x="0" y="0" width="200" height="400" fill="url(#grid-pattern)" opacity="0.3" />
          
          <!-- Connection points that will link to skill sections -->
          {#each sections as section}
            <circle 
              cx={section.connectionPoint.x} 
              cy={section.connectionPoint.y} 
              r="3" 
              fill={section.color} 
              opacity="0.8"
            />
          {/each}
        </svg>
        
        <!-- Connection lines from body to sections -->
        <svg class="connection-lines" width="100%" height="100%" viewBox="0 0 1200 800">
          {#each sections as section, i}
            <!-- Connection line from body to section -->
            <line 
              class="connection-line"
              x1={section.connectionPoint.x * 3 + 400} 
              y1={section.connectionPoint.y * 1.5 + 50} 
              x2={section.position.left ? 250 : 950} 
              y2={section.position.top 
                ? parseInt(section.position.top) * 8 + 50
                : section.position.bottom 
                  ? 800 - parseInt(section.position.bottom) * 8 - 50
                  : 400} 
              stroke={section.color} 
              stroke-width="1.5"
              stroke-dasharray="5,5"
              opacity="0.7"
            />
          {/each}
        </svg>
      </div>
      
      <!-- Skill sections positioned around the body -->
      {#each sections as section, i}
        <div 
          class="augmented-section"
          bind:this={augmentedSections[i]}
          style="
            top: {section.position.top || 'auto'};
            left: {section.position.left || 'auto'};
            right: {section.position.right || 'auto'};
            bottom: {section.position.bottom || 'auto'};
          "
        >
          <div class="section-header">
            <div class="section-icon"></div>
            <div class="section-title">{section.title}</div>
          </div>
          <div class="section-skills">
            {#each section.skills as skill}
              <div class="skill-item">{skill}</div>
            {/each}
          </div>
        </div>
      {/each}
      
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
    background-image: url('/images/CyberpunkBackground.jpeg');
    background-size: cover;
    background-position: center;
    z-index: 0;
    opacity: 0.6;
    filter: contrast(1.1) brightness(0.8);
  }
  
  .hero-section::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      url('/images/grid-overlay.svg'),
      url('/images/cyberpunk-bg-gradient.svg');
    background-size: 100px 100px, cover;
    background-position: center;
    z-index: 0;
    opacity: 0.5;
    mix-blend-mode: color-dodge;
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
  
  .body-container {
    position: relative;
    width: 100%;
    height: 650px;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    overflow: visible;
  }
  
  .body-display {
    position: relative;
    width: 600px;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
  }
  
  .body-silhouette {
    filter: drop-shadow(0 0 5px rgba(73, 197, 182, 0.3));
  }
  
  .connection-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  .augmented-section {
    position: absolute;
    width: 180px;
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid;
    border-image-slice: 1;
    padding: 0.5rem;
    z-index: 2;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    transition: all 0.3s ease;
  }
  
  .augmented-section:hover {
    transform: scale(1.05);
    z-index: 10;
  }
  
  /* Apply different border colors based on section ID */
  .augmented-section[style*="top: 5%"][style*="left"] {
    border-color: #ff5252;
    box-shadow: 0 0 10px rgba(255, 82, 82, 0.2);
  }
  
  .augmented-section[style*="top: 5%"][style*="right"] {
    border-color: #49c5b6;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.2);
  }
  
  .augmented-section[style*="top: 25%"][style*="left"] {
    border-color: #ecd06f;
    box-shadow: 0 0 10px rgba(236, 208, 111, 0.2);
  }
  
  .augmented-section[style*="top: 25%"][style*="right"] {
    border-color: #49c5b6;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.2);
  }
  
  .augmented-section[style*="top: 45%"][style*="left"] {
    border-color: #ff5252;
    box-shadow: 0 0 10px rgba(255, 82, 82, 0.2);
  }
  
  .augmented-section[style*="top: 45%"][style*="right"] {
    border-color: #ecd06f;
    box-shadow: 0 0 10px rgba(236, 208, 111, 0.2);
  }
  
  .augmented-section[style*="bottom: 25%"][style*="left"] {
    border-color: #ff5252;
    box-shadow: 0 0 10px rgba(255, 82, 82, 0.2);
  }
  
  .augmented-section[style*="bottom: 25%"][style*="right"] {
    border-color: #49c5b6;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.2);
  }
  
  .augmented-section[style*="bottom: 5%"][style*="left"] {
    border-color: #ecd06f;
    box-shadow: 0 0 10px rgba(236, 208, 111, 0.2);
  }
  
  .augmented-section[style*="bottom: 5%"][style*="right"] {
    border-color: #49c5b6;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.2);
  }
  
  .augmented-section::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    width: 10px;
    height: 10px;
    border-top: 2px solid;
    border-left: 2px solid;
    border-color: inherit;
  }
  
  .augmented-section::after {
    content: '';
    position: absolute;
    bottom: -1px;
    right: -1px;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    border-color: inherit;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 0.25rem;
  }
  
  .section-icon {
    width: 12px;
    height: 12px;
    margin-right: 0.5rem;
    opacity: 0.7;
  }
  
  .augmented-section[style*="top: 5%"][style*="left"] .section-icon,
  .augmented-section[style*="top: 45%"][style*="left"] .section-icon,
  .augmented-section[style*="bottom: 25%"][style*="left"] .section-icon {
    background-color: #ff5252;
  }
  
  .augmented-section[style*="top: 5%"][style*="right"] .section-icon,
  .augmented-section[style*="top: 25%"][style*="right"] .section-icon,
  .augmented-section[style*="bottom: 25%"][style*="right"] .section-icon,
  .augmented-section[style*="bottom: 5%"][style*="right"] .section-icon {
    background-color: #49c5b6;
  }
  
  .augmented-section[style*="top: 25%"][style*="left"] .section-icon,
  .augmented-section[style*="top: 45%"][style*="right"] .section-icon,
  .augmented-section[style*="bottom: 5%"][style*="left"] .section-icon {
    background-color: #ecd06f;
  }
  
  .section-title {
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  
  .augmented-section[style*="top: 5%"][style*="left"] .section-title,
  .augmented-section[style*="top: 45%"][style*="left"] .section-title,
  .augmented-section[style*="bottom: 25%"][style*="left"] .section-title {
    color: #ff5252;
  }
  
  .augmented-section[style*="top: 5%"][style*="right"] .section-title,
  .augmented-section[style*="top: 25%"][style*="right"] .section-title,
  .augmented-section[style*="bottom: 25%"][style*="right"] .section-title,
  .augmented-section[style*="bottom: 5%"][style*="right"] .section-title {
    color: #49c5b6;
  }
  
  .augmented-section[style*="top: 25%"][style*="left"] .section-title,
  .augmented-section[style*="top: 45%"][style*="right"] .section-title,
  .augmented-section[style*="bottom: 5%"][style*="left"] .section-title {
    color: #ecd06f;
  }
  
  .section-skills {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .skill-item {
    font-size: 0.75rem;
    padding: 0.1rem 0.3rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-left: 2px solid;
    position: relative;
  }
  
  .augmented-section[style*="top: 5%"][style*="left"] .skill-item,
  .augmented-section[style*="top: 45%"][style*="left"] .skill-item,
  .augmented-section[style*="bottom: 25%"][style*="left"] .skill-item {
    color: rgba(255, 82, 82, 0.9);
    border-color: #ff5252;
  }
  
  .augmented-section[style*="top: 5%"][style*="right"] .skill-item,
  .augmented-section[style*="top: 25%"][style*="right"] .skill-item,
  .augmented-section[style*="bottom: 25%"][style*="right"] .skill-item,
  .augmented-section[style*="bottom: 5%"][style*="right"] .skill-item {
    color: rgba(73, 197, 182, 0.9);
    border-color: #49c5b6;
  }
  
  .augmented-section[style*="top: 25%"][style*="left"] .skill-item,
  .augmented-section[style*="top: 45%"][style*="right"] .skill-item,
  .augmented-section[style*="bottom: 5%"][style*="left"] .skill-item {
    color: rgba(236, 208, 111, 0.9);
    border-color: #ecd06f;
  }
  
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
    z-index: 1;
    pointer-events: none;
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
    
    .body-container {
      height: auto;
      flex-direction: column;
    }
    
    .augmented-section {
      position: relative;
      width: 100%;
      max-width: 300px;
      margin: 0.5rem auto;
      top: auto;
      left: auto;
      right: auto;
      bottom: auto;
    }
    
    .body-display {
      display: none;
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