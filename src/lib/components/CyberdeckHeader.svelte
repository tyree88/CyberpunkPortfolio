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
  let recordingBlink = false;
  
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
    
    // Blinking REC indicator
    gsap.to('.recording-indicator', {
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true
    });
    
    return () => {
      if (interval) clearInterval(interval);
    };
  });

  // Function to handle going back to the hero section
  function goBackToHero() {
    dispatch('backToHero');
  }
</script>

<div class="cyberdeck-header">
  <div class="header-left">
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
    <div class="time-display">
      <span class="label">TIME</span>
      <span class="time-box">{currentTime}</span>
    </div>
    <div class="recording">
      <span class="recording-indicator">● REC</span>
    </div>
  </div>
  
  <div class="header-center">
    <GlitchText text="CYBERDECK RAM" class="ram-title" />
    <RamBar />
  </div>
  
  <div class="header-right">
    <div class="connection-status">
      <span class="icon">⚡</span>
      <span class="text">CAMERA</span>
    </div>
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

  .time-box {
    font-family: 'Roboto Mono', monospace;
    background-color: rgba(255, 82, 82, 0.2);
    border: 1px solid #ff5252;
    color: #ff5252;
    padding: 0.2rem 0.5rem;
    font-size: 0.9rem;
  }

  .recording-indicator {
    color: #ff5252;
    font-size: 0.9rem;
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
    margin-right: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
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
