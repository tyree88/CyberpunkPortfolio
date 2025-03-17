<script lang="ts">
  import { gsap } from 'gsap';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import GlitchText from './GlitchText.svelte';
  
  // Initialize with a static time for SSR
  let currentTime = '00:00:00';
  
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
    
    return () => {
      clearInterval(interval);
    };
  });
</script>

<!-- Header with title and system information -->
<div class="cyberware-header">
  <div class="header-content">
    <a href="/" class="header-link">
      <div class="connection-status">
        <span class="icon">⚡</span>
        <span class="text">BACK TO CYBERDECK</span>
      </div>
    </a>
    
    <div class="time-display">
      <span class="label">TIME</span>
      <div class="time-controls">
        <span class="time-box">{currentTime}</span>
      </div>
    </div>
    
    <div class="title-container">
      <GlitchText text="PERSONAL CYBERWARE SYSTEM" class_name="title-text" />
      <div class="subtitle">CYBERNETIC ENHANCEMENT INTERFACE v2.77</div>
    </div>
  </div>
</div>

<style>
  /* Header styles */
  .cyberware-header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.8);
    border-bottom: 1px solid #49c5b6;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.3);
    height: 80px;
    position: relative;
    overflow: hidden;
  }
  
  .cyberware-header::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #49c5b6, transparent);
    animation: headerGlow 4s infinite alternate;
  }
  
  @keyframes headerGlow {
    0% {
      opacity: 0.5;
      box-shadow: 0 0 10px rgba(73, 197, 182, 0.5);
    }
    100% {
      opacity: 1;
      box-shadow: 0 0 20px rgba(73, 197, 182, 0.8);
    }
  }
  
  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    gap: 2rem;
  }
  
  .time-display {
    display: flex;
    flex-direction: column;
    margin-left: 1.5rem;
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
  
  .title-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
  }
  
  :global(.title-text) {
    color: #49c5b6;
    font-size: 1.2rem;
    letter-spacing: 2px;
    text-shadow: 0 0 15px rgba(73, 197, 182, 0.7);
    margin-bottom: 0.3rem;
  }
  
  .subtitle {
    color: #ECD06F;
    font-size: 0.8rem;
    letter-spacing: 1.5px;
    opacity: 0.8;
    text-transform: uppercase;
  }
  
  .subtitle::before {
    content: '>';
    color: #49c5b6;
    margin-right: 5px;
    animation: blink 1.5s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  .header-link {
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s ease;
    display: block;
    margin-right: 0.5rem;
  }
  
  .header-link:hover {
    transform: translateY(-2px);
  }
  
  .connection-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(236, 208, 111, 0.15);
    padding: 0.3rem 0.6rem;
    border: 1px solid rgba(236, 208, 111, 0.3);
  }
  
  .icon {
    color: #ECD06F;
    font-size: 0.9rem;
  }
  
  .text {
    color: #ECD06F;
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .cyberware-header {
      height: auto;
      padding: 0.5rem;
    }
    
    .header-content {
      flex-direction: column;
      gap: 1rem;
    }
    
    .time-display,
    .title-container,
    .header-link {
      width: 100%;
      justify-content: center;
      margin-bottom: 0.5rem;
    }
    
    .connection-status {
      width: fit-content;
      margin: 0 auto;
    }
  }
</style>
