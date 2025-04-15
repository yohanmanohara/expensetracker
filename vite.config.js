import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Expense Tracker',
        short_name: 'Expenses',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4caf50',
        icons: [
          
          {
            src: '/logo.jpg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
