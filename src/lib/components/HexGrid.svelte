<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  export let density: number = 10; // Number of hexagons
  export let color: string = 'var(--color-teal)';
  export let backgroundColor: string = 'transparent';
  export let fadeEdges: boolean = true;
  export let pulseIntensity: number = 0.5; // 0 to 1, affects glow intensity
  export let animationSpeed: number = 1; // Multiplier for animation speed
  export let interactive: boolean = false; // If true, hexagons react to mouse movement
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let width: number = 0;
  let height: number = 0;
  let hexagons: Hexagon[] = [];
  let animationFrameId: number;
  let mouse = { x: 0, y: 0 };
  let preferReducedMotion = false;
  
  // Represents a single hexagon in the grid
  type Hexagon = {
    x: number;
    y: number;
    size: number;
    rotation: number;
    speed: number;
    opacity: number;
    pulsePhase: number;
    pulseSpeed: number;
  };
  
  // Draw a hexagon at the given position with size and rotation
  function drawHexagon(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    rotation: number = 0,
    opacity: number = 1
  ) {
    const sides = 6;
    const angleIncrement = (Math.PI * 2) / sides;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    
    for (let i = 0; i < sides; i++) {
      const angle = i * angleIncrement;
      const pointX = size * Math.cos(angle);
      const pointY = size * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }
    
    ctx.closePath();
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }
  
  // Initialize the hex grid
  function initHexGrid() {
    if (!ctx) return;
    
    hexagons = [];
    const hexSize = Math.max(width, height) / (density * 0.6);
    const numHexagons = density * (width / height);
    
    for (let i = 0; i < numHexagons; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = hexSize * (0.3 + Math.random() * 0.7);
      const rotation = Math.random() * Math.PI * 2;
      const speed = (0.2 + Math.random() * 0.8) * 0.001 * animationSpeed;
      const opacity = (fadeEdges)
        ? calculateEdgeOpacity(x, y)
        : 0.1 + Math.random() * 0.3;
      
      hexagons.push({
        x,
        y,
        size,
        rotation,
        speed,
        opacity,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.002 + Math.random() * 0.003
      });
    }
  }
  
  // Calculate opacity based on distance from center for edge fading
  function calculateEdgeOpacity(x: number, y: number): number {
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Calculate distance from center as percentage of max possible distance
    const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
    const dist = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    const distRatio = dist / maxDist;
    
    // Fade out towards edges
    return 0.1 + (1 - distRatio) * 0.3;
  }
  
  // Handle mouse movement if interactive
  function handleMouseMove(event: MouseEvent) {
    if (!interactive) return;
    
    const rect = canvas.getBoundingClientRect();
    mouse.x = event.clientX - rect.left;
    mouse.y = event.clientY - rect.top;
  }
  
  // Animation loop
  function animateFrame() {
    if (!browser || preferReducedMotion) return;
    
    draw();
    animationFrameId = requestAnimationFrame(animateFrame);
  }
  
  // Draw the entire grid
  function draw() {
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background if specified
    if (backgroundColor !== 'transparent') {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }
    
    // Draw each hexagon
    hexagons.forEach(hex => {
      // Update rotation
      hex.rotation += hex.speed;
      
      // Calculate pulse effect on opacity
      let finalOpacity = hex.opacity;
      if (pulseIntensity > 0) {
        // Update pulse phase
        hex.pulsePhase += hex.pulseSpeed;
        // Apply sinusoidal pulse to opacity
        const pulseFactor = (Math.sin(hex.pulsePhase) + 1) / 2; // 0 to 1
        finalOpacity = hex.opacity * (1 - pulseIntensity * 0.5 + pulseFactor * pulseIntensity);
      }
      
      // Apply interactive effect if enabled
      if (interactive) {
        const dx = hex.x - mouse.x;
        const dy = hex.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        
        if (dist < maxDist) {
          const proximity = 1 - dist / maxDist;
          finalOpacity += proximity * 0.4;
        }
      }
      
      // Draw hexagon with calculated values
      drawHexagon(ctx, hex.x, hex.y, hex.size, hex.rotation, finalOpacity);
    });
  }
  
  function handleResize() {
    if (!canvas || !ctx) return;
    
    // Get parent dimensions for full coverage
    const parent = canvas.parentElement;
    if (parent) {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Reinitialize with new dimensions
      initHexGrid();
    }
  }
  
  onMount(() => {
    if (!browser) return;
    
    // Check for reduced motion preference
    preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up canvas
    handleResize();
    
    // Start animation loop if not reduced motion
    if (!preferReducedMotion) {
      animateFrame();
    } else {
      // Just draw once for reduced motion
      draw();
    }
    
    // Set up resize handler
    window.addEventListener('resize', handleResize);
    
    // Set up mouse move handler if interactive
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }
  });
  
  onDestroy(() => {
    if (browser) {
      // Clean up animation and event listeners
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      
      if (interactive && canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
    }
  });
</script>

<canvas 
  bind:this={canvas} 
  class="hex-grid"
  role="img" 
  aria-label="Cyberpunk hexagon grid background"
></canvas>

<style>
  .hex-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
</style>