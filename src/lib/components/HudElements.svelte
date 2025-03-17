<script lang="ts">
  // Props
  export let userData: {
    name: string;
    title?: string;
    location?: string;
    status?: string;
  } = { name: '' };
</script>

<!-- HUD elements -->
<div class="hud-elements">
  <div class="hud-element top-right">
    <div class="hud-value">{userData.name}</div>
    <div class="hud-label">IDENTITY</div>
  </div>
  
  <div class="hud-element top-left">
    <div class="hud-value">v1.0.7625269+</div>
    <div class="hud-label">OS VERSION</div>
  </div>
  
  <div class="hud-element bottom-left">
    <div class="hud-value">3.1415</div>
    <div class="hud-label">TRACE</div>
  </div>
  
  <div class="hud-element bottom-right">
    <div class="hud-value">100%</div>
    <div class="hud-label">SYSTEM STATUS</div>
  </div>
</div>

<style>
  /* HUD elements */
  .hud-elements {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 50;
  }
  
  .hud-element {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid #49c5b6;
    padding: 0.3rem 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.3);
    min-width: 120px;
  }
  
  .hud-element.top-right {
    top: 15px;
    right: 15px;
  }
  
  .hud-element.top-left {
    top: 15px;
    left: 15px;
  }
  
  .hud-element.bottom-left {
    bottom: 15px;
    left: 15px;
  }
  
  .hud-element.bottom-right {
    bottom: 15px;
    right: 15px;
  }
  
  .hud-value {
    color: #49c5b6;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  
  .hud-label {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.7rem;
    letter-spacing: 0.5px;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .hud-element {
      padding: 0.3rem 0.6rem;
    }
    
    .hud-value {
      font-size: 0.8rem;
    }
    
    .hud-label {
      font-size: 0.6rem;
    }
  }
</style>
