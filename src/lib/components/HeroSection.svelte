<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { browser } from '$app/environment';
  import GlitchText from './GlitchText.svelte';
  import TypewriterText from './TypewriterText.svelte';
  import FloatingSkill from './FloatingSkill.svelte';
  import DataFlowLine from './DataFlowLine.svelte';
  import CyberPulse from './CyberPulse.svelte';

  export let title: string = "NETRUNNER PROFILE";
  export let subtitle: string = "Web Development | UI/UX Design | Creative Coding";
  export let description: string = "AUTHORIZED ACCESS ONLY: This terminal contains advanced development capabilities and creative coding skills. Proceed with caution.";

  let heroContainer: HTMLElement;
  let cyberCircuits: HTMLElement; // Keep for targeting the container if needed
  let ramValueElement: HTMLElement; // Element for RAM value
  let cpuValueElement: HTMLElement; // Element for CPU value
  let statusValueElement: HTMLElement; // Element for Status value
  let glitchTimeout: number | undefined = undefined;
  let mainTimeline: gsap.core.Timeline | null = null;
  let glitchTimelineInstance: gsap.core.Timeline | null = null;

  // Tech skills data
  const skills = [
    "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue",
    "Svelte", "Node.js", "Express", "MongoDB", "PostgreSQL",
    "GraphQL", "REST API", "AWS", "Docker", "Git", "CI/CD",
    "Python", "Django", "Flask", "UI/UX", "Figma", "WebGL",
    "Three.js", "GSAP", "Motion Design", "Responsive Design"
  ];

  // Prepare data for components (positions, delays, etc.)
  // Cyberpunk prefixes and suffixes for visual diversity
  const cyberpunkPrefixes = ['>', 'SYS:', '[v]', '//', 'NET:', '*', 'RAM:'];
  const cyberpunkSuffixes = ['<<', '.exe', '::', '_v2', '--', '+'];

  const skillData = skills.map((skill, index) => {
    let displaySkill = skill;
    if (index % 4 === 0) {
      const prefix = cyberpunkPrefixes[Math.floor(Math.random() * cyberpunkPrefixes.length)];
      displaySkill = `${prefix} ${skill}`;
    } else if (index % 5 === 0) {
      const suffix = cyberpunkSuffixes[Math.floor(Math.random() * cyberpunkSuffixes.length)];
      displaySkill = `${skill} ${suffix}`;
    }

    // Calculate position (same logic as before)
    const section = Math.floor(index / (skills.length / 4));
    let randomX: number, randomY: number;
    switch (section) {
      case 0: randomX = 10 + Math.random() * 35; randomY = 10 + Math.random() * 35; break;
      case 1: randomX = 55 + Math.random() * 35; randomY = 10 + Math.random() * 35; break;
      case 2: randomX = 10 + Math.random() * 35; randomY = 55 + Math.random() * 35; break;
      default: randomX = 55 + Math.random() * 35; randomY = 55 + Math.random() * 35; break; // case 3
    }

    return {
      id: skill, // Use skill as key for #each
      text: displaySkill,
      x: randomX,
      y: randomY,
      initialDelay: 1 + (index * 0.05), // Staggered reveal delay for skill
      lineDelay: 1.2 + (index * 0.03), // Staggered reveal delay for line
      glitch: index % 6 === 0, // Enable glitch for some skills
      pulseLine: index % 3 === 0 // Enable pulse for some lines
    };
  });

  // Data for pulse effects
  const pulseEffects = Array.from({ length: 8 }).map((_, i) => {
      const sector = i % 4;
      let randomX: number, randomY: number;
      switch (sector) {
          case 0: randomX = Math.random() * 40 + 10; randomY = Math.random() * 40 + 10; break;
          case 1: randomX = Math.random() * 40 + 50; randomY = Math.random() * 40 + 10; break;
          case 2: randomX = Math.random() * 40 + 10; randomY = Math.random() * 40 + 50; break;
          default: randomX = Math.random() * 40 + 50; randomY = Math.random() * 40 + 50; break; // case 3
      }
      let color = 'rgba(var(--color-teal-rgb), 0.6)'; // Default teal
      if (i % 3 === 0) color = 'rgba(var(--color-red-rgb), 0.6)';
      else if (i % 3 === 1) color = 'rgba(var(--color-gold-rgb), 0.6)';

      return {
          id: i,
          x: randomX,
          y: randomY,
          initialDelay: i * 0.3 + Math.random(),
          color: color
      };
  });


  // Function to schedule random glitch effects on the whole hero section
  function scheduleGlitchEffect() {
      if (!browser || !heroContainer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const delay = 5 + Math.random() * 15; // Random delay between 5-20 seconds

      glitchTimeout = window.setTimeout(() => {
      // Create a quick glitch sequence
      glitchTimelineInstance = gsap.timeline({
          onComplete: scheduleGlitchEffect // Schedule next glitch when done
      });

      glitchTimelineInstance
          .to(heroContainer, {
          filter: 'hue-rotate(90deg) brightness(1.2) contrast(1.2)',
          duration: 0.08,
          ease: "steps(1)"
          })
          .to(heroContainer, {
          filter: 'hue-rotate(-40deg) brightness(0.8) contrast(1.3)',
          duration: 0.08,
          ease: "steps(1)"
          })
          .to(heroContainer, {
          filter: 'hue-rotate(0deg) brightness(1) contrast(1)',
          duration: 0.08,
          ease: "steps(1)"
          });
      }, delay * 1000);
  }


  onMount(() => {
    // Skip animations if not in browser environment or reduced motion
    if (!browser || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Set up main animation timeline for title, description, etc.
    mainTimeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        // Start occasional glitch effect for the hero section after initial animation
        scheduleGlitchEffect();
      }
    });

    // Enhanced intro animation sequence
    mainTimeline
      .from('.title-section', {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      })
      .from('.description', {
        // Using clip-path for a reveal effect
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", // Start collapsed horizontally
        opacity: 0.5, // Start slightly faded
        duration: 0.8,
        ease: "power2.inOut",
        onStart: () => { // Ensure clip-path is set correctly at the start
             gsap.set('.description', { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
        },
        onComplete: () => { // Ensure it's fully revealed
             gsap.set('.description', { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
        }
      }, "-=0.3") // Overlap slightly
      .to('.description', { // Animate the clip-path to reveal
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.8,
          ease: "power2.inOut"
      }, "<") // Start at the same time as the previous opacity animation
      .from('.cyber-circuits', { // Animate the container itself
        opacity: 0,
        scale: 0.95,
        filter: "hue-rotate(90deg) brightness(0.7)",
        duration: 1.2,
        ease: "back.out(1.2)"
      }, '-=0.5') // Overlap
      .from('.system-stats .stat', { // Stagger in stats
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7
      }, "-=0.8") // Overlap significantly
      // Add counter animations for stats (start slightly after stats appear)
      .from(ramValueElement, {
        textContent: "0/0", // Start value (or random)
        duration: 0.8,
        ease: "power1.inOut",
        snap: { textContent: 1 } // Snap to whole numbers if counting
        // Note: Snapping might not work well with "16/16". Consider animating numbers separately if needed.
        // For simplicity, we'll just tween the text directly here. A more complex counter is possible.
      }, "-=0.5")
       .from(cpuValueElement, {
        textContent: "0%",
        duration: 1.0,
        ease: "power1.inOut",
        snap: { textContent: 1 }
      }, "<") // Start at same time as RAM
      .from(statusValueElement, {
        textContent: "---",
        duration: 0.5,
        ease: "steps(3)" // Cycle through a few states quickly
      }, "<0.2"); // Start slightly after CPU

    // Scan effects are now added directly in the HTML markup

  });

  onDestroy(() => {
      mainTimeline?.kill();
      glitchTimelineInstance?.kill();
      if (glitchTimeout) clearTimeout(glitchTimeout);
  });

</script>

<div class="hero-section" bind:this={heroContainer}>
  <!-- Cyberpunk 2077 style UI elements -->
  <div class="scan-line"></div>
  <div class="scan-interference"></div>
  <div class="noise-overlay"></div>
  
  <div class="hero-content">
    <div class="title-section">
      <GlitchText text={title} class_name="hero-title" />
      <div class="subtitle">{subtitle}</div>
      <div class="description">
        <TypewriterText text={description} speed={30} />
      </div>

      <!-- Slot for adding content after description, like the 'Enter Cyberdeck' button -->
      <div class="after-description">
        <slot name="after-description"></slot>
      </div>
    </div>

    <div class="cyber-grid">
      <!-- Dynamic cyberpunk visualization -->
      <div class="cyber-circuits" bind:this={cyberCircuits}>
        <!-- Render Floating Skills -->
        {#each skillData as skill (skill.id)}
          <FloatingSkill
            text={skill.text}
            x={skill.x}
            y={skill.y}
            initialDelay={skill.initialDelay}
            glitch={skill.glitch}
          />
        {/each}

        <!-- Render Data Flow Lines -->
        {#each skillData as skill (skill.id)}
          <DataFlowLine
            endX={skill.x}
            endY={skill.y}
            initialDelay={skill.lineDelay}
            pulse={skill.pulseLine}
          />
        {/each}

         <!-- Render Cyber Pulses -->
        {#each pulseEffects as pulse (pulse.id)}
            <CyberPulse
                x={pulse.x}
                y={pulse.y}
                initialDelay={pulse.initialDelay}
                color={pulse.color}
            />
        {/each}

        <!-- Core element -->
        <div class="cyber-core">
          <div class="core-inner"></div>
          <div class="core-ring"></div>
        </div>

        <!-- Grid lines -->
        <div class="grid-horizontal"></div>
        <div class="grid-vertical"></div>
        <div class="grid-diagonal-1"></div>
        <div class="grid-diagonal-2"></div>
      </div>
    </div>

    <!-- System stats -->
    <div class="system-stats">
      <div class="stat">
        <div class="stat-label">RAM</div>
        <div class="stat-value" bind:this={ramValueElement}>16/16</div>
      </div>
      <div class="stat">
        <div class="stat-label">CPU</div>
        <div class="stat-value" bind:this={cpuValueElement}>98%</div>
      </div>
      <div class="stat">
        <div class="stat-label">STATUS</div>
        <div class="stat-value text-active" bind:this={statusValueElement}>ACTIVE</div>
      </div>
    </div>
  </div>
</div>

<style>
  /* Keep existing HeroSection styles, but remove :global rules for components */
  .hero-section {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.92); /* Darker background - more authentic to Cyberpunk 2077 */
    overflow: hidden;
    padding: 2rem;
    
    /* Performance optimizations */
    will-change: filter, transform; /* Performance hint for animations */
    transform: translateZ(0); /* Force GPU acceleration */
    
    /* Base filter for cyberpunk aesthetics */
    filter: hue-rotate(0deg) brightness(1) contrast(1);
    
    /* Authentic Cyberpunk 2077 glitch animation - only runs occasionally */
    animation: heroGlitch 20s ease-in-out infinite;
    
    /* Improved accessibility */
    color-scheme: dark; /* Inform browsers this is a dark theme */
  }
  
  /* Cyberpunk UI glitch effect */
  @keyframes heroGlitch {
    0%, 100% {
      filter: none;
    }
    92% {
      filter: none;
    }
    92.5% {
      filter: brightness(1.1) contrast(1.3) hue-rotate(-5deg);
      transform: translate(-0.5px, 0);
    }
    93% {
      filter: brightness(0.9) contrast(1.2) hue-rotate(5deg);
      transform: translate(0.5px, 0);
    }
    93.5% {
      filter: none;
      transform: none;
    }
    94.5% {
      filter: brightness(1.2) contrast(0.9);
      transform: translate(-1px, 0.5px);
    }
    95% {
      filter: none;
      transform: none;
    }
    95.5% {
      filter: brightness(0.8) contrast(1.3);
      transform: translate(1px, -0.5px);
    }
    96% {
      filter: none;
      transform: none;
    }
  }

  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Authentic Cyberpunk 2077 style background with layered gradients
       Based on the game's UI design language and color scheme */
    background:
      /* Deep base gradient - authentic dark Cyberpunk base */
      linear-gradient(
        165deg,
        rgba(3, 6, 15, 0.97) 0%,
        rgba(9, 14, 24, 0.95) 50%,
        rgba(16, 24, 38, 0.93) 100%
      ),
      
      /* Cyberpunk red accent gradient - simulates the game's characteristic red accent */
      radial-gradient(
        circle at 85% 15%,
        rgba(var(--color-red-rgb), 0.18) 0%,
        rgba(var(--color-red-rgb), 0.09) 30%,
        transparent 70%
      ),
      
      /* Cyberpunk teal scanner gradient - authentic to the game's scanning interface */
      radial-gradient(
        circle at 20% 40%,
        rgba(var(--color-teal-rgb), 0.22) 0%,
        rgba(var(--color-teal-rgb), 0.11) 40%,
        transparent 70%
      ),
      
      /* Secondary gold accent - for depth and color diversity */
      radial-gradient(
        ellipse at 50% 90%,
        rgba(var(--color-gold-rgb), 0.16) 0%,
        rgba(var(--color-gold-rgb), 0.08) 30%,
        transparent 60%
      ),
      
      /* Authentic digital distortion pattern - mimics the game's digital/glitch aesthetic */
      repeating-linear-gradient(
        -45deg,
        transparent 0%,
        transparent 99.5%,
        rgba(var(--color-teal-rgb), 0.1) 99.5%,
        rgba(var(--color-teal-rgb), 0.1) 100%
      );
    z-index: 0;
    opacity: 1;
    /* Blend modes authentic to Cyberpunk 2077 UI - creating depth and integrating layers */
    background-blend-mode: normal, overlay, screen, color-dodge, multiply;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  :global(.hero-title) { /* Keep global if GlitchText needs it */
    font-size: 3rem;
    font-weight: bold;
    font-family: 'Rajdhani', 'Chakra Petch', sans-serif; /* Cyberpunk style font */
    letter-spacing: 0.05em;
    color: var(--color-teal);
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(var(--color-teal-rgb), 0.8);
    line-height: 1.1;
  }

  .subtitle {
    font-size: 1.2rem;
    color: var(--color-gold);
    font-family: 'Rajdhani', 'Chakra Petch', sans-serif;
    font-weight: 500;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
    text-shadow: 0 0 5px rgba(var(--color-gold-rgb), 0.6);
    text-transform: uppercase;
  }

  .description {
    position: relative; /* Need this for pseudo elements */
    max-width: 800px;
    background-color: rgba(15, 20, 30, 0.8); /* Darker background */
    color: var(--color-light);
    padding: 1.5rem;
    margin: 1rem auto; /* Centered horizontally */
    border: 1px solid rgba(var(--color-teal-rgb), 0.5);
    border-radius: 2px; /* Very slight radius */
    box-shadow: 0 0 30px rgba(var(--color-teal-rgb), 0.3), inset 0 0 10px rgba(var(--color-teal-rgb), 0.1);
    font-family: 'Rajdhani', 'Chakra Petch', monospace;
    letter-spacing: 0.05em;
    line-height: 1.5;
    
    /* Cyberpunk-style scan effect - more authentic */
    backdrop-filter: blur(1px) brightness(1.1); /* Subtle effect */
    
    /* Animation for subtle breathing effect - authentic to Cyberpunk scan interfaces */
    animation: descriptionPulse 8s ease-in-out infinite;
  }

  /* Corner elements - styled more like authentic Cyberpunk 2077 UI with larger, more angular corners */
  .description::before,
  .description::after {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    border-width: 2px; /* Thicker border */
    z-index: 1;
  }

  .description::before {
    top: -1px;
    left: -1px;
    border-top: 2px solid var(--color-teal);
    border-left: 2px solid var(--color-teal);
    animation: cornerGlow 5s ease-in-out infinite alternate;
  }

  .description::after {
    bottom: -1px;
    right: -1px;
    border-bottom: 2px solid var(--color-teal);
    border-right: 2px solid var(--color-teal);
    animation: cornerGlow 5s ease-in-out infinite alternate-reverse;
    box-shadow: 0 0 5px rgba(var(--color-teal-rgb), 0.5);
  }
  
  /* Subtle animations for description */
  @keyframes descriptionPulse {
    0%, 100% { box-shadow: 0 0 10px rgba(var(--color-teal-rgb), 0.1), inset 0 0 8px rgba(var(--color-teal-rgb), 0.05); }
    50% { box-shadow: 0 0 15px rgba(var(--color-teal-rgb), 0.2), inset 0 0 12px rgba(var(--color-teal-rgb), 0.1); }
  }
  
  @keyframes cornerGlow {
    0%, 100% { opacity: 0.9; filter: drop-shadow(0 0 2px rgba(var(--color-teal-rgb), 0.7)); }
    50% { opacity: 1; filter: drop-shadow(0 0 3px rgba(var(--color-teal-rgb), 0.9)); }
  }

  .after-description {
    margin-top: 1.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .cyber-grid {
    position: relative;
    width: 100%;
    height: 500px; /* Adjust as needed */
    margin-top: 2rem;
    overflow: hidden; /* Contain elements */
  }

  .cyber-circuits {
    position: relative; /* Changed to relative for positioning children */
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid var(--color-teal);
    box-shadow: 0 0 30px rgba(var(--color-teal-rgb), 0.3);
    overflow: hidden;
    animation: circuitGlow 5s ease-in-out infinite alternate;
    /* Removed position: relative here as it's already on .cyber-grid */
  }

  .cyber-circuits::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(circle at 30% 20%, rgba(var(--color-teal-rgb), 0.15) 0%, transparent 50%),
      radial-gradient(circle at 70% 60%, rgba(var(--color-red-rgb), 0.15) 0%, transparent 40%);
    filter: blur(20px);
    animation: glowShift 8s ease-in-out infinite alternate;
    z-index: 0;
  }

  @keyframes circuitGlow {
    0% { box-shadow: 0 0 20px rgba(var(--color-teal-rgb), 0.3), inset 0 0 15px rgba(var(--color-teal-rgb), 0.1); }
    50% { box-shadow: 0 0 25px rgba(var(--color-red-rgb), 0.2), inset 0 0 20px rgba(var(--color-red-rgb), 0.1); }
    100% { box-shadow: 0 0 30px rgba(var(--color-gold-rgb), 0.3), inset 0 0 25px rgba(var(--color-gold-rgb), 0.1); }
  }

  @keyframes glowShift {
    0% { opacity: 0.7; background-position: 0% 0%; }
    50% { opacity: 0.9; background-position: 10% 20%; }
    100% { opacity: 0.8; background-position: 20% 10%; }
  }

  .cyber-core {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .core-inner {
    width: 40px; height: 40px;
    background: radial-gradient(circle, var(--color-red) 0%, rgba(var(--color-red-rgb), 0.2) 70%);
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(var(--color-red-rgb), 0.8);
    animation: pulse 2s infinite;
  }

  .core-ring {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 80px; height: 80px;
    border: 2px solid var(--color-teal);
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(var(--color-teal-rgb), 0.5);
    animation: rotating 12s ease-in-out infinite; /* Changed timing and duration */
  }

  /* Grid background lines */
  .grid-horizontal, .grid-vertical, .grid-diagonal-1, .grid-diagonal-2 {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 1;
    pointer-events: none;
  }
  .grid-horizontal {
    background-image: repeating-linear-gradient(to bottom, rgba(var(--color-teal-rgb), 0.1) 0px, rgba(var(--color-teal-rgb), 0.1) 1px, transparent 1px, transparent 50px);
    animation: gridSlideVertical 30s linear infinite;
  }
  .grid-vertical {
    background-image: repeating-linear-gradient(to right, rgba(var(--color-teal-rgb), 0.1) 0px, rgba(var(--color-teal-rgb), 0.1) 1px, transparent 1px, transparent 50px);
    animation: gridSlideHorizontal 30s linear infinite;
  }
  .grid-diagonal-1 {
    background-image: repeating-linear-gradient(45deg, rgba(var(--color-red-rgb), 0.05) 0px, rgba(var(--color-red-rgb), 0.05) 1px, transparent 1px, transparent 100px);
    animation: gridSlidePositive 60s linear infinite;
  }
  .grid-diagonal-2 {
    background-image: repeating-linear-gradient(-45deg, rgba(var(--color-red-rgb), 0.05) 0px, rgba(var(--color-red-rgb), 0.05) 1px, transparent 1px, transparent 100px);
    animation: gridSlideNegative 60s linear infinite;
  }

  @keyframes gridSlideVertical { 0% { background-position: 0 0; } 100% { background-position: 0 50px; } }
  @keyframes gridSlideHorizontal { 0% { background-position: 0 0; } 100% { background-position: 50px 0; } }
  @keyframes gridSlidePositive { 0% { background-position: 0 0; } 100% { background-position: 100px 100px; } }
  @keyframes gridSlideNegative { 0% { background-position: 0 0; } 100% { background-position: 100px -100px; } }

  /* System stats - styled like Cyberpunk 2077 status displays */
  .system-stats {
    position: absolute; /* Position relative to hero-content */
    bottom: 1rem; /* Adjust positioning */
    right: 1rem;
    display: flex;
    gap: 0.8rem;
    z-index: 5; /* Ensure stats are above grid/background */
    
    /* Authentic Cyberpunk 2077 container style */
    padding: 0.3rem;
    background-color: rgba(5, 10, 15, 0.5);
    border: 1px solid rgba(var(--color-teal-rgb), 0.2);
    border-radius: 2px;
    box-shadow: 0 0 8px rgba(var(--color-teal-rgb), 0.1);
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.3rem 0.5rem; /* Slightly reduced padding for more compact look */
    
    /* Authentic Cyberpunk 2077 stat panel style */
    background-color: rgba(10, 15, 25, 0.7); /* Darker, more authentic background */
    border: 1px solid rgba(var(--color-teal-rgb), 0.3); /* Slightly more visible border */
    position: relative;
    
    /* Corner decorations for tech look */
    clip-path: polygon(
      0% 0%, 
      calc(100% - 8px) 0%, 
      100% 8px, 
      100% 100%, 
      8px 100%, 
      0% calc(100% - 8px)
    );
    
    /* Authentic Cyberpunk UI animation - subtle pulse effect */
    animation: statPanelPulse 4s ease-in-out infinite; /* Slower, subtler animation */
    
    /* Better performance */
    will-change: box-shadow, transform;
    transform: translateZ(0); /* Force GPU acceleration */
  }
  
  /* Tech line accent - authentic to Cyberpunk 2077 UI panels */
  .stat::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to right,
      rgba(var(--color-teal-rgb), 0.1),
      rgba(var(--color-teal-rgb), 0.5),
      rgba(var(--color-teal-rgb), 0.1)
    );
  }
  
  .stat-label {
    font-size: 0.65rem; /* Slightly smaller */
    font-weight: 600; /* Semi-bold for better visibility */
    text-transform: uppercase; /* Consistent with Cyberpunk 2077 UI style */
    letter-spacing: 0.05em; /* Wider letter spacing for tech look */
    margin-bottom: 0.2rem;
    
    /* Authentic color scheme with animation */
    color: var(--color-gold); /* Use gold color for labels - authentic to CP2077 */
    text-shadow: 0 0 3px rgba(var(--color-gold-rgb), 0.5); /* Subtle glow */
  }
  
  .stat-value { 
    font-size: 0.85rem; 
    font-family: 'Rajdhani', 'Chakra Petch', monospace; /* More cyberpunk font */
    font-weight: 500;
    color: var(--color-teal); /* Use teal for values */
    text-shadow: 0 0 4px rgba(var(--color-teal-rgb), 0.7); /* Stronger glow for values */
  }
  
  .text-active { 
    color: var(--color-teal); 
    position: relative;
    
    /* More authentic blinking animation - resembles Cyberpunk 2077 status indicators */
    animation: activeTextBlink 2.5s infinite; 
  }
  
  /* Cyberpunk 2077 style text blink for "ACTIVE" status */
  @keyframes activeTextBlink {
    0%, 100% { opacity: 1; text-shadow: 0 0 4px rgba(var(--color-teal-rgb), 0.7); }
    40% { opacity: 1; text-shadow: 0 0 4px rgba(var(--color-teal-rgb), 0.7); }
    50% { opacity: 0.7; text-shadow: 0 0 2px rgba(var(--color-teal-rgb), 0.4); }
    60% { opacity: 1; text-shadow: 0 0 4px rgba(var(--color-teal-rgb), 0.7); }
  }
  
  /* Authentic panel glow animation */
  @keyframes statPanelPulse {
    0%, 100% { 
      box-shadow: 0 0 5px rgba(var(--color-teal-rgb), 0.2);
      transform: scale(1); 
    }
    50% { 
      box-shadow: 0 0 8px rgba(var(--color-teal-rgb), 0.3); 
      transform: scale(1.02);
    }
  }

  /* Scan line and cyberpunk effects */
  .scan-line {
    position: absolute; top: 0; left: 0; width: 100%; height: 3px;
    background: linear-gradient(to right, rgba(var(--color-teal-rgb), 0) 0%, rgba(var(--color-teal-rgb), 0.5) 50%, rgba(var(--color-teal-rgb), 0) 100%);
    z-index: 10; pointer-events: none; animation: scanAnimation 4s linear infinite;
    opacity: 0.7; filter: drop-shadow(0 0 2px rgba(var(--color-teal-rgb), 0.8));
  }
  
  .scan-interference {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(to bottom, transparent 0%, rgba(var(--color-teal-rgb), 0.02) 50%, transparent 100%);
    z-index: 9; pointer-events: none; animation: interferenceAnimation 4s ease-in-out infinite;
    opacity: 0.3;
  }
  
  /* Cyberpunk 2077 style noise overlay */
  .noise-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.07;
    z-index: 8;
    pointer-events: none;
    mix-blend-mode: overlay;
    animation: noiseAnimation 0.5s steps(1) infinite;
  }
  
  @keyframes noiseAnimation {
    0% { transform: translate(0, 0); }
    10% { transform: translate(-1px, 1px); }
    20% { transform: translate(1px, -1px); }
    30% { transform: translate(-1px, -1px); }
    40% { transform: translate(1px, 1px); }
    50% { transform: translate(-1px, 0); }
    60% { transform: translate(1px, 0); }
    70% { transform: translate(0, 1px); }
    80% { transform: translate(0, -1px); }
    90% { transform: translate(1px, -1px); }
    100% { transform: translate(0, 0); }
  }

  @keyframes scanAnimation {
    0% { top: 0; opacity: 0.7; } 25% { opacity: 0.9; } 50% { opacity: 0.7; }
    75% { opacity: 0.9; } 100% { top: 100%; opacity: 0.7; }
  }
  @keyframes interferenceAnimation {
    0% { background-position: 0 -100%; opacity: 0.2; } 50% { background-position: 0 100%; opacity: 0.3; }
    100% { background-position: 0 300%; opacity: 0.2; }
  }

  /* Animations */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 20px rgba(var(--color-red-rgb), 0.8); /* Base shadow */
    }
    50% {
      opacity: 0.7;
      transform: scale(0.95);
      box-shadow: 0 0 30px rgba(var(--color-red-rgb), 1); /* Brighter shadow */
    }
  }
  @keyframes rotating { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 3px rgba(var(--color-teal-rgb), 0.2); }
    50% { box-shadow: 0 0 7px rgba(var(--color-teal-rgb), 0.4); }
  }

  @keyframes cycleStatColor {
    0%, 100% { color: var(--color-red); } /* Start/End Red */
    33% { color: var(--color-teal); }     /* Mid Teal */
    66% { color: var(--color-gold); }     /* Mid Gold */
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    :global(.hero-title) { font-size: 2rem; }
    .subtitle { font-size: 1rem; }
    .cyber-grid { height: 300px; }
    .system-stats { position: relative; right: auto; bottom: auto; margin-top: 1rem; justify-content: center; }
  }
</style>