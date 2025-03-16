import { gsap } from 'gsap';

/**
 * Creates a glitch effect on the target element
 * @param target Element to apply glitch effect to
 * @param intensity How strong the glitch should be (0-1)
 * @param duration How long the glitch should last
 */
export function glitchEffect(target: HTMLElement, intensity: number = 0.5, duration: number = 0.4) {
  const timeline = gsap.timeline();
  
  // Number of glitch iterations based on intensity
  const iterations = 1 + Math.floor(intensity * 4);
  
  for (let i = 0; i < iterations; i++) {
    // Random offset values based on intensity
    const xOffset = (Math.random() - 0.5) * 10 * intensity;
    const yOffset = (Math.random() - 0.5) * 5 * intensity;
    const skewX = (Math.random() - 0.5) * 5 * intensity;
    
    // Random color shift
    const hasColorShift = Math.random() < intensity;
    const rgbSplit = hasColorShift ? {
      textShadow: `${xOffset}px 0 rgba(255,0,0,0.5), ${-xOffset}px 0 rgba(0,255,255,0.5), 0 0 3px`
    } : {};
    
    // Add to timeline - very short duration for glitch frames
    timeline.to(target, {
      x: xOffset,
      y: yOffset,
      skewX: skewX,
      opacity: 0.8 + Math.random() * 0.2,
      ...rgbSplit,
      duration: 0.08,
      ease: "power1.inOut"
    });
  }
  
  // Return to original state
  timeline.to(target, {
    x: 0,
    y: 0,
    skewX: 0,
    opacity: 1,
    textShadow: "none",
    duration: 0.1,
    ease: "power1.out"
  });
  
  return timeline;
}

/**
 * Creates a scanner effect that moves vertically across an element
 * @param target Element to apply scanner effect to
 */
export function scannerEffect(target: HTMLElement) {
  // Create and append scanner line element
  const scannerLine = document.createElement('div');
  scannerLine.className = 'scanner-line';
  target.style.position = 'relative';
  target.style.overflow = 'hidden';
  target.appendChild(scannerLine);
  
  // Set up scanner line styles
  scannerLine.style.position = 'absolute';
  scannerLine.style.left = '0';
  scannerLine.style.width = '100%';
  scannerLine.style.height = '2px';
  scannerLine.style.backgroundColor = '#49c5b6';
  scannerLine.style.boxShadow = '0 0 10px rgba(73, 197, 182, 0.8)';
  scannerLine.style.opacity = '0';
  
  // Animate scanner line
  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 3
  });
  
  timeline
    .to(scannerLine, {
      opacity: 0.8,
      duration: 0.2
    })
    .to(scannerLine, {
      top: '100%',
      duration: 1.5,
      ease: "power1.inOut"
    })
    .to(scannerLine, {
      opacity: 0,
      duration: 0.2
    })
    .set(scannerLine, {
      top: '0%'
    });
  
  return {
    timeline,
    destroy: () => {
      timeline.kill();
      if (target.contains(scannerLine)) {
        target.removeChild(scannerLine);
      }
    }
  };
}

/**
 * Creates a hacking/typing animation that reveals text
 * @param target Element containing text to reveal
 * @param text The text to type
 * @param speed Characters per second
 */
export function hackingTypewriter(target: HTMLElement, text: string, speed: number = 20) {
  // Store original text and clear it
  target.textContent = '';
  
  const timeline = gsap.timeline();
  
  timeline.to(target, {
    duration: text.length / speed,
    text: {
      value: text,
      delimiter: "",
      scramble: {
        chars: "!<>-_\\/[]{}%#",
        chance: 0.2
      }
    },
    ease: "none"
  });
  
  return timeline;
}

/**
 * Creates a data corruption effect on an element
 * @param target Element to apply effect to
 */
export function dataCorruptionEffect(target: HTMLElement) {
  // Store original content
  const originalHTML = target.innerHTML;
  const originalOpacity = window.getComputedStyle(target).opacity;
  
  const timeline = gsap.timeline();
  
  // Number of corruption iterations
  const iterations = 3 + Math.floor(Math.random() * 3);
  
  for (let i = 0; i < iterations; i++) {
    // Create corrupted content - replace some characters with random ones
    const corrupt = () => {
      const chars = "!<>-_\\/[]{}—=+*^?#_abcdefghijklmnopqrstuvwxyz0123456789";
      const text = target.textContent || '';
      let corrupted = '';
      
      for (let i = 0; i < text.length; i++) {
        if (Math.random() < 0.3) { // 30% chance to corrupt each character
          corrupted += chars.charAt(Math.floor(Math.random() * chars.length));
        } else {
          corrupted += text.charAt(i);
        }
      }
      
      target.textContent = corrupted;
    };
    
    // Add to timeline
    timeline
      .add(() => corrupt())
      .to(target, {
        opacity: 0.7 + Math.random() * 0.3,
        duration: 0.1
      });
  }
  
  // Return to original state
  timeline.add(() => {
    target.innerHTML = originalHTML;
  }).to(target, {
    opacity: originalOpacity,
    duration: 0.2
  });
  
  return timeline;
}
