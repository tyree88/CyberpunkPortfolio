<script>
  import { onMount, onDestroy } from 'svelte';
  import * as THREE from 'three';
  import { cursorPosition } from '$lib/stores/cursorStore';
  import { browser } from '$app/environment';
  
  // Props
  export let color = '#49c5b6'; // Default cyberpunk teal
  export let intensity = 0.8;
  export let density = 100; // Number of particles
  
  // Local vars
  let container;
  let scene;
  let camera;
  let renderer;
  let particles;
  let mouseX = 0;
  let mouseY = 0;
  let width;
  let height;
  let animationFrame;
  
  // Create and initialize Three.js scene
  function initScene() {
    // Skip initialization if not in browser environment
    if (!browser) return;
    
    // Get container dimensions
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Create scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(renderer.domElement);
    
    // Create particle system
    createParticles();
    
    // Start animation loop
    animate();
    
    // Set up resize listener
    window.addEventListener('resize', handleResize);
    
    // Set up cursor position subscription
    const unsubscribe = cursorPosition.subscribe(pos => {
      mouseX = (pos.x / width - 0.5) * 2;
      mouseY = -(pos.y / height - 0.5) * 2;
    });
    
    return unsubscribe;
  }
  
  // Create particle system
  function createParticles() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const sizes = [];
    
    // Create particles in a cyberpunk-style grid
    for (let i = 0; i < density; i++) {
      // Create grid-like structure with some randomness
      let x, y, z;
      
      // 75% of particles in a grid pattern, 25% random for organic feel
      if (Math.random() > 0.25) {
        // Grid pattern with noise for cyberpunk tech feel
        const gridSize = 5; // Grid cell size
        // Create a grid pattern
        x = Math.floor(Math.random() * 10) * gridSize - 25;
        y = Math.floor(Math.random() * 10) * gridSize - 25;
        z = Math.floor(Math.random() * 5) * gridSize - 15;
        
        // Add a small offset for less perfect grid
        x += Math.random() * 2 - 1;
        y += Math.random() * 2 - 1;
        z += Math.random() * 2 - 1;
      } else {
        // Completely random particles for organic feel
        x = Math.random() * 50 - 25;
        y = Math.random() * 50 - 25;
        z = Math.random() * 30 - 15;
      }
      
      vertices.push(x, y, z);
      
      // Vary the size of particles
      const size = Math.random() * 0.3 + 0.1;
      sizes.push(size);
    }
    
    // Set positions
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    
    // Set individual particle sizes
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    
    // Create shader material for better-looking particles
    const threeColor = new THREE.Color(color);
    const material = new THREE.PointsMaterial({
      color: threeColor,
      size: 0.4,
      transparent: true,
      opacity: intensity,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true, // Particles change size based on distance
      depthWrite: false, // Prevents particles from being occluded incorrectly
    });
    
    // Create particle system
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }
  
  // Animation loop
  function animate() {
    animationFrame = requestAnimationFrame(animate);
    
    // Only run animation if all components are initialized
    if (particles && scene && camera && renderer) {
      try {
        // Rotate particles based on mouse position - slower rotation for better performance
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        
        // Apply mouse movement influence - more subtle effect
        particles.rotation.x += mouseY * 0.0005;
        particles.rotation.y += mouseX * 0.0005;
        
        // Get current particle positions
        const positions = particles.geometry.attributes.position.array;
        
        // Animate only a subset of particles each frame for better performance
        // Using a step to reduce calculations
        const step = 9; // Process every 3rd particle (3 coordinates per particle)
        for (let i = 0; i < positions.length; i += step) {
          // More subtle pulsing effect
          positions[i + 2] += Math.sin(Date.now() * 0.0005 + i) * 0.005;
        }
        
        particles.geometry.attributes.position.needsUpdate = true;
        
        // Render scene
        renderer.render(scene, camera);
      } catch (error) {
        // If we encounter a WebGL error, log it but don't crash
        console.error("WebGL render error:", error);
      }
    }
  }
  
  // Handle window resize
  function handleResize() {
    if (!browser || !camera || !renderer) return;
    
    width = window.innerWidth;
    height = window.innerHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  
  // Initialize on mount
  onMount(() => {
    const unsubscribe = initScene();
    
    return () => {
      if (unsubscribe) unsubscribe();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (browser) window.removeEventListener('resize', handleResize);
      if (container && renderer) container.removeChild(renderer.domElement);
      
      // Clean up THREE.js resources
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
      }
      scene = null;
      camera = null;
      renderer = null;
      particles = null;
    };
  });
</script>

<div class="three-container" bind:this={container}></div>

<style>
  .three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1; /* Keep background behind everything else */
    pointer-events: none; /* Allow clicking through to elements underneath */
    opacity: 0.7; /* Subtle background effect */
  }
</style>