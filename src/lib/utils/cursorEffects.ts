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
      // Add CSS styles for trail elements
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .cursor-trail {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
          box-shadow: 0 0 8px currentColor;
          transition: all 0.1s ease;
        }
        
        .cursor-trail.primary {
          filter: blur(1px);
        }
        
        .cursor-trail.secondary {
          filter: blur(0.5px);
        }
      `;
      document.head.appendChild(styleElement);
      
      // Create main cursor point
      const mainCursor = document.createElement('div');
      mainCursor.className = 'cursor-trail cursor-main';
      mainCursor.style.width = '12px';
      mainCursor.style.height = '12px';
      mainCursor.style.backgroundColor = colors[0];
      mainCursor.style.boxShadow = `0 0 15px ${colors[0]}, 0 0 5px ${colors[0]}`;
      mainCursor.style.zIndex = '1000';
      trailContainer.appendChild(mainCursor);
      trailElements.push(mainCursor);
      
      // Create trail elements with varying sizes and colors
      for (let i = 0; i < count; i++) {
        const trailElement = document.createElement('div');
        const isPrimary = i % 2 === 0;
        
        trailElement.className = `cursor-trail ${isPrimary ? 'primary' : 'secondary'}`;
        
        // Vary the size based on position in trail
        const size = isPrimary ? 5 - (i * 0.15) : 4 - (i * 0.1);
        trailElement.style.width = `${Math.max(size, 2)}px`;
        trailElement.style.height = `${Math.max(size, 2)}px`;
        
        // Alternate colors and adjust opacity
        const color = isPrimary ? colors[0] : colors[1];
        trailElement.style.backgroundColor = color;
        trailElement.style.opacity = `${1 - (i * 0.05)}`;
        
        // Add to container and array
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
    
    // Update main cursor immediately
    if (trailElements[0]) {
      trailElements[0].style.left = `${mousePosition.x}px`;
      trailElements[0].style.top = `${mousePosition.y}px`;
    }
    
    // Update each trail element with a delay and slight randomization
    for (let i = 1; i < trailElements.length; i++) {
      setTimeout(() => {
        if (trailElements[i]) {
          // Add subtle randomization to trail positions for a more dynamic effect
          const jitter = i > 5 ? (Math.random() - 0.5) * (i * 0.3) : 0;
          const jitterY = i > 8 ? (Math.random() - 0.5) * (i * 0.2) : 0;
          
          trailElements[i].style.left = `${mousePosition.x + jitter}px`;
          trailElements[i].style.top = `${mousePosition.y + jitterY}px`;
          
          // Occasionally add a glitch effect to some elements
          if (i > 5 && Math.random() > 0.92) {
            const glitchX = (Math.random() - 0.5) * 15;
            trailElements[i].style.transform = `translate(-50%, -50%) translateX(${glitchX}px)`;
            
            // Reset after a short delay
            setTimeout(() => {
              if (trailElements[i]) {
                trailElements[i].style.transform = 'translate(-50%, -50%)';
              }
            }, 100);
          }
        }
      }, i * 30); // Faster follow speed
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
