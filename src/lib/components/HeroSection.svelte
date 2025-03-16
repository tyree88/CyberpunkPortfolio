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
      title: "FRONTEND", 
      skills: ["React", "Vue", "Svelte"],
      position: { top: '12%', left: '30%' }
    },
    { 
      id: "operating-system", 
      title: "BACKEND", 
      skills: ["Node.js", "Express", "MongoDB"],
      position: { top: '12%', right: '25%' }
    },
    { 
      id: "skeleton", 
      title: "ARCHITECTURE", 
      skills: ["System Design", "API Dev", "Microservices"],
      position: { top: '40%', left: '22%' }
    },
    { 
      id: "integumentary", 
      title: "UI/UX", 
      skills: ["Design Systems", "Prototyping", "Animation"],
      position: { bottom: '25%', left: '25%' }
    },
    { 
      id: "circulatory", 
      title: "DEVOPS", 
      skills: ["Docker", "AWS", "CI/CD"],
      position: { top: '40%', right: '20%' }
    },
    { 
      id: "legs", 
      title: "MOBILE", 
      skills: ["React Native", "Progressive Web Apps"],
      position: { bottom: '25%', right: '23%' }
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
              <stop offset="0%" stop-color="#49c5b6" stop-opacity="0.4" />
              <stop offset="50%" stop-color="#ff5252" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#49c5b6" stop-opacity="0.4" />
            </linearGradient>
          </defs>
          <!-- Simplified human body silhouette -->
          <path d="M100,50 C130,50 150,70 150,100 C150,130 140,150 140,180 
                  C140,200 130,230 130,250 C130,270 120,300 120,320 
                  C120,340 110,370 100,380 C90,370 80,340 80,320 
                  C80,300 70,270 70,250 C70,230 60,200 60,180 
                  C60,150 50,130 50,100 C50,70 70,50 100,50" 
            fill="url(#body-gradient)" stroke="#49c5b6" stroke-width="1" />
          <!-- Head -->
          <circle cx="100" cy="40" r="25" fill="none" stroke="#49c5b6" stroke-width="1" />
        </svg>
        
        <!-- Connection lines animation will be handled by CSS -->
        <div class="connection-lines"></div>
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
  
  .hero-title {
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
    height: 500px;
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .body-display {
    position: relative;
    width: 200px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
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
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    padding: 0.5rem;
    z-index: 2;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.2);
  }
  
  .augmented-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    border-top: 2px solid #ff5252;
    border-left: 2px solid #ff5252;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(73, 197, 182, 0.3);
    padding-bottom: 0.25rem;
  }
  
  .section-icon {
    width: 15px;
    height: 15px;
    background-color: #ff5252;
    margin-right: 0.5rem;
    opacity: 0.7;
  }
  
  .section-title {
    font-size: 0.9rem;
    color: #ff5252;
    font-weight: bold;
    letter-spacing: 1px;
  }
  
  .section-skills {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .skill-item {
    font-size: 0.8rem;
    color: #49c5b6;
    padding: 0.1rem 0.3rem;
    background-color: rgba(73, 197, 182, 0.1);
    border-left: 2px solid #49c5b6;
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
  
  /* Scan line animation */
  .scan-line {
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
    .hero-title {
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