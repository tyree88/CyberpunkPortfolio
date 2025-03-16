<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { fade } from 'svelte/transition';
  import TypewriterText from '$lib/components/TypewriterText.svelte';
  import { navigateBack } from '$lib/stores/navigationStore';
  
  let isLoaded = false;
  let currentSection = 0;
  
  const lifeStories = [
    {
      title: "EARLY LIFE",
      content: "Born in the digital wasteland of the early 21st century, I quickly adapted to the ever-changing technological landscape. My neural pathways were forged in the crucible of endless code and creative expression."
    },
    {
      title: "EDUCATION",
      content: "Trained in the ancient arts of software engineering and design, I honed my skills through rigorous study and practical application. Each challenge was a puzzle to be solved, each solution a step toward mastery."
    },
    {
      title: "CAREER PATH",
      content: "As a digital nomad, I've navigated through various tech ecosystems, leaving my mark on projects both large and small. My expertise has evolved with each mission, adapting to new frameworks and methodologies."
    },
    {
      title: "PERSONAL INTERESTS",
      content: "Beyond the digital realm, I explore the physical world through photography, music, and travel. These experiences feed back into my creative process, enriching my perspective and approach to problem-solving."
    },
    {
      title: "PHILOSOPHY",
      content: "I believe in the power of technology to enhance human experience, not replace it. My work aims to bridge the gap between digital innovation and human connection, creating interfaces that feel intuitive and meaningful."
    }
  ];
  
  onMount(() => {
    // Animate in the page elements
    const timeline = gsap.timeline();
    
    timeline
      .from('.life-page-header', { 
        y: -50, 
        opacity: 0, 
        duration: 0.5 
      })
      .from('.life-nav-item', { 
        x: -30, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.3 
      }, '-=0.2')
      .from('.life-content', { 
        opacity: 0, 
        duration: 0.5 
      }, '-=0.1');
    
    isLoaded = true;
  });
  
  function selectSection(index: number) {
    currentSection = index;
    
    // Highlight selected nav item
    gsap.to('.life-nav-item', {
      color: '#ffffff',
      backgroundColor: 'transparent',
      duration: 0.3
    });
    
    gsap.to(`.life-nav-item:nth-child(${index + 1})`, {
      color: '#ECD06F',
      backgroundColor: 'rgba(73, 197, 182, 0.2)',
      duration: 0.3
    });
  }
  
  function handleBack() {
    navigateBack();
  }
</script>

<div class="life-page" in:fade={{ duration: 300 }}>
  <div class="life-page-header">
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
    <h1 class="life-title">NEURAL BIOGRAPHY</h1>
    <div class="header-decoration"></div>
  </div>
  
  <div class="life-page-content">
    <div class="life-nav">
      {#each lifeStories as story, i}
        <div 
          class="life-nav-item" 
          class:active={currentSection === i}
          on:click={() => selectSection(i)}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              selectSection(i);
            }
          }}
          tabindex="0"
          role="button"
          aria-selected={currentSection === i}
        >
          <span class="nav-icon">></span>
          <span class="nav-text">{story.title}</span>
        </div>
      {/each}
    </div>
    
    <div class="life-content">
      <h2 class="section-title">{lifeStories[currentSection].title}</h2>
      <div class="section-content">
        <TypewriterText text={lifeStories[currentSection].content} speed={2500} />
      </div>
      
      <div class="cyberdeck-decoration">
        <div class="decoration-line"></div>
        <div class="decoration-circle"></div>
        <div class="decoration-line"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .life-page {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    color: #ffffff;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .life-page-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    position: relative;
  }
  
  .back-button {
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #ff5252;
    color: #ff5252;
    padding: 0.3rem 0.7rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 2rem;
  }
  
  .back-button:hover {
    background: rgba(255, 82, 82, 0.2);
    box-shadow: 0 0 8px rgba(255, 82, 82, 0.5);
  }
  
  .back-icon {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }
  
  .life-title {
    font-family: 'Rajdhani', sans-serif;
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
    height: 1px;
    background: linear-gradient(90deg, transparent, #49c5b6, transparent);
  }
  
  .life-page-content {
    display: flex;
    flex: 1;
    gap: 2rem;
  }
  
  .life-nav {
    width: 250px;
    border-right: 1px solid rgba(73, 197, 182, 0.3);
    padding-right: 1rem;
  }
  
  .life-nav-item {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 2px solid transparent;
  }
  
  .life-nav-item:hover {
    background-color: rgba(73, 197, 182, 0.1);
    border-left: 2px solid #49c5b6;
  }
  
  .life-nav-item.active {
    color: #ECD06F;
    background-color: rgba(73, 197, 182, 0.2);
    border-left: 2px solid #ECD06F;
  }
  
  .nav-icon {
    margin-right: 0.8rem;
    color: #49c5b6;
    font-size: 0.8rem;
  }
  
  .nav-text {
    font-family: 'Rajdhani', sans-serif;
    letter-spacing: 1px;
  }
  
  .life-content {
    flex: 1;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(73, 197, 182, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .section-title {
    color: #ECD06F;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(236, 208, 111, 0.3);
  }
  
  .section-content {
    line-height: 1.6;
    color: #e0e0e0;
    font-size: 1rem;
    max-width: 800px;
  }
  
  .cyberdeck-decoration {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
  }
  
  .decoration-line {
    width: 50px;
    height: 1px;
    background-color: #49c5b6;
  }
  
  .decoration-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #49c5b6;
    margin: 0 5px;
    box-shadow: 0 0 5px #49c5b6;
  }
</style>
