<script lang="ts">
  import { gsap } from 'gsap';
  import { goto } from '$app/navigation';
  import GlitchText from './GlitchText.svelte';
  
  // Function to handle back navigation
  function handleBack() {
    // Navigate back to the cyberdeck page with a glitch effect
    const timeline = gsap.timeline({
      onComplete: () => {
        // Use goto to navigate to the cyberdeck page (which appears to be at the root path)
        goto('/');
      }
    });
    
    // Add cyberpunk-style glitch effect on exit
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
</script>

<!-- Header with back button and title -->
<div class="cyberware-header">
  <div class="header-left">
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
  </div>
  <div class="title-container">
    <h1 class="cyberware-title">PERSONAL CYBERWARE SYSTEM</h1>
    <div class="subtitle">CYBERNETIC ENHANCEMENT INTERFACE v2.77</div>
  </div>
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

<style>
  /* Header styles */
  .cyberware-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    background-color: rgba(0, 0, 0, 0.8);
    border-bottom: 1px solid #49c5b6;
    position: relative;
    z-index: 10;
    height: 70px;
    box-shadow: 0 0 15px rgba(73, 197, 182, 0.2);
  }
  
  .cyberware-title {
    color: #49c5b6;
    font-size: 1.3rem;
    letter-spacing: 2px;
    margin: 0 0 0.2rem 0;
    text-shadow: 0 0 10px rgba(73, 197, 182, 0.5);
    font-weight: 600;
  }
  
  .subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.75rem;
    letter-spacing: 1px;
  }
  
  .header-stats {
    display: flex;
    align-items: center;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(73, 197, 182, 0.1);
    padding: 0.3rem 0.6rem;
    border: 1px solid rgba(73, 197, 182, 0.3);
  }
  
  .stat-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.7rem;
    letter-spacing: 0.5px;
  }
  
  .stat-value {
    color: #ECD06F;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  
  .stat-divider {
    width: 1px;
    height: 20px;
    background-color: rgba(73, 197, 182, 0.5);
    margin: 0 1rem;
  }
  
  /* Back button */
  .back-button {
    display: flex;
    align-items: center;
    background-color: rgba(73, 197, 182, 0.1);
    border: 1px solid #49c5b6;
    color: #49c5b6;
    padding: 0.3rem 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.8rem;
    height: 36px;
  }
  
  .back-button:hover {
    background-color: rgba(73, 197, 182, 0.2);
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.5);
    transform: translateY(-1px);
  }
  
  .back-icon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .cyberware-header {
      flex-wrap: wrap;
      height: auto;
      padding: 0.5rem;
    }
    
    .header-left {
      order: 1;
      width: 100%;
      margin-bottom: 0.5rem;
    }
    
    .title-container {
      order: 2;
      width: 100%;
      text-align: center;
      margin-bottom: 0.5rem;
    }
    
    .header-stats {
      order: 3;
      width: 100%;
      justify-content: center;
    }
    
    .cyberware-title {
      font-size: 1.2rem;
    }
  }
</style>
