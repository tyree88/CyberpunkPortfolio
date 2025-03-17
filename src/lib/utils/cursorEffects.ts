import { browser } from '$app/environment';

interface MousePosition {
  x: number;
  y: number;
}

interface CursorTrailOptions {
  count?: number;
  colors?: string[];
  container?: HTMLElement | null;
}

/**
 * Creates and manages a cyberpunk-style cursor trail effect
 */
export function createCursorTrail(options: CursorTrailOptions = {}) {
  if (!browser) return { cleanup: () => {} };
  
  const {
    count = 15,
    colors = ['#49c5b6', '#ECD06F'],
    container = null
  } = options;
  
  let trailContainer: HTMLElement | null = container;
  let trailElements: HTMLElement[] = [];
  let mousePosition: MousePosition = { x: 0, y: 0 };
  let animationFrameId: number | null = null;
  
  // Create cursor trail elements
  function createTrailElements() {
    if (!browser) return;
    
    // Create container if it doesn't exist
    if (!trailContainer) {
      trailContainer = document.createElement('div');
      trailContainer.className = 'cursor-trail-container';
      document.body.appendChild(trailContainer);
    } else {
      // Clear any existing trail elements
      trailContainer.innerHTML = '';
      trailElements = [];
    }
    
    // Create new trail elements
    if (trailContainer) {
      for (let i = 0; i < count; i++) {
        const trailElement = document.createElement('div');
        trailElement.className = 'cursor-trail';
        trailElement.style.width = `${3 + (i * 0.1)}px`;
        trailElement.style.height = `${3 + (i * 0.1)}px`;
        trailElement.style.opacity = `${1 - (i * 0.06)}`;
        trailElement.style.backgroundColor = i % 2 === 0 ? colors[0] : colors[1];
        
        trailContainer.appendChild(trailElement);
        trailElements.push(trailElement);
      }
    }
  }
  
  // Update cursor trail positions
  function updateTrailPositions(e: MouseEvent) {
    if (!browser || !trailElements.length) return;
    
    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
  }
  
  // Animate the trail
  function animateTrail() {
    if (!browser || !trailElements.length) return;
    
    // Update each trail element with a delay
    for (let i = 0; i < trailElements.length; i++) {
      setTimeout(() => {
        if (trailElements[i]) {
          trailElements[i].style.left = `${mousePosition.x}px`;
          trailElements[i].style.top = `${mousePosition.y}px`;
        }
      }, i * 40);
    }
    
    // Continue animation loop
    animationFrameId = requestAnimationFrame(animateTrail);
  }
  
  // Initialize the trail
  function init() {
    if (!browser) return;
    
    createTrailElements();
    window.addEventListener('mousemove', updateTrailPositions);
    animateTrail();
  }
  
  // Cleanup function to remove event listeners and elements
  function cleanup() {
    if (!browser) return;
    
    window.removeEventListener('mousemove', updateTrailPositions);
    
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
    
    if (trailContainer && trailContainer.parentNode) {
      trailContainer.parentNode.removeChild(trailContainer);
    }
    
    trailContainer = null;
    trailElements = [];
  }
  
  // Initialize on creation
  init();
  
  // Return cleanup function for component unmount
  return { cleanup };
}
