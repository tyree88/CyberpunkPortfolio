import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://github.com/sveltejs/svelte-adapters
    adapter: adapter(),
    
    // For Replit compatibility
    alias: {
      $lib: 'src/lib'
    },
    
    // Disable CSRF protection for development
    csrf: {
      checkOrigin: false
    },
    
    // For direct access to the site from Replit
    paths: {
      base: ''
    },
    
    // Disable preload to prevent cross-origin issues
    prerender: {
      concurrency: 1,
      handleHttpError: 'warn'
    }
  }
};

export default config;