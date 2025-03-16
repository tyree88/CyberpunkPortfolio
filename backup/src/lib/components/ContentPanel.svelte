<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { gsap } from 'gsap';
  import { portfolioData } from '$lib/data/portfolioData';
  import GlitchText from './GlitchText.svelte';
  import TypewriterText from './TypewriterText.svelte';
  import ProjectCard from './ProjectCard.svelte';
  import ContactForm from './ContactForm.svelte';
  
  export let currentSection: string = 'about';
  let contentWrapper: HTMLElement;
  
  afterUpdate(() => {
    // Animation between content changes
    if (contentWrapper) {
      const timeline = gsap.timeline();
      
      timeline
        .to(contentWrapper, { 
          opacity: 0, 
          x: 10, 
          duration: 0.2,
          ease: 'power1.out'
        })
        .set(contentWrapper, { 
          x: -10 
        })
        .to(contentWrapper, { 
          opacity: 1, 
          x: 0, 
          duration: 0.3,
          ease: 'power1.in'
        });
        
      // Random glitch effect
      if (Math.random() > 0.7) {
        timeline.add(() => {
          gsap.to(contentWrapper, {
            skewX: 5,
            opacity: 0.9,
            duration: 0.05,
            yoyo: true,
            repeat: 1
          });
        }, "+=0.2");
      }
    }
  });
  
  onMount(() => {
    // Initial animation
    gsap.from(contentWrapper, { 
      opacity: 0, 
      duration: 0.5 
    });
  });
</script>

<div class="content-panel">
  <div class="panel-header">
    <div class="section-title">
      <GlitchText text="DATA" />
    </div>
    <div class="section-badge">
      {#if currentSection === 'projects' || currentSection === 'experience'}
        <div class="badge active">
          HACKING
        </div>
      {:else}
        <div class="badge">
          Z
        </div>
      {/if}
    </div>
  </div>
  
  <div class="content-wrapper" bind:this={contentWrapper}>
    {#if currentSection === 'about'}
      <div class="about-section">
        <div class="info-box">
          <div class="scan-results">
            <h2>SCAN RESULTS</h2>
            <div class="name">{portfolioData.about.name}</div>
            <div class="title">{portfolioData.about.title}</div>
          </div>
          
          <div class="bio-text">
            <TypewriterText text={portfolioData.about.bio} speed={30} />
          </div>
          
          <div class="stats-display">
            <div class="stat-row">
              <div class="stat-label">SPECIALTY</div>
              <div class="stat-value">{portfolioData.about.specialty}</div>
            </div>
            <div class="stat-row">
              <div class="stat-label">LOCATION</div>
              <div class="stat-value">{portfolioData.about.location}</div>
            </div>
            <div class="stat-row">
              <div class="stat-label">STATUS</div>
              <div class="stat-value available">{portfolioData.about.status}</div>
            </div>
          </div>
        </div>
      </div>
    {:else if currentSection === 'projects'}
      <div class="projects-section">
        <h2>PROJECT DATABASE</h2>
        <div class="projects-grid">
          {#each portfolioData.projects as project}
            <ProjectCard {project} />
          {/each}
        </div>
      </div>
    {:else if currentSection === 'experience'}
      <div class="experience-section">
        <h2>MEMORY ARCHIVES</h2>
        <div class="experience-timeline">
          {#each portfolioData.experience as job}
            <div class="experience-item">
              <div class="experience-header">
                <div class="exp-title">{job.title}</div>
                <div class="exp-company">{job.company}</div>
                <div class="exp-duration">{job.duration}</div>
              </div>
              <div class="experience-description">
                <TypewriterText text={job.description} speed={5} />
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
    {:else if currentSection === 'skills'}
      <div class="skills-section">
        <h2>CYBERNETIC AUGMENTATIONS</h2>
        <div class="skills-container">
          {#each Object.entries(portfolioData.skills) as [category, skills]}
            <div class="skill-category">
              <h3 class="category-title">{category}</h3>
              <div class="skills-grid">
                {#each skills as skill}
                  <div class="skill-item">
                    <div class="skill-name">{skill.name}</div>
                    <div class="skill-level">
                      <div class="level-bar">
                        <div class="level-fill" style="width: {skill.level}%"></div>
                      </div>
                      <div class="level-text">{skill.level}%</div>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {:else if currentSection === 'contact'}
      <div class="contact-section">
        <h2>ESTABLISH CONNECTION</h2>
        <div class="connection-details">
          <div class="contact-methods">
            <div class="contact-item">
              <span class="contact-label">NETWORK ID</span>
              <span class="contact-value">{portfolioData.contact.email}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">COMM LINK</span>
              <span class="contact-value">{portfolioData.contact.phone}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">NET PRESENCE</span>
              <span class="contact-value">
                <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener" class="social-link">LINKEDIN</a>
                <a href={portfolioData.contact.github} target="_blank" rel="noopener" class="social-link">GITHUB</a>
              </span>
            </div>
          </div>
          
          <ContactForm />
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .content-panel {
    flex: 1;
    background-color: rgba(0, 0, 0, 0.7);
    border-left: 1px solid #49c5b6;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid rgba(73, 197, 182, 0.5);
    height: 50px;
  }

  .section-title {
    color: #49c5b6;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .section-badge {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .badge {
    background-color: rgba(73, 197, 182, 0.2);
    border: 1px solid #49c5b6;
    color: #49c5b6;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
  }

  .badge.active {
    width: auto;
    padding: 0 10px;
    background-color: rgba(236, 208, 111, 0.2);
    border-color: #ECD06F;
    color: #ECD06F;
  }

  .content-wrapper {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
  }

  h2 {
    color: #ECD06F;
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
    letter-spacing: 1px;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(236, 208, 111, 0.3);
    padding-bottom: 0.5rem;
  }

  /* About Section */
  .info-box {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(73, 197, 182, 0.5);
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .scan-results {
    margin-bottom: 1.5rem;
  }

  .name {
    color: #ECD06F;
    font-size: 1.8rem;
    margin-bottom: 0.2rem;
  }

  .title {
    color: #49c5b6;
    font-size: 1.2rem;
    opacity: 0.9;
  }

  .bio-text {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .stats-display {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .stat-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-left: 3px solid #49c5b6;
  }

  .stat-label {
    color: #49c5b6;
    font-size: 0.8rem;
  }

  .stat-value {
    color: #fff;
  }

  .available {
    color: #4CAF50;
  }

  /* Projects Section */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  /* Experience Section */
  .experience-timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .experience-item {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(73, 197, 182, 0.5);
    padding: 1rem;
    position: relative;
  }

  .experience-item:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: #49c5b6;
    opacity: 0.7;
  }

  .experience-header {
    margin-bottom: 1rem;
  }

  .exp-title {
    color: #ECD06F;
    font-size: 1.2rem;
    margin-bottom: 0.3rem;
  }

  .exp-company {
    color: #49c5b6;
    font-size: 1rem;
    margin-bottom: 0.2rem;
  }

  .exp-duration {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.8rem;
  }

  .experience-description {
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .experience-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    background-color: rgba(73, 197, 182, 0.2);
    border: 1px solid rgba(73, 197, 182, 0.5);
    color: #49c5b6;
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
  }

  /* Skills Section */
  .skills-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .skill-category {
    margin-bottom: 1.5rem;
  }

  .category-title {
    color: #49c5b6;
    font-size: 1.1rem;
    margin-bottom: 1rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .skill-item {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 0.8rem;
    border-left: 3px solid #49c5b6;
  }

  .skill-name {
    margin-bottom: 0.5rem;
    color: #fff;
  }

  .skill-level {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .level-bar {
    flex: 1;
    height: 5px;
    background-color: rgba(73, 197, 182, 0.2);
    overflow: hidden;
  }

  .level-fill {
    height: 100%;
    background-color: #49c5b6;
  }

  .level-text {
    color: #49c5b6;
    font-size: 0.8rem;
    min-width: 40px;
    text-align: right;
  }

  /* Contact Section */
  .connection-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .contact-methods {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    border-left: 3px solid #49c5b6;
  }

  .contact-label {
    color: #49c5b6;
    font-size: 0.8rem;
  }

  .contact-value {
    color: #fff;
  }

  .social-link {
    color: #ECD06F;
    text-decoration: none;
    margin-right: 1rem;
    position: relative;
    transition: all 0.2s ease;
  }

  .social-link:hover {
    color: #fff;
    text-shadow: 0 0 8px rgba(236, 208, 111, 0.8);
  }

  .social-link:after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: #ECD06F;
    opacity: 0.5;
  }

  /* Custom scrollbar */
  .content-wrapper::-webkit-scrollbar {
    width: 5px;
  }

  .content-wrapper::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.3);
  }

  .content-wrapper::-webkit-scrollbar-thumb {
    background: rgba(73, 197, 182, 0.5);
  }

  .content-wrapper::-webkit-scrollbar-thumb:hover {
    background: rgba(73, 197, 182, 0.8);
  }

  @media (max-width: 992px) {
    .connection-details {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .content-panel {
      height: 60vh;
    }
  }
</style>
