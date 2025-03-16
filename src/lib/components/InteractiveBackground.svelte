<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { browser } from '$app/environment';
  import { cursorPosition } from '$lib/stores/cursorStore';

  // Props
  export let color = '#49c5b6'; // Cyberpunk teal as default
  export let intensity = 1.0;
  export let density = 80; // Number of particles

  // Local state
  let container: HTMLElement;
  let renderer: THREE.WebGLRenderer;
  let scene: THREE.Scene;
  let camera: THREE.PerspectiveCamera;
  let particles: THREE.Points;
  let particleSystem: THREE.Points;
  let frameId: number;
  
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  
  // Track window dimensions
  let windowWidth = browser ? window.innerWidth : 1000;
  let windowHeight = browser ? window.innerHeight : 800;

  // Update cursor position from store
  const unsubscribe = cursorPosition.subscribe(pos => {
    targetMouseX = (pos.x / windowWidth) * 2 - 1;
    targetMouseY = -((pos.y / windowHeight) * 2 - 1);
  });

  // Initialize ThreeJS scene
  function init() {
    if (!browser || !container) return;
    
    // Setup scene
    scene = new THREE.Scene();
    
    // Setup camera with a wide field of view for immersion
    camera = new THREE.PerspectiveCamera(
      70, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      2000
    );
    camera.position.z = 700;
    
    // Create renderer with cyberpunk aesthetics
    renderer = new THREE.WebGLRenderer({ 
      alpha: true,  // Transparent background
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create particle system for 3D grid effect
    createParticles();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
  }
  
  // Create particle system
  function createParticles() {
    // Geometry with random positions in 3D space
    const particlesGeometry = new THREE.BufferGeometry();
    const vertices = [];
    
    // Create cyberpunk grid pattern in 3D space
    const gridSize = 1200;
    const gridStep = gridSize / 10;
    
    // Create grid structure - regular interval points
    for (let x = -gridSize/2; x <= gridSize/2; x += gridStep) {
      for (let y = -gridSize/2; y <= gridSize/2; y += gridStep) {
        // Add some randomness to z position for depth
        const z = (Math.random() - 0.5) * 500;
        vertices.push(x, y, z);
      }
    }
    
    // Add random particles for a more dynamic feel
    for (let i = 0; i < density; i++) {
      const x = (Math.random() - 0.5) * 1000;
      const y = (Math.random() - 0.5) * 1000;
      const z = (Math.random() - 0.5) * 800;
      vertices.push(x, y, z);
    }
    
    particlesGeometry.setAttribute(
      'position', 
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    
    // Material for the particles - glowing cyberpunk effect
    const particlesMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 4,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true
    });
    
    // Create particle system
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
  }
  
  // Handle window resize
  function onWindowResize() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  
  // Animation loop
  function animate() {
    frameId = requestAnimationFrame(animate);
    
    // Smooth cursor movement
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    
    // Tilt scene based on mouse position
    particleSystem.rotation.x = mouseY * 0.2;
    particleSystem.rotation.y = mouseX * 0.3;
    
    // Slight continuous rotation for ambient movement
    particleSystem.rotation.z += 0.0005;
    
    // Render scene
    renderer.render(scene, camera);
  }
  
  // Lifecycle hooks
  onMount(() => {
    if (browser) {
      // Let the DOM fully render
      setTimeout(init, 100);
    }
  });
  
  onDestroy(() => {
    if (browser) {
      unsubscribe();
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onWindowResize);
      
      // Clean up resources
      if (scene && particleSystem) {
        scene.remove(particleSystem);
        particleSystem.geometry.dispose();
        (particleSystem.material as THREE.Material).dispose();
      }
      
      if (renderer) {
        renderer.dispose();
        if (container && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    }
  });
</script>

<div class="interactive-background" bind:this={container}>
  <!-- Three.js canvas will be inserted here -->
</div>

<style>
  .interactive-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* Behind content but above base background */
    pointer-events: none; /* Allows clicking through to content */
    opacity: 0.5; /* Subtle effect */
  }
</style>