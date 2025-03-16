<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { fade, fly, slide } from 'svelte/transition';
  import TypewriterText from '$lib/components/TypewriterText.svelte';
  import GlitchText from '$lib/components/GlitchText.svelte';
  import { portfolioData } from '$lib/data/portfolioData';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);
  
  // Page state
  let isLoaded = false;
  let currentSection = 'about';
  let mousePosition = { x: 0, y: 0 };
  let trailElements: HTMLElement[] = [];
  let trailContainer: HTMLElement | null = null;
  let aboutContainer: HTMLElement | null = null;
  let skillsContainer: HTMLElement | null = null;
  let experienceContainer: HTMLElement | null = null;
  let projectsContainer: HTMLElement | null = null;
  let contactContainer: HTMLElement | null = null;
  
  // About sections data
  const aboutSections = [
    {
      id: 'about',
      title: "NEURAL PROFILE",
      icon: "🧠",
      color: "#49c5b6"
    },
    {
      id: 'skills',
      title: "AUGMENTATIONS",
      icon: "⚡",
      color: "#ECD06F"
    },
    {
      id: 'experience',
      title: "MEMORY ARCHIVES",
      icon: "💾",
      color: "#ff5252"
    },
    {
      id: 'projects',
      title: "BREACH PROTOCOL",
      icon: "🔓",
      color: "#9059ff"
    },
    {
      id: 'contact',
      title: "ESTABLISH CONNECTION",
      icon: "📡",
      color: "#2ecc71"
    }
  ];
  
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
      for (let i = 0; i < 20; i++) {
        const trailElement = document.createElement('div');
        trailElement.className = 'cursor-dot';
        trailElement.style.width = `${4 + (i * 0.1)}px`;
        trailElement.style.height = `${4 + (i * 0.1)}px`;
        trailElement.style.opacity = `${1 - (i * 0.05)}`;
        trailElement.style.backgroundColor = i % 2 === 0 ? '#49c5b6' : '#ECD06F';
        
        trailContainer.appendChild(trailElement);
        trailElements.push(trailElement);
      }
    }
  }
  
  // Update cursor trail positions
  function updateTrailPositions(e: MouseEvent | KeyboardEvent) {
    if (!browser || !trailElements.length) return;
    
    // Only update for mouse events, not keyboard events
    if (e instanceof MouseEvent) {
      mousePosition.x = e.clientX;
      mousePosition.y = e.clientY;
      
      // Update trail element positions with delay
      trailElements.forEach((element, index) => {
        setTimeout(() => {
          element.style.left = `${mousePosition.x}px`;
          element.style.top = `${mousePosition.y}px`;
        }, index * 20);
      });
    }
  }
  
  // Handle section navigation
  function navigateToSection(sectionId: string) {
    currentSection = sectionId;
    
    // Create glitch effect on navigation
    const timeline = gsap.timeline();
    timeline
      .to('.about-section-content', { 
        x: 3, 
        opacity: 0.8, 
        duration: 0.05 
      })
      .to('.about-section-content', { 
        x: -3, 
        opacity: 0.9, 
        duration: 0.05 
      })
      .to('.about-section-content', { 
        x: 0, 
        opacity: 1, 
        duration: 0.05 
      });
    
    // Scroll to the section
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Highlight active nav item
    gsap.to('.nav-item', {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderColor: '#49c5b6',
      color: '#ffffff',
      duration: 0.3
    });
    
    gsap.to(`.nav-item[data-section="${sectionId}"]`, {
      backgroundColor: 'rgba(73, 197, 182, 0.2)',
      borderColor: '#ECD06F',
      color: '#ECD06F',
      duration: 0.3
    });
  }
  
  // Handle back navigation
  function handleBack() {
    // Navigate back to the main page with a glitch effect
    const timeline = gsap.timeline({
      onComplete: () => goto('/')
    });
    
    timeline
      .to('.about-page', { 
        x: 10, 
        opacity: 0.8, 
        duration: 0.1 
      })
      .to('.about-page', { 
        x: -10, 
        opacity: 0.6, 
        duration: 0.1 
      })
      .to('.about-page', { 
        x: 0, 
        opacity: 0, 
        duration: 0.2 
      });
  }
  
  // Initialize animations and event listeners
  onMount(() => {
    if (!browser) return;
    
    // Create cursor trail
    createTrailElements();
    window.addEventListener('mousemove', updateTrailPositions);
    
    // Initialize page animations
    const masterTimeline = gsap.timeline();
    
    masterTimeline
      .from('.about-header', { 
        y: -50, 
        opacity: 0, 
        duration: 0.5 
      })
      .from('.nav-item', { 
        x: -30, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.3 
      }, '-=0.2')
      .from('.about-section-content', { 
        opacity: 0, 
        duration: 0.5 
      }, '-=0.1')
      .from('.scan-lines', {
        opacity: 0,
        duration: 0.3
      });
    
    // Set up scroll animations
    setupScrollAnimations();
    
    // Highlight the first nav item
    gsap.to('.nav-item[data-section="about"]', {
      backgroundColor: 'rgba(73, 197, 182, 0.2)',
      borderColor: '#ECD06F',
      color: '#ECD06F',
      delay: 0.5,
      duration: 0.3
    });
    
    // Glowing border animation
    setupGlowingBorders();
    
    isLoaded = true;
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', updateTrailPositions);
      
      // Kill all GSAP animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.killTweensOf('*');
    };
  });
  
  // Set up scroll-triggered animations
  function setupScrollAnimations() {
    if (!browser) return;
    
    // About section animations
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.profile-info', {
          x: -50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.2
        });
      }
    });
    
    // Skills section animations
    ScrollTrigger.create({
      trigger: '#skills',
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.skill-category', {
          y: 50,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2
        });
        
        gsap.from('.skill-bar-fill', {
          width: 0,
          duration: 1,
          stagger: 0.05,
          delay: 0.5,
          ease: 'power2.out'
        });
      }
    });
    
    // Experience section animations
    ScrollTrigger.create({
      trigger: '#experience',
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.experience-item', {
          x: -100,
          opacity: 0,
          duration: 0.7,
          stagger: 0.3
        });
      }
    });
    
    // Projects section animations
    ScrollTrigger.create({
      trigger: '#projects',
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.project-card', {
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          stagger: 0.2,
          ease: 'back.out(1.7)'
        });
      }
    });
    
    // Contact section animations
    ScrollTrigger.create({
      trigger: '#contact',
      start: 'top 80%',
      onEnter: () => {
        gsap.from('.contact-form', {
          y: 50,
          opacity: 0,
          duration: 0.7
        });
        
        gsap.from('.contact-info', {
          x: -50,
          opacity: 0,
          duration: 0.7,
          delay: 0.3
        });
      }
    });
  }
  
  // Set up glowing border animations
  function setupGlowingBorders() {
    if (!browser) return;
    
    // Animate section borders
    gsap.to('.section-border', {
      boxShadow: '0 0 15px rgba(73, 197, 182, 0.7)',
      duration: 1.5,
      repeat: -1,
      yoyo: true
    });
    
    // Animate nav items on hover
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, {
          boxShadow: '0 0 15px rgba(236, 208, 111, 0.7)',
          duration: 0.3
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          boxShadow: '0 0 0px rgba(236, 208, 111, 0)',
          duration: 0.3
        });
      });
    });
  }
  
  // Flip card animation for projects
  function flipCard(event: MouseEvent | KeyboardEvent, index: number) {
    const card = event.currentTarget as HTMLElement;
    const isFlipped = card.classList.contains('flipped');
    
    if (isFlipped) {
      card.classList.remove('flipped');
    } else {
      card.classList.add('flipped');
    }
  }
</script>

<div class="about-page" in:fade={{ duration: 300 }}>
  <!-- Cursor trail container -->
  <div class="cursor-trail-container" bind:this={trailContainer}></div>
  
  <!-- Scan lines overlay for cyberpunk effect -->
  <div class="scan-lines"></div>
  
  <!-- Header with back button and title -->
  <div class="about-header">
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
      <h1 class="about-title"><GlitchText text="CYBERPUNK PROFILE" /></h1>
      <div class="header-decoration"></div>
    </div>
  </div>
  
  <!-- Navigation sidebar -->
  <div class="about-navigation">
    {#each aboutSections as section}
      <div 
        class="nav-item" 
        data-section={section.id}
        on:click={() => navigateToSection(section.id)}
        on:keydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            navigateToSection(section.id);
          }
        }}
        tabindex="0"
        role="button"
        aria-pressed={currentSection === section.id}
      >
        <span class="nav-icon">{section.icon}</span>
        <span class="nav-text">{section.title}</span>
      </div>
    {/each}
  </div>
  
  <!-- Main content area -->
  <div class="about-content">
    <!-- About/Profile Section -->
    <section id="about" class="about-section section-border" bind:this={aboutContainer}>
      <div class="about-section-header">
        <h2 class="section-title"><GlitchText text="NEURAL PROFILE" /></h2>
      </div>
      <div class="about-section-content">
        <div class="profile-container">
          <div class="profile-image-container">
            <div class="profile-image">
              <!-- Replace with your actual image -->
              <div class="profile-placeholder">NETRUNNER</div>
              <div class="profile-scan-effect"></div>
            </div>
            <div class="profile-status">STATUS: ONLINE</div>
          </div>
          
          <div class="profile-info">
            <div class="info-row">
              <div class="info-label">IDENTITY</div>
              <div class="info-value">{portfolioData.about.name}</div>
            </div>
            <div class="info-row">
              <div class="info-label">CLASS</div>
              <div class="info-value">{portfolioData.about.title}</div>
            </div>
            <div class="info-row">
              <div class="info-label">LOCATION</div>
              <div class="info-value">{portfolioData.about.location}</div>
            </div>
            <div class="info-row">
              <div class="info-label">STATUS</div>
              <div class="info-value status-available">{portfolioData.about.status}</div>
            </div>
          </div>
        </div>
        
        <div class="profile-bio">
          <h3 class="bio-title">NEURAL SCAN RESULTS</h3>
          <div class="bio-content">
            <TypewriterText text={portfolioData.about.bio} speed={30} />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Skills Section -->
    <section id="skills" class="skills-section section-border" bind:this={skillsContainer}>
      <div class="about-section-header">
        <h2 class="section-title"><GlitchText text="CYBERNETIC AUGMENTATIONS" /></h2>
      </div>
      <div class="about-section-content">
        {#each Object.entries(portfolioData.skills) as [category, skills]}
          <div class="skill-category">
            <h3 class="category-title">{category}</h3>
            <div class="skills-grid">
              {#each skills as skill}
                <div class="skill-item">
                  <div class="skill-name">{skill.name}</div>
                  <div class="skill-bar">
                    <div class="skill-bar-fill" style="width: {skill.level}%"></div>
                    <div class="skill-level">{skill.level}%</div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </section>
    
    <!-- Experience Section -->
    <section id="experience" class="experience-section section-border" bind:this={experienceContainer}>
      <div class="about-section-header">
        <h2 class="section-title"><GlitchText text="MEMORY ARCHIVES" /></h2>
      </div>
      <div class="about-section-content">
        <div class="experience-timeline">
          {#each portfolioData.experience as job}
            <div class="experience-item">
              <div class="experience-header">
                <div class="experience-title">{job.title}</div>
                <div class="experience-company">{job.company}</div>
                <div class="experience-duration">{job.duration}</div>
              </div>
              <div class="experience-description">
                <TypewriterText text={job.description} speed={20} />
              </div>
              <div class="experience-skills">
                {#each job.skills as skill}
                  <span class="skill-tag">{skill}</span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
    
    <!-- Projects Section -->
    <section id="projects" class="projects-section section-border" bind:this={projectsContainer}>
      <div class="about-section-header">
        <h2 class="section-title"><GlitchText text="BREACH PROTOCOL" /></h2>
      </div>
      <div class="about-section-content">
        <div class="projects-grid">
          {#each portfolioData.projects as project, i}
            <div 
              class="project-card" 
              on:click={(e) => flipCard(e, i)}
              on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  flipCard(e, i);
                }
              }}
              tabindex="0"
              role="button"
            >
              <div class="card-inner">
                <div class="card-front">
                  <h3 class="project-title">{project.title}</h3>
                  <div class="project-tech">
                    {#each project.technologies.slice(0, 3) as tech}
                      <span class="tech-tag">{tech}</span>
                    {/each}
                  </div>
                  <div class="card-footer">
                    <span class="flip-hint">CLICK TO HACK</span>
                  </div>
                </div>
                <div class="card-back">
                  <div class="project-description">
                    <TypewriterText text={project.description} speed={30} />
                  </div>
                  <div class="project-tech-full">
                    {#each project.technologies as tech}
                      <span class="tech-tag">{tech}</span>
                    {/each}
                  </div>
                  <div class="project-links">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" class="project-link">DEMO</a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" class="project-link">CODE</a>
                  </div>
                  <div class="card-footer">
                    <span class="flip-hint">CLICK TO CLOSE</span>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" class="contact-section section-border" bind:this={contactContainer}>
      <div class="about-section-header">
        <h2 class="section-title"><GlitchText text="ESTABLISH CONNECTION" /></h2>
      </div>
      <div class="about-section-content">
        <div class="contact-container">
          <div class="contact-info">
            <div class="info-row">
              <div class="info-label">NETWORK ID</div>
              <div class="info-value">{portfolioData.contact.email}</div>
            </div>
            <div class="social-links">
              <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" class="social-link">
                <span class="link-icon">IN</span>
                <span class="link-text">LINKEDIN</span>
              </a>
              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" class="social-link">
                <span class="link-icon">GH</span>
                <span class="link-text">GITHUB</span>
              </a>
            </div>
          </div>
          
          <div class="contact-form">
            <div class="form-header">
              <h3>TRANSMIT MESSAGE</h3>
            </div>
            <div class="form-group">
              <label for="name">IDENTITY</label>
              <input type="text" id="name" class="cyber-input" placeholder="Enter your name" />
            </div>
            <div class="form-group">
              <label for="email">NETWORK ID</label>
              <input type="email" id="email" class="cyber-input" placeholder="Enter your email" />
            </div>
            <div class="form-group">
              <label for="message">MESSAGE</label>
              <textarea id="message" class="cyber-input" rows="4" placeholder="Enter your message"></textarea>
            </div>
            <button class="submit-button">
              <span class="button-text">TRANSMIT</span>
              <span class="button-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
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
  .about-page {
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.95);
    color: #ffffff;
    padding: 0;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 80px 1fr;
    grid-template-areas:
      "header header"
      "nav content";
    overflow-x: hidden;
    position: relative;
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
  
  .cursor-dot {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: opacity 0.5s ease;
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
  .about-header {
    grid-area: header;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    background-color: rgba(0, 0, 0, 0.8);
    border-bottom: 1px solid #49c5b6;
    position: relative;
    z-index: 10;
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
  
  /* Main content area */
  .about-content {
    grid-area: content;
    padding: 2rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4rem;
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
