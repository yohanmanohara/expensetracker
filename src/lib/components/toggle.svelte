<script>
    import { writable } from 'svelte/store';
  
    // Create a store for dark mode state
    const darkMode = writable(false);
  
    // Toggle function
    function toggleDarkMode() {
      darkMode.update(mode => {
        const newMode = !mode;
        // Save preference to localStorage
        localStorage.setItem('darkMode', newMode);
        // Apply class to document
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return newMode;
      });
    }
  
    // Initialize from localStorage or prefer-color-scheme
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('darkMode');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const initialMode = savedMode !== null 
        ? savedMode === 'true'
        : prefersDark;
      
      darkMode.set(initialMode);
      if (initialMode) {
        document.documentElement.classList.add('dark');
      }
    }
  </script>
  
  <button on:click={toggleDarkMode} class="dark-mode-toggle">
    <span class="sr-only">Toggle dark mode</span>
    <span class="icon sun" aria-hidden="true" class:visible={!$darkMode}>☀️</span>
    <span class="icon moon" aria-hidden="true" class:visible={$darkMode}>🌙</span>
  </button>
  
  <style>
    :global(.dark) {
      background-color: #1a1a1a;
      color: #f0f0f0;
    }
  
    .dark-mode-toggle {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
  
    .dark-mode-toggle:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  
    :global(.dark) .dark-mode-toggle:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  
    .icon {
      display: inline-block;
      font-size: 1.2rem;
    }
  
    .sun {
      display: none;
    }
  
    .moon {
      display: none;
    }
  
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
    .visible {
      display: block;
    }
  </style>