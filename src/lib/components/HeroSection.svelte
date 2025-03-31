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
          <div class="button-content">
            <span class="button-text">ENTER THE PORTFOLIO</span>
            <div class="hack-tags">
              <span class="tag">QUICKHACK</span>
            </div>
          </div>
          <div class="ram-cost">
            <span class="cost-value">
              <span class="plus-sign">+</span> 2
            </span>
          </div>
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
    filter: brightness(0.9) saturate(1.1) hue-rotate(-10deg);
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
    filter: drop-shadow(0 0 15px rgba(73, 197, 182, 0.8));
  }
  
  .menu-container {
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(73, 197, 182, 0.3);
    width: 90%;
    max-width: 400px;
    padding: 2rem;
    box-shadow: 0 0 15px rgba(73, 197, 182, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .enter-button-wrapper {
    width: 100%;
    text-align: center;
  }
  
  .enter-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(73, 197, 182, 0.3);
    color: #49c5b6;
    font-family: 'Roboto Mono', monospace;
    text-transform: uppercase;
    padding: 0.8rem 1.5rem;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .enter-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #49c5b6;
    opacity: 0.7;
  }
  
  .enter-button:hover, .enter-button:focus {
    background-color: rgba(73, 197, 182, 0.2);
    border-color: rgba(73, 197, 182, 0.7);
    color: #ECD06F;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.3);
    text-shadow: 0 0 8px rgba(73, 197, 182, 0.5);
    transform: translateY(-2px);
  }
  
  .enter-button:hover .tag,
  .enter-button:focus .tag {
    color: #ECD06F;
    border-color: rgba(236, 208, 111, 0.5);
    background-color: rgba(73, 197, 182, 0.1);
  }
  
  .enter-button:hover .cost-value,
  .enter-button:focus .cost-value {
    color: #ECD06F;
  }
  
  .button-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .button-text {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    margin-bottom: 0.3rem;
  }
  
  .hack-tags {
    display: flex;
    gap: 0.5rem;
  }
  
  .tag {
    font-size: 0.6rem;
    color: rgba(73, 197, 182, 0.7);
    padding: 0.1rem 0.3rem;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(73, 197, 182, 0.3);
  }
  
  .ram-cost {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .cost-value {
    font-size: 1.1rem;
    color: #49c5b6;
  }
  
  .plus-sign {
    font-size: 0.8rem;
    font-weight: bold;
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
    background: linear-gradient(to right, rgba(73, 197, 182, 0) 0%, rgba(73, 197, 182, 0.5) 50%, rgba(73, 197, 182, 0) 100%);
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
    .button-text { font-size: 1.3rem; }
    .tag { font-size: 0.55rem; }
    .cost-value { font-size: 1rem; }
  }
  
  @media (max-width: 480px) {
    .logo-image { max-width: 250px; }
    .button-text { font-size: 1.1rem; }
    .enter-button { padding: 0.7rem 1rem; }
    .tag { font-size: 0.5rem; }
  }
</style>