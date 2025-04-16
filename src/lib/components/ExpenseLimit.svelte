<script>
  import { get } from 'svelte/store';

  import { spendingLimit, expenses, addExpense, editExpense, deleteExpense } from '../stores.js';

  let showLimitModal = false;
  let newLimit = '';
  let error = '';

  // Calculate total expenses
  $: totalExpenses = get(expenses).reduce((sum, exp) => sum + exp.amount, 0);

  // Check if the limit is exceeded (but only if the limit is greater than 0)
  $: limitExceeded = $spendingLimit > 0 && totalExpenses > $spendingLimit;

  // Reset the spending limit
  function resetSpendingLimit() {
    spendingLimit.set(0);
  }

  // Set a new spending limit
  function setSpendingLimit() {
    if (!newLimit || parseFloat(newLimit) <= 0) {
      error = 'Please enter a valid limit greater than 0.';
      return;
    }
    spendingLimit.set(parseFloat(newLimit));
    newLimit = '';
    error = '';
    showLimitModal = false;
  }
</script>

<div class="mb-6">
  {#if $spendingLimit > 0}
    <div class="flex items-center gap-4 bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
      <div class="flex-1">
        <p class="text-sm text-gray-600 dark:text-gray-300">Monthly spending limit</p>
        <p class="text-lg font-semibold text-gray-800 dark:text-gray-200">Rs {$spendingLimit.toFixed(2)}</p>
      </div>
      <button 
        on:click={resetSpendingLimit}
        class="flex items-center gap-1 px-3 py-1.5 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 rounded-md text-sm hover:bg-red-50 dark:hover:bg-red-700 transition border border-red-200 dark:border-red-700">
        Remove Limit
      </button>
    </div>
  {:else}
    <button 
      on:click={() => showLimitModal = true}
      class="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition">
      Add Monthly Limit
    </button>
  {/if}

  {#if limitExceeded}
    <div class="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-md">
      Alert: You have exceeded your monthly limit! 🧨
    </div>
  {/if}

  {#if showLimitModal}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Set Monthly Spending Limit</h2>
      <div class="mb-6">
        <label for="limitAmount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount (Rs)</label>
        <input
          id="limitAmount"
          type="number"
          bind:value={newLimit}
          placeholder="5000"
          class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition duration-300 ease-in-out"
          min="1"
          step="any"
        />
        {#if error}
          <p class="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
        {/if}
      </div>
      <div class="flex justify-end gap-4">
        <button 
          on:click={() => { showLimitModal = false; error = ''; }} 
          class="px-5 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 ease-in-out">
          Cancel
        </button>
        <button 
          on:click={setSpendingLimit}
          class="px-5 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300 ease-in-out">
          Set Monthly Limit
        </button>
      </div>
    </div>
  </div>
  {/if}
</div>
