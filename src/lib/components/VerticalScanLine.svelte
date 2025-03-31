<script lang="ts">
  /**
   * VerticalScanLine.svelte
   * Creates a vertical scanning line effect reminiscent of Cyberpunk 2077 UI elements.
   * Uses CSS animations for performance.
   */

  /** Duration of the scan animation in seconds. */
  export let duration: number = 3;

  /** Delay before the animation starts in seconds. */
  export let delay: number = 0;

  /** Color of the scan line. Defaults to the cyberpunk teal. */
  export let color: string = '#49c5b6'; // Cyberpunk Teal

  /** Height of the scan line's gradient fade effect. */
  export let fadeHeight: string = '100px';

  /** Opacity of the scan line. */
  export let opacity: number = 0.6;

  // Reactive style variables
  $: scanLineStyle = `
    --scan-duration: ${duration}s;
    --scan-delay: ${delay}s;
    --scan-color: ${color};
    --scan-fade-height: ${fadeHeight};
    --scan-opacity: ${opacity};
  `;
</script>

<div class="scan-line-container" style={scanLineStyle}>
  <div class="scan-line"></div>
</div>

<style>
  .scan-line-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none; /* Allow interaction with elements underneath */
    z-index: 10; /* Ensure it's above content but potentially below overlays */
  }

  .scan-line {
    position: absolute;
    top: 0;
    left: 0; /* Start off-screen */
    width: 2px; /* Width of the scan line */
    height: 100%;
    opacity: var(--scan-opacity);
    background: linear-gradient(
      to bottom,
      transparent 0%,
      var(--scan-color) calc(var(--scan-fade-height) / 2),
      var(--scan-color) calc(100% - var(--scan-fade-height) / 2),
      transparent 100%
    );
    box-shadow: 0 0 5px var(--scan-color), 0 0 10px var(--scan-color);
    animation: vertical-scan var(--scan-duration) linear var(--scan-delay) infinite;

    /* Optimize rendering */
    will-change: transform;
  }

  @keyframes vertical-scan {
    0% {
      transform: translateX(-10px); /* Start slightly off-screen left */
      opacity: var(--scan-opacity);
    }
    50% {
      transform: translateX(calc(100% + 10px)); /* Move across to slightly off-screen right */
      opacity: var(--scan-opacity);
    }
    50.1% {
        opacity: 0; /* Briefly disappear before reset */
    }
    100% {
      transform: translateX(calc(100% + 10px)); /* Stay off-screen right */
      opacity: 0;
    }
    /* Note: We move across in 50% of the time and then pause off-screen.
       Adjust timing if a continuous back-and-forth is needed.
       For a simple left-to-right scan, change 100% transform to translateX(calc(100% + 10px))
       and remove the 50.1% step.
    */

     /* Alternative: Simple Left-to-Right Scan */
    /*
    0% {
      transform: translateX(-10px);
    }
    100% {
      transform: translateX(calc(100% + 10px));
    }
    */
  }
</style>