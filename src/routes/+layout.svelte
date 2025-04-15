<script>
  import "../app.css";
  import DarkModeToggle from '../lib/components/toggle.svelte';
</script>

<nav class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg rounded-full px-6 py-2 flex items-center justify-between w-auto z-50 gap-4">
  <h1 class="text-lg font-bold text-gray-800 dark:text-white">Expense Tracker</h1>
  <DarkModeToggle />
</nav>
<div class="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
  <slot />
</div>
