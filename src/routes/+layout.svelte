<script>
  import "../app.css";
  import DarkModeToggle from '../lib/components/toggle.svelte';
</script>

<nav class="fixed top-4 right-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-full px-4 py-2 z-50">
  <DarkModeToggle />
</nav>
<div class="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
  <slot />
</div>
