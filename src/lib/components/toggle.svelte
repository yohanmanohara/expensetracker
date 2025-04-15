<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    
    const theme = writable<'light' | 'dark'>('light');
    
    const applyTheme = (value: 'light' | 'dark') => {
      if (value === 'light') {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      } else if (value === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      }
    };
    
    onMount(() => {
      const stored = localStorage.theme as 'light' | 'dark' | undefined;
    
      if (stored === 'light' || stored === 'dark') {
        theme.set(stored);
        applyTheme(stored);
      } else {
        theme.set('light'); // Default to light theme
        applyTheme('light');
      }
    });
    
    function toggleTheme(value: 'light' | 'dark') {
      theme.set(value);
      applyTheme(value);
    }
  </script>
  
  <div class="flex gap-2 items-center">
    <!-- Light Mode Button -->
    <button 
      on:click={() => toggleTheme('light')} 
      class="p-2 rounded-fulltransition-all text-white"
      aria-label="Switch to Light Mode"
    >
      ☀️
    </button>
  
    <!-- Dark Mode Button -->
    <button 
      on:click={() => toggleTheme('dark')} 
      class="p-2 rounded-full   transition-all text-white"
      aria-label="Switch to Dark Mode"
    >
      🌙
    </button>
  </div>
  
  <style>
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  </style>
  