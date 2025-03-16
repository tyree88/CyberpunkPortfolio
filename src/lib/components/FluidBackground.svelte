
<script>
  export let gifPath = '/images/Gen 3 Alpha Turbo.mp4.gif';
</script>

<div class="fluid-background">
  <img src={gifPath} alt="Fluid background animation" />
</div>

<style>
  .fluid-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }

  .fluid-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4; /* Adjust this value to change background intensity */
    filter: blur(8px); /* Optional: adds a subtle blur effect */
  }
</style>
