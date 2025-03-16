<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  
  export let totalRam: number = 25;
  export let usedRam: number = 0;
  
  let segments: HTMLElement[] = [];
  let ramBarContainer: HTMLElement;
  
  onMount(() => {
    // Create segments dynamically
    for (let i = 0; i < totalRam; i++) {
      const segment = document.createElement('div');
      segment.className = 'ram-segment';
      ramBarContainer.appendChild(segment);
      segments.push(segment);
    }
    
    // Initial animation
    updateRamDisplay(0);
    
    // Animate in segments
    gsap.from(segments, {
      scaleY: 0,
      opacity: 0,
      stagger: 0.03,
      duration: 0.5,
      ease: "power1.out",
      onComplete: () => {
        // Animate to current value after initial animation
        animateRamUsage(usedRam);
      }
    });
    
    // Random RAM fluctuations
    setInterval(() => {
      const newValue = Math.min(
        totalRam,
        usedRam + Math.floor(Math.random() * 3) - 1
      );
      if (newValue >= 0) {
        animateRamUsage(newValue);
      }
    }, 5000);
  });
  
  function updateRamDisplay(amount: number) {
    // Update RAM segments
    segments.forEach((segment, index) => {
      if (index < amount) {
        segment.classList.add('active');
      } else {
        segment.classList.remove('active');
      }
    });
    
    // Update the RAM text
    usedRam = amount;
  }
  
  function animateRamUsage(targetAmount: number) {
    // Determine current active segments
    const currentActive = segments.filter(seg => seg.classList.contains('active')).length;
    
    // If target is greater than current, add segments
    if (targetAmount > currentActive) {
      for (let i = currentActive; i < targetAmount; i++) {
        gsap.to(segments[i], {
          scaleY: 1,
          opacity: 1,
          backgroundColor: '#49c5b6',
          boxShadow: '0 0 5px rgba(73, 197, 182, 0.8)',
          delay: (i - currentActive) * 0.05,
          duration: 0.2,
          onStart: () => {
            segments[i].classList.add('active');
          }
        });
      }
    } 
    // If target is less than current, remove segments
    else if (targetAmount < currentActive) {
      for (let i = currentActive - 1; i >= targetAmount; i--) {
        gsap.to(segments[i], {
          scaleY: 0.5,
          opacity: 0.3,
          backgroundColor: 'rgba(73, 197, 182, 0.3)',
          boxShadow: 'none',
          delay: (currentActive - 1 - i) * 0.05,
          duration: 0.2,
          onComplete: () => {
            segments[i].classList.remove('active');
          }
        });
      }
    }
    
    // Update the RAM text with animation
    gsap.to({ value: usedRam }, {
      value: targetAmount,
      duration: 0.5,
      onUpdate: function() {
        usedRam = Math.round(this.targets()[0].value);
      }
    });
  }
</script>

<div class="ram-bar-container">
  <div class="ram-bar" bind:this={ramBarContainer}></div>
  <div class="ram-text">{usedRam}/{totalRam}</div>
</div>

<style>
  .ram-bar-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .ram-bar {
    display: flex;
    align-items: flex-end;
    height: 20px;
    gap: 2px;
  }
  
  .ram-text {
    font-family: 'Roboto Mono', monospace;
    color: #49c5b6;
    font-size: 0.8rem;
    min-width: 45px;
    text-align: right;
  }
  
  :global(.ram-segment) {
    width: 8px;
    height: 100%;
    background-color: rgba(73, 197, 182, 0.3);
    transition: all 0.2s ease;
  }
  
  :global(.ram-segment.active) {
    background-color: #49c5b6;
    box-shadow: 0 0 5px rgba(73, 197, 182, 0.8);
  }
</style>
