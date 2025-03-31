<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { cursorPosition } from '$lib/stores/cursorStore';
  
  export let project: {
    title: string;
    description: string;
    technologies: string[];
    link: string;
    github?: string;
    // Updated preview structure
    preview?: {
      type: 'image' | 'svg'; // Can be image URL or raw SVG string/URL
      src: string;
    };
  };
  
  let card: HTMLElement;
  let isFlipped = false;
  let glitchTimeout: ReturnType<typeof setTimeout>;
  let cardX = 0;
  let cardY = 0;
  let cardWidth = 0;
  let cardHeight = 0;
  let rotateY = 0;
  let rotateX = 0;
  
  // Subscribe to cursor position for 3D effect
  const unsubscribe = cursorPosition.subscribe(({ x, y }) => {
    if (!card) return;
    
    // Get card position
    const rect = card.getBoundingClientRect();
    cardX = rect.left;
    cardY = rect.top;
    cardWidth = rect.width;
    cardHeight = rect.height;
    
    // Only apply 3D effect if mouse is near the card
    const mouseX = x;
    const mouseY = y;
    
    // Check if mouse is within or near card boundaries
    const isNearCard = 
      mouseX > cardX - 100 && 
      mouseX < cardX + cardWidth + 100 && 
      mouseY > cardY - 100 && 
      mouseY < cardY + cardHeight + 100;
    
    if (isNearCard) {
      // Calculate rotation based on mouse position relative to card center
      const centerX = cardX + cardWidth / 2;
      const centerY = cardY + cardHeight / 2;
      
      // Normalize values to -1 to 1 range
      const normalizedX = (mouseX - centerX) / (cardWidth / 2);
      const normalizedY = (mouseY - centerY) / (cardHeight / 2);
      
      // Apply rotation (limited to small angles)
      rotateY = normalizedX * 5; // Max 5 degrees
      rotateX = -normalizedY * 5; // Negative for correct direction
    } else {
      // Reset rotation when mouse is away
      rotateY = 0;
      rotateX = 0;
    }
  });
  
  onMount(() => {
    // Randomize glitch effects
    scheduleRandomGlitch();
    
    return () => {
      unsubscribe();
      if (glitchTimeout) clearTimeout(glitchTimeout);
    };
  });
  
  function flipCard() {
    // Only toggle the state. CSS handles the animation via the 'flipped' class.
    isFlipped = !isFlipped;
  }
  
  function scheduleRandomGlitch() {
    const delay = 3000 + Math.random() * 7000; // Between 3-10 seconds
    
    glitchTimeout = setTimeout(() => {
      triggerGlitch();
      scheduleRandomGlitch();
    }, delay);
  }
  
  function triggerGlitch() {
    // Don't glitch if card is flipped
    if (isFlipped) return;
    
    const timeline = gsap.timeline();
    
    timeline
      .to(card, {
        x: -3,
        skewX: 2,
        opacity: 0.8,
        duration: 0.05
      })
      .to(card, {
        x: 3,
        skewX: 0,
        opacity: 1,
        duration: 0.04
      })
      .to(card, {
        x: 0,
        opacity: 0.9,
        duration: 0.05
      })
      .to(card, {
        opacity: 1,
        duration: 0.05
      });
  }
</script>

<div 
  class="project-card" 
  class:flipped={isFlipped} 
  bind:this={card}
  on:click={flipCard}
  on:keydown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      flipCard();
    }
  }}
  style="transform: perspective(1000px) rotateY({rotateY}deg) rotateX({rotateX}deg);"
  role="button"
  tabindex="0"
  aria-pressed={isFlipped}
>
  <div class="card-inner">
    <div class="card-front">
      <div class="card-header">
        <h3 class="project-title">{project.title}</h3>
      </div>
      
      <div class="card-content">
        <div class="project-preview">
          <div class="project-image">
            {#if project.preview}
              {#if project.preview.type === 'image'}
                <img src={project.preview.src} alt="{project.title} preview" class="project-actual-image" />
              {:else if project.preview.type === 'svg'}
                <!-- Assuming src is a path to an SVG file -->
                <img src={project.preview.src} alt="{project.title} preview SVG" class="project-actual-image svg-image" />
                <!-- OR if src contains raw SVG markup: -->
                <!-- {@html project.preview.src} -->
                <!-- Note: Using {@html} requires careful sanitization if the SVG source is dynamic/user-provided -->
              {/if}
            {:else}
              <!-- Fallback Placeholder SVG -->
              <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" class="placeholder-svg">
                <rect width="200" height="150" fill="#000" stroke="#49c5b6" stroke-width="2" />
                <line x1="0" y1="0" x2="200" y2="150" stroke="#49c5b6" stroke-width="1" />
                <line x1="200" y1="0" x2="0" y2="150" stroke="#49c5b6" stroke-width="1" />
                <text x="100" y="75" text-anchor="middle" fill="#49c5b6" font-family="monospace" font-size="12">
                  PROJECT DATA
                </text>
              </svg>
            {/if}
          </div>
        </div>
        
        <div class="tech-tags">
          {#each project.technologies.slice(0, 3) as tech}
            <span class="tech-tag">{tech}</span>
          {/each}
          {#if project.technologies.length > 3}
            <span class="tech-tag">+{project.technologies.length - 3}</span>
          {/if}
        </div>

        <!-- Add Live Site Link Here -->
        <div class="front-links">
           <a
             href={project.link}
             target="_blank"
             rel="noopener noreferrer"
             class="project-link front-link"
             on:click|stopPropagation
           >VIEW SITE</a>
        </div>
      </div>
      
      <div class="card-footer">
        <div class="flip-instruction">
          <span class="icon">⟳</span>
          <span class="text">TAP FOR DETAILS</span>
        </div>
      </div>
    </div>
    
    <div class="card-back">
      <div class="card-header">
        <h3 class="project-title">{project.title}</h3>
      </div>
      
      <div class="card-content">
        <p class="project-description">{project.description}</p>
        
        <div class="tech-tags-full">
          {#each project.technologies as tech}
            <span class="tech-tag">{tech}</span>
          {/each}
        </div>
      </div>
      
      <div class="card-footer">
        <div class="project-links">
          <a href={project.link} target="_blank" rel="noopener" class="project-link">DEMO</a>
          {#if project.github}
            <a href={project.github} target="_blank" rel="noopener" class="project-link">CODE</a>
          {/if}
        </div>
        
        <div class="flip-instruction">
          <span class="icon">⟳</span>
          <span class="text">BACK</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .project-card {
    background-color: rgba(0, 0, 0, 0.7);
    height: 365px; /* Increased height by 15px */
    perspective: 1000px;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    position: relative;
    transform-style: preserve-3d;
  }
  
  .project-card:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #49c5b6;
    clip-path: polygon(
      0% 0%,      /* Top-left */
      95% 0%,     /* Top-right corner start */
      100% 5%,    /* Top-right corner end */
      100% 120%,  /* Bottom-right (Lowered) */
      5% 120%,    /* Bottom-left corner (Lowered) */
      0% 120%     /* Left edge bottom (Lowered) */
    );
    z-index: -1;
    transition: all 0.3s ease;
  }
  
  .project-card:hover {
    box-shadow: 0 0 15px rgba(73, 197, 182, 0.5);
  }
  
  .project-card:hover:before {
    box-shadow: 0 0 15px rgba(73, 197, 182, 0.5);
  }
  
  .card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .project-card.flipped .card-inner {
    transform: rotateY(180deg);
  }
  
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
  }
  
  .card-back {
    transform: rotateY(180deg);
  }
  
  .card-header {
    padding: 1rem;
    border-bottom: 1px solid rgba(73, 197, 182, 0.3);
  }
  
  .project-title {
    color: #ECD06F;
    font-size: 1.2rem;
    margin: 0;
    font-weight: 400;
    letter-spacing: 1px;
  }
  
  .card-content {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .project-image {
    width: 100%;
    height: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin-bottom: 1rem;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(73, 197, 182, 0.3);
  }
  
  .placeholder-svg {
    width: 100%;
    height: 100%;
  }

  .project-actual-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Cover the area, cropping if needed */
    object-position: center; /* Center the image */
  }

  .project-actual-image.svg-image {
     object-fit: contain; /* Contain for SVGs to prevent distortion */
     padding: 5px; /* Optional padding for SVGs */
  }
  
  .tech-tags, .tech-tags-full {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tech-tag {
    background-color: rgba(73, 197, 182, 0.2);
    border: 1px solid rgba(73, 197, 182, 0.3);
    color: #49c5b6;
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
  }
  
  .card-footer {
    padding: 1rem;
    border-top: 1px solid rgba(73, 197, 182, 0.3);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .project-description {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
  
  .tech-tags-full {
    margin-bottom: 1rem;
  }
  
  .project-links {
    display: flex;
    gap: 1rem;
  }
  
  .project-link {
    color: #ECD06F;
    text-decoration: none;
    position: relative;
    padding: 0.3rem 0.8rem;
    border: 1px solid rgba(236, 208, 111, 0.5);
    transition: all 0.2s ease;
  }
  
  .project-link:hover {
    background-color: rgba(236, 208, 111, 0.1);
    box-shadow: 0 0 10px rgba(236, 208, 111, 0.3);
  }
  
  .flip-instruction {
    color: rgba(73, 197, 182, 0.7);
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .icon {
    font-size: 1rem;
  }

  .front-links {
    margin-top: auto; /* Push to bottom of card-content */
    padding-top: 0.5rem; /* Add some space above */
    text-align: center; /* Center the link */
  }

  .front-link {
    display: inline-block; /* Allow centering */
    margin: 0 auto; /* Center horizontally */
    /* Inherits .project-link styles */
  }
  
  @media (max-width: 576px) {
    .project-card {
      height: 280px;
    }
    
    .project-image {
      height: 100px;
    }
  }
</style>
