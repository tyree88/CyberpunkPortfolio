<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { cursorPosition } from '$lib/stores/cursorStore';
  import { browser } from '$app/environment';

  let cursorContainer: HTMLElement;
  let crosshair: HTMLElement;
  let dots: HTMLElement[] = [];
  let trailActive = false;
  let mouseX = 0;
  let mouseY = 0;
  let rafId: number;

  const DOT_COUNT = 10;
  const positions: { x: number, y: number }[] = [];

  onMount(() => {
    // Skip initialization if not in browser environment
    if (!browser) return;
    
    // Initialize positions for all dots
    for (let i = 0; i < DOT_COUNT; i++) {
      positions.push({ x: 0, y: 0 });
    }

    // Get references to the pre-rendered dots
    dots = Array.from(cursorContainer.querySelectorAll('.cursor-dot'));

    // Set up event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation loop
    animateTrail();

    // Initialize crosshair position
    updateCrosshairPosition(0, 0);
    
    // Animate crosshair in
    gsap.from(crosshair, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 1
    });
  });

  onDestroy(() => {
    if (!browser) return;
    window.removeEventListener('mousemove', handleMouseMove);
    if (rafId) cancelAnimationFrame(rafId);
  });

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update the Svelte store with current position
    cursorPosition.set({ x: mouseX, y: mouseY });
    
    // Update crosshair position
    updateCrosshairPosition(mouseX, mouseY);
    
    if (!trailActive) {
      // Set all dots to current position to avoid long initial trails
      for (let i = 0; i < DOT_COUNT; i++) {
        positions[i] = { x: mouseX, y: mouseY };
      }
      trailActive = true;
    }
  }

  function updateCrosshairPosition(x: number, y: number) {
    if (crosshair) {
      crosshair.style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  function animateTrail() {
    // Update the first position to current mouse position
    if (trailActive) {
      positions[0] = { x: mouseX, y: mouseY };
      
      // Update subsequent positions to follow the previous one with a delay
      for (let i = 1; i < DOT_COUNT; i++) {
        const prevPos = positions[i - 1];
        const curPos = positions[i];
        
        // Interpolate between current and previous position
        positions[i] = {
          x: curPos.x + (prevPos.x - curPos.x) * 0.3,
          y: curPos.y + (prevPos.y - curPos.y) * 0.3
        };
        
        // Update dot position
        if (dots[i]) {
          dots[i].style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        }
      }
    }
    
    // Continue animation loop
    if (browser) {
      rafId = requestAnimationFrame(animateTrail);
    }
  }
</script>

<div class="cursor-container" bind:this={cursorContainer}>
  <div class="crosshair" bind:this={crosshair}>
    <div class="cross-vertical"></div>
    <div class="cross-horizontal"></div>
    <div class="target-circle"></div>
  </div>
  <!-- Pre-render dots with svelte instead of creating them in JS -->
  {#each Array(DOT_COUNT) as _, i}
    <div 
      class="cursor-dot" 
      style="opacity: {1 - (i / DOT_COUNT)}; 
             width: {4 - (i * 0.3)}px; 
             height: {4 - (i * 0.3)}px;"
    ></div>
  {/each}
</div>

<style>
  .cursor-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    user-select: none;
  }

  .cursor-dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 4px;
    background-color: #49c5b6;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    filter: drop-shadow(0 0 2px rgba(73, 197, 182, 0.8));
  }

  .crosshair {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cross-vertical, .cross-horizontal {
    position: absolute;
    background-color: rgba(73, 197, 182, 0.5);
  }

  .cross-vertical {
    width: 1px;
    height: 40px;
  }

  .cross-horizontal {
    width: 40px;
    height: 1px;
  }

  .target-circle {
    width: 15px;
    height: 15px;
    border: 1px solid #49c5b6;
    border-radius: 50%;
    opacity: 0.5;
  }

  /* Disable cursor on specific devices */
  @media (max-width: 768px) {
    .cursor-container {
      display: none;
    }
  }
</style>
