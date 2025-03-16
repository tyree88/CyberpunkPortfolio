<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  import RamBar from './RamBar.svelte';
  import GlitchText from './GlitchText.svelte';

  // Create event dispatcher
  const dispatch = createEventDispatcher();

  // Initialize with a static time for SSR
  let currentTime = '00:00:00';
  let healthValue = 85; // Current health percentage
  
  // Update the time every second
  onMount(() => {
    // Skip browser-specific code if not in browser environment
    if (!browser) return;
    
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      currentTime = `${hours}:${minutes}:${seconds}`;
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    // Animate health bar
    animateHealthBar();
    
    return () => {
      clearInterval(interval);
    };
  });

  // Function to handle going back to the hero section
  function animateHealthBar() {
    // Start with 0 and animate to the actual value
    gsap.fromTo('.health-fill', 
      { width: '0%' },
      { width: `${healthValue}%`, duration: 1.5, ease: 'power2.out' }
    );
    
    // Pulse animation for the health bar
    gsap.to('.health-fill', {
      opacity: 0.7,
      duration: 1.2,
      repeat: -1,
      yoyo: true
    });
  }

  function goBackToHero() {
    dispatch('backToHero');
  }
</script>

<div class="cyberdeck-header">
  <div class="header-left">
    <div class="time-display">
      <span class="label">TIME</span>
      <div class="time-controls">
        <span class="time-box">{currentTime}</span>
        <button 
          class="back-button" 
          on:click={goBackToHero}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              goBackToHero();
            }
          }}
          aria-label="Return to home screen"
        >
          <span class="back-icon">←</span>
          <span class="back-text">BACK</span>
        </button>
      </div>
    </div>
    <!-- Health container moved to header-right section -->
  </div>
  
  <div class="header-center">
    <GlitchText text="CYBERDECK RAM" class_name="ram-title" />
    <RamBar />
  </div>
  
  <div class="header-right">
    <a href="/my-life" class="header-link">
      <div class="combined-status">
        <div class="connection-status">
          <span class="icon">⚡</span>
          <span class="text">MORE ABOUT ME</span>
        </div>
        
        <div class="health-container">
          <div class="health-bar">
            <div class="health-fill" style="width: {healthValue}%"></div>
            <span class="health-text">{healthValue}%</span>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>

<style>
  .cyberdeck-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.8);
    border-bottom: 1px solid #49c5b6;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.3);
    height: 80px;
    position: relative;
  }

  .header-left, .header-right, .header-center {
    display: flex;
    align-items: center;
  }

  .time-display {
    display: flex;
    flex-direction: column;
    margin-right: 1.5rem;
  }

  .label {
    font-size: 0.7rem;
    color: #ff5252;
    margin-bottom: 0.2rem;
  }

  .time-controls {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .time-box {
    font-family: 'Roboto Mono', monospace;
    background-color: rgba(255, 82, 82, 0.2);
    border: 1px solid #ff5252;
    color: #ff5252;
    padding: 0.2rem 0.5rem;
    font-size: 0.9rem;
  }

  .header-link {
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease;
    display: block;
  }
  
  .header-link:hover {
    transform: translateY(-2px);
  }
  
  .header-link:first-child {
    margin-left: 0;
  }
  
  .header-right {
    display: flex;
    align-items: center;
  }
  
  .combined-status {
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(73, 197, 182, 0.4);
    padding: 0.5rem;
    border-radius: 2px;
  }
  
  .health-container {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
  }
  
  .health-bar {
    position: relative;
    width: 100px;
    height: 16px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid #ff5252;
    overflow: hidden;
  }
  
  .health-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: linear-gradient(90deg, #ff5252 0%, #ff7676 100%);
    box-shadow: 0 0 8px rgba(255, 82, 82, 0.7);
  }
  
  .health-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 0.7rem;
    font-family: 'Roboto Mono', monospace;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
    z-index: 1;
  }

  :global(.ram-title) {
    font-size: 1rem;
    color: #49c5b6;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
    letter-spacing: 1px;
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
    height: 100%;
  }
  
  .back-button:hover {
    background: rgba(255, 82, 82, 0.2);
    box-shadow: 0 0 8px rgba(255, 82, 82, 0.5);
  }
  
  .back-icon {
    margin-right: 0.5rem;
    font-size: 1.1rem;
  }
  
  .back-text {
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .connection-status {
    display: flex;
    align-items: center;
    color: #ff5252;
  }

  .icon {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    .cyberdeck-header {
      height: auto;
      padding: 0.8rem;
      flex-direction: column;
    }

    .header-left, .header-right, .header-center {
      margin: 0.5rem 0;
    }
  }
</style>
