import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    hmr: {
      clientPort: 443
    },
    fs: {
      strict: false
    },
    cors: true,
    allowedHosts: [
      '.replit.dev',
      '.replit.com',
      '.repl.co',
      '6fb31245-895b-4d94-88fe-95b745e24d87-00-zkyysqog78l.spock.replit.dev',
      'localhost',
      'all'
    ]
  },
  preview: {
    host: '0.0.0.0',
    port: 5000
  }
});