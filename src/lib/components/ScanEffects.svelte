<script lang="ts">
  /**
   * ScanEffects.svelte
   * Renders the vertical scan line and interference layer animations.
   */
</script>

<div class="scan-effects-container">
  <div class="scan-line"></div>
  <div class="scan-interference"></div>
</div>

<style>
  .scan-effects-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Allow interaction with content below */
    overflow: hidden; /* Ensure effects stay within bounds */
    z-index: 9; /* Position it appropriately */
  }

  /* Scan line animation */
  .scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(
      to right,
      rgba(73, 197, 182, 0) 0%,
      rgba(73, 197, 182, 0.5) 50%,
      rgba(73, 197, 182, 0) 100%
    );
    z-index: 10; /* Above interference */
    animation: scanAnimation 4s linear infinite;
    opacity: 0.7;
    filter: drop-shadow(0 0 2px rgba(73, 197, 182, 0.8));
    will-change: top, opacity;
  }

  /* Interference layer animation */
  .scan-interference {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(73, 197, 182, 0.02) 50%,
      transparent 100%
    );
    z-index: 9; /* Below scan line */
    animation: interferenceAnimation 4s ease-in-out infinite;
    opacity: 0.3;
    will-change: background-position, opacity;
  }

  @keyframes scanAnimation {
    0% { top: 0; opacity: 0.7; }
    25% { opacity: 0.9; }
    50% { opacity: 0.7; }
    75% { opacity: 0.9; }
    100% { top: 100%; opacity: 0.7; }
  }

  @keyframes interferenceAnimation {
    0% { background-position: 0 -100%; opacity: 0.2; }
    50% { background-position: 0 100%; opacity: 0.3; }
    100% { background-position: 0 300%; opacity: 0.2; }
  }
</style>