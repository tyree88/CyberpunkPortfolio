<script lang="ts">
  import { onMount, tick } from 'svelte';
  import type { Skill } from '$lib/types/skills';
  import SkillNode from '$lib/components/SkillNode.svelte'; // Use $lib alias
  import { gsap } from 'gsap';

  /**
   * CyberSkillVisualization.svelte
   * Displays skills as nodes orbiting a central core with connecting lines.
   */

  export let skills: Skill[] = [];
  export let radius: number = 200; // Radius of the skill orbit
  export let coreSize: number = 80; // Diameter of the central core
  export let lineColor: string = '#49c5b6'; // Cyberpunk Teal for lines
  export let lineOpacity: number = 0.6;
  export let lineStrokeWidth: number = 1.5;

  let container: HTMLElement;
  let svgElement: SVGElement;
  let nodeElements: HTMLElement[] = []; // To get node dimensions if needed
  let nodePositions: { top: number; left: number; cx: number; cy: number }[] = [];
  let coreCenter: { x: number; y: number } = { x: 0, y: 0 };
  let containerRect: DOMRect | null = null;

  // Colors
  const teal = '#49c5b6';
  const gold = '#ECD06F';

  $: coreStyle = `
    width: ${coreSize}px;
    height: ${coreSize}px;
    --core-color: ${teal};
    --core-shadow: ${teal}80;
  `;

  // Recalculate positions and core center when skills, radius, or container size changes
  async function calculateLayout() {
    if (!container || skills.length === 0) {
      nodePositions = [];
      coreCenter = { x: 0, y: 0 };
      return;
    }

    await tick(); // Ensure container dimensions are updated

    containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    // Core center in pixels relative to the container
    coreCenter = { x: containerWidth / 2, y: containerHeight / 2 };

    nodePositions = skills.map((_, index) => {
      const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2; // Start from top (-PI/2)

      // Calculate node center position in pixels relative to container center
      const nodeCenterXOffset = radius * Math.cos(angle);
      const nodeCenterYOffset = radius * Math.sin(angle);

      // Absolute pixel coordinates within the container
      const nodePixelX = coreCenter.x + nodeCenterXOffset;
      const nodePixelY = coreCenter.y + nodeCenterYOffset;

      // Convert absolute pixel coordinates to percentage for positioning the wrapper div
      // Note: This assumes the wrapper's transform: translate(-50%, -50%) correctly centers it.
      const leftPercent = (nodePixelX / containerWidth) * 100;
      const topPercent = (nodePixelY / containerHeight) * 100;

      // Ensure positions stay within reasonable bounds (e.g., 5% to 95%) to avoid clipping
      const clampedLeft = Math.max(5, Math.min(95, leftPercent));
      const clampedTop = Math.max(5, Math.min(95, topPercent));

      return {
          top: clampedTop,
          left: clampedLeft,
          cx: nodePixelX, // Store pixel coords for SVG lines
          cy: nodePixelY
      };
    });

    // Trigger reactivity for SVG update
    nodePositions = [...nodePositions];
  }

  // Reactive calculation call
  $: if (container && skills.length > 0) {
      calculateLayout();
  }

  // Recalculate on resize
  let resizeObserver: ResizeObserver;
  let animationsInitialized = false;
  
  // Function to initialize animations when elements are ready
  function initializeAnimations() {
    // Check if elements exist before creating animations
    const nodeWrappers = document.querySelectorAll('.skill-node-wrapper');
    const centralCore = document.querySelector('.central-core');
    const connectingLines = document.querySelectorAll('.connecting-line');
    
    if (nodeWrappers.length > 0 && !animationsInitialized) {
      // Initial animation for nodes appearing
      gsap.from(nodeWrappers, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        delay: 0.5
      });

      // Subtle floating/breathing animation to nodes
      gsap.to(nodeWrappers, {
        y: '+=5',
        x: '+=3',
        rotation: '+=2',
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: 'sine.inOut',
        stagger: {
          each: 0.2,
          from: 'random'
        }
      });
      
      animationsInitialized = true;
    }
    
    if (centralCore) {
      // Core animation
      gsap.to(centralCore, {
        boxShadow: `0 0 15px 5px var(--core-shadow), inset 0 0 10px 2px var(--core-shadow)`,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'sine.inOut'
      });
    }
    
    if (connectingLines.length > 0) {
      // Line animation (simplified to avoid missing DrawSVGPlugin)
      gsap.from(connectingLines, {
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        delay: 0.8, // After nodes appear
        ease: 'power1.inOut'
      });
    }
  }
  
  onMount(() => {
    if (container) {
      resizeObserver = new ResizeObserver(() => {
        calculateLayout();
        
        // Try to initialize animations after layout calculation
        setTimeout(initializeAnimations, 300);
      });
      resizeObserver.observe(container);
      
      // Initial attempt to initialize animations
      setTimeout(initializeAnimations, 300);
    }

    return () => {
      if (resizeObserver && container) {
        resizeObserver.unobserve(container);
      }
    };
  });

</script>

<div class="skill-visualization-container" bind:this={container}>
  <!-- SVG Overlay for Lines -->
  <svg
    bind:this={svgElement}
    class="line-svg-overlay"
    width={containerRect?.width ?? '100%'}
    height={containerRect?.height ?? '100%'}
    xmlns="http://www.w3.org/2000/svg"
  >
    {#if coreCenter.x && coreCenter.y}
      {#each nodePositions as nodePos, i (skills[i].id)}
        <line
          class="connecting-line"
          x1={coreCenter.x}
          y1={coreCenter.y}
          x2={nodePos.cx}
          y2={nodePos.cy}
          stroke={lineColor}
          stroke-width={lineStrokeWidth}
          stroke-opacity={lineOpacity}
          marker-end="url(#arrowhead)"
        /> &lt;!-- Optional: Add arrowheads --&gt;
      {/each}
    {/if}

    <!-- Optional: Define marker for arrowheads -->
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill={lineColor} opacity={lineOpacity} />
      </marker>
    </defs>
  </svg>

  <!-- Central Core -->
  <div class="central-core" style={coreStyle}>
    CORE
  </div>

  <!-- Skill Nodes -->
  {#each skills as skill, i (skill.id)}
    {#if nodePositions[i]}
      <div
        bind:this={nodeElements[i]}
        class="skill-node-wrapper"
        style="top: {nodePositions[i].top}%; left: {nodePositions[i].left}%;"
      >
        <SkillNode {skill} />
      </div>
    {/if}
  {/each}
</div>

<style>
  .skill-visualization-container {
    position: relative;
    width: 100%;
    min-height: 500px;
    height: 60vh;
    display: flex; /* Keep flex for potential future alignment needs */
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: rgba(0, 10, 20, 0.3);
    border: 1px solid var(--core-color, #49c5b6);
  }

  .line-svg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Allow interaction with elements below */
    z-index: 1; /* Behind core and nodes */
  }

  .connecting-line {
    /* Add subtle animation like dashed lines moving */
    /* stroke-dasharray: 5, 5; */
    /* animation: dash-flow 1s linear infinite; */
    will-change: stroke-dashoffset; /* Optimize if using dash animation */
  }

  /* @keyframes dash-flow {
    to {
      stroke-dashoffset: -10;
    }
  } */

  .central-core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: rgba(10, 30, 50, 0.9);
    border: 2px solid var(--core-color, #49c5b6);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--core-color, #49c5b6);
    font-family: 'Orbitron', sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
    box-shadow: 0 0 10px 2px var(--core-shadow, #49c5b680), inset 0 0 5px 1px var(--core-shadow, #49c5b680);
    z-index: 5; /* Above SVG lines */
    transition: box-shadow 0.3s ease;
  }

  .skill-node-wrapper {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 10; /* Above core and lines */
    will-change: transform, opacity;
  }
</style>