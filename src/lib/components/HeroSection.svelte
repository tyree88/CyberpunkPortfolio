<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import GlitchText from './GlitchText.svelte';
  import TypewriterText from './TypewriterText.svelte';

  // Define component properties
  export const title: string = "CYBERPUNK DEV"; // Changed to const as we're using the logo now
  // Use const for description since it's not passed in as a prop
  export const description: string = "Welcome to my digital portfolio.";
  
  // Setup event dispatcher
  const dispatch = createEventDispatcher();
  
  // Menu options
  export let options = [
    { id: "about", text: "ABOUT ME", description: "View profile details and personal information" },
    { id: "skills", text: "TECHNICAL SKILLS", description: "Browse technical expertise and proficiency ratings" },
    { id: "projects", text: "RECENT PROJECTS", description: "View portfolio highlights and case studies" },
    { id: "experience", text: "WORK EXPERIENCE", description: "Explore professional history and achievements" },
    { id: "contact", text: "CONNECT", description: "Initiate communication protocols" }
  ];
  
  // Menu state
  let selectedOption = 0;
  
  // Handle option selection
  function selectOption(optionId) {
    dispatch('optionSelected', {
      optionId
    });
  }
  
  // Handle keyboard navigation
  function handleKeydown(event) {
    if (event.key === 'ArrowUp') {
      selectedOption = (selectedOption - 1 + options.length) % options.length;
    } else if (event.key === 'ArrowDown') {
      selectedOption = (selectedOption + 1) % options.length;
    } else if (event.key === 'Enter') {
      selectOption(options[selectedOption].id);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="hero-section">
  <!-- Cyberpunk Style Background and Effects -->
  <div class="scan-line"></div>
  <div class="noise-overlay"></div>
  
  <div class="start-screen">
    <!-- Title Section - Replaced with logo image -->
    <div class="title-container">
      <img src="/images/tyreepearson-logo.png" alt="CYBERPUNK DEV" class="logo-image" />
    </div>
    
    <!-- Simplified Menu Section - Single Button -->
    <div class="menu-container">
      <div class="enter-button-wrapper">
        <button 
          class="enter-button"
          on:click={() => selectOption('about')}
          on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectOption('about');
            }
          }}
        >
          ENTER THE PORTFOLIO
        </button>
      </div>
    </div>
    
    <div class="copyright">© 2025 TYREE PEARSON. ALL RIGHTS RESERVED.</div>
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
    background-color: #000;
    color: #fff;
    font-family: 'Rajdhani', 'Chakra Petch', sans-serif;
    overflow: hidden;
  }
  
  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/start-screen.webp') center center / cover no-repeat;
    opacity: 0.8;
    z-index: 0;
  }
  
  .start-screen {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100vh;
    padding: 5vh 2rem;
  }
  
  .title-container {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .logo-image {
    max-width: 450px;
    height: auto;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 15px rgba(255, 0, 76, 0.8));
  }
  
  .menu-container {
    background: linear-gradient(135deg, 
      rgba(0, 30, 60, 0.9) 0%, 
      rgba(5, 15, 40, 0.95) 50%,
      rgba(20, 0, 30, 0.9) 100%
    );
    border: 1px solid rgba(0, 255, 255, 0.3);
    border-left: 4px solid #00ffff;
    width: 90%;
    max-width: 400px;
    padding: 2rem;
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .enter-button-wrapper {
    width: 100%;
    text-align: center;
  }
  
  .enter-button {
    background: linear-gradient(90deg, 
      rgba(255, 0, 76, 0.05) 0%, 
      rgba(255, 0, 76, 0.3) 50%,
      rgba(255, 0, 76, 0.05) 100%
    );
    border: 2px solid #ff004c;
    color: #ffffff;
    font-family: 'Rajdhani', 'Chakra Petch', sans-serif;
    font-size: 1.8rem;
    font-weight: bold;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 1rem 2rem;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(255, 0, 76, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .enter-button:hover, .enter-button:focus {
    background-color: rgba(255, 0, 76, 0.4);
    color: #ffffff;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 25px rgba(255, 0, 76, 0.5);
  }
  
  .enter-button:before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border: 1px solid rgba(255, 0, 76, 0.5);
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .enter-button:hover:before {
    opacity: 1;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }
  
  .copyright {
    position: absolute;
    bottom: 1rem;
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
  }
  
  /* Visual effects */
  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, rgba(0, 255, 255, 0) 0%, rgba(0, 255, 255, 0.5) 50%, rgba(0, 255, 255, 0) 100%);
    z-index: 10;
    pointer-events: none;
    animation: scanAnimation 4s linear infinite;
    opacity: 0.7;
  }
  
  .noise-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.05;
    z-index: 1;
    pointer-events: none;
  }
  
  @keyframes scanAnimation {
    0% { top: 0; }
    100% { top: 100%; }
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .logo-image { max-width: 300px; }
    .menu-container { width: 95%; padding: 1.5rem; }
    .enter-button { font-size: 1.5rem; padding: 0.8rem 1.5rem; }
  }
  
  @media (max-width: 480px) {
    .logo-image { max-width: 250px; }
    .enter-button { font-size: 1.2rem; padding: 0.7rem 1.2rem; }
  }
</style>