<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import GlitchText from './GlitchText.svelte';
  
  let name: string = '';
  let email: string = '';
  let message: string = '';
  let submitted = false;
  let formError = '';
  let formContainer: HTMLElement;
  
  onMount(() => {
    // Animate form fields in
    gsap.from('.form-group', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
  });
  
  function handleSubmit() {
    // Form validation
    if (!name || !email || !message) {
      formError = 'All fields are required.';
      
      // Shake effect on error
      gsap.to(formContainer, {
        x: [-5, 5, -5, 5, 0],
        duration: 0.4,
        ease: 'power1.inOut'
      });
      
      return;
    }
    
    if (!validateEmail(email)) {
      formError = 'Please enter a valid email address.';
      
      // Shake effect on error
      gsap.to(formContainer, {
        x: [-5, 5, -5, 5, 0],
        duration: 0.4,
        ease: 'power1.inOut'
      });
      
      return;
    }
    
    // Reset error
    formError = '';
    
    // Simulate form submission with animation
    const timeline = gsap.timeline();
    
    timeline
      .to('.form-content', {
        opacity: 0,
        y: -20,
        duration: 0.5
      })
      .set('.form-content', { display: 'none' })
      .set('.success-message', { display: 'flex' })
      .to('.success-message', {
        opacity: 1,
        y: 0,
        duration: 0.5
      });
      
    submitted = true;
  }
  
  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function resetForm() {
    name = '';
    email = '';
    message = '';
    submitted = false;
    
    const timeline = gsap.timeline();
    
    timeline
      .to('.success-message', {
        opacity: 0,
        y: -20,
        duration: 0.5
      })
      .set('.success-message', { display: 'none' })
      .set('.form-content', { display: 'block' })
      .to('.form-content', {
        opacity: 1,
        y: 0,
        duration: 0.5
      });
  }
</script>

<div class="contact-form" bind:this={formContainer}>
  <div class="form-content" style="display: {submitted ? 'none' : 'block'}">
    <div class="form-group">
      <label for="name">YOUR HANDLE</label>
      <input 
        type="text" 
        id="name" 
        bind:value={name} 
        class="form-input"
        placeholder="Enter your name"
      />
    </div>
    
    <div class="form-group">
      <label for="email">SECURE COMM CHANNEL</label>
      <input 
        type="email" 
        id="email" 
        bind:value={email} 
        class="form-input"
        placeholder="Enter your email"
      />
    </div>
    
    <div class="form-group">
      <label for="message">TRANSMISSION</label>
      <textarea 
        id="message" 
        bind:value={message} 
        class="form-input form-textarea"
        placeholder="Enter your message"
        rows="4"
      ></textarea>
    </div>
    
    {#if formError}
      <div class="form-error">
        <span class="error-icon">!</span> {formError}
      </div>
    {/if}
    
    <button class="form-button" on:click={handleSubmit}>
      <span class="button-text">TRANSMIT</span>
      <span class="button-icon">→</span>
    </button>
  </div>
  
  <div class="success-message" style="display: none">
    <div class="check-icon">✓</div>
    <GlitchText text="TRANSMISSION SUCCESSFUL" />
    <p>Your message has been sent.</p>
    <button class="form-button reset-button" on:click={resetForm}>
      <span class="button-text">SEND ANOTHER</span>
    </button>
  </div>
</div>

<style>
  .contact-form {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(73, 197, 182, 0.5);
    padding: 1.5rem;
    position: relative;
  }
  
  .contact-form:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: #49c5b6;
    opacity: 0.7;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    color: #49c5b6;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
  }
  
  .form-input {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    border: 1px solid rgba(73, 197, 182, 0.5);
    color: #fff;
    padding: 0.8rem;
    font-family: 'Roboto Mono', monospace;
    resize: none;
    transition: all 0.3s ease;
  }
  
  .form-input:focus {
    outline: none;
    border-color: #49c5b6;
    box-shadow: 0 0 8px rgba(73, 197, 182, 0.3);
  }
  
  .form-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  .form-textarea {
    min-height: 120px;
  }
  
  .form-error {
    background-color: rgba(255, 82, 82, 0.2);
    border: 1px solid rgba(255, 82, 82, 0.5);
    color: #ff5252;
    padding: 0.8rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .error-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background-color: rgba(255, 82, 82, 0.5);
    border-radius: 50%;
    font-weight: bold;
  }
  
  .form-button {
    background-color: rgba(73, 197, 182, 0.2);
    border: 1px solid #49c5b6;
    color: #49c5b6;
    padding: 0.8rem 1.5rem;
    font-family: 'Roboto Mono', monospace;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .form-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(73, 197, 182, 0.3),
      transparent
    );
    transition: all 0.6s ease;
  }
  
  .form-button:hover {
    background-color: rgba(73, 197, 182, 0.3);
    box-shadow: 0 0 10px rgba(73, 197, 182, 0.3);
  }
  
  .form-button:hover:before {
    left: 100%;
  }
  
  .success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    opacity: 0;
    padding: 2rem;
  }
  
  .check-icon {
    width: 60px;
    height: 60px;
    background-color: rgba(73, 197, 182, 0.2);
    border: 2px solid #49c5b6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: #49c5b6;
    margin-bottom: 1.5rem;
  }
  
  .reset-button {
    margin-top: 1.5rem;
  }
</style>
