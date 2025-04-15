<script>
  import { addExpense, editExpense } from '../stores.js'

  const { expenseToEdit = null, onCancel = () => {} } = $props();

  let title = $state(expenseToEdit?.title || '');
  let amount = $state(expenseToEdit?.amount?.toString() || '');
  let date = $state(expenseToEdit?.date?.toISOString().slice(0, 10) || '');
  let category = $state(expenseToEdit?.category || 'Food');

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other'];

  const handleSubmit = () => {
    if (!title || !amount || !date) return;

    const expenseData = {
      title,
      amount: parseFloat(amount),
      date: new Date(date),
      category
    };

    if (expenseToEdit) {
      editExpense(expenseToEdit.id, expenseData);
    } else {
      addExpense(expenseData);
    }

    // Only reset if not editing
    if (!expenseToEdit) {
      title = '';
      amount = '';
      date = '';
      category = 'Food';
    }
  };
</script>

<form 
  on:submit|preventDefault={handleSubmit}
  class="space-y-5 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300"
>
  <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
    {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
  </h2>

  <div class="space-y-3">
    <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Title <span class="text-red-500">*</span>
    </label>
    <input
      id="title"
      type="text"
      bind:value={title}
      required
      placeholder="Dinner with friends"
      class="w-full px-4 py-2.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
    />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div class="space-y-3">
      <label for="amount" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Amount <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
        <input
          id="amount"
          type="number"
          min="0.01"
          step="0.01"
          bind:value={amount}
          required
          placeholder="0.00"
          class="w-full pl-8 pr-4 py-2.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors"
        />
      </div>
    </div>

    <div class="space-y-3">
      <label for="date" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Date <span class="text-red-500">*</span>
      </label>
      <input
        id="date"
        type="date"
        bind:value={date}
        required
        class="w-full px-4 py-2.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors [&::-webkit-calendar-picker-indicator]:invert-[.65] dark:[&::-webkit-calendar-picker-indicator]:invert"
      />
    </div>
  </div>

  <div class="space-y-3">
    <label for="category" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
      Category
    </label>
    <select
      id="category"
      bind:value={category}
      class="w-full px-4 py-2.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-colors appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
    >
      {#each categories as cat}
        <option value={cat} class="bg-white dark:bg-gray-700">{cat}</option>
      {/each}
    </select>
  </div>

  <div class="flex flex-wrap gap-3 pt-3">
    <button
      type="submit"
      class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-colors shadow-md"
    >
      {expenseToEdit ? 'Update Expense' : 'Add Expense'}
    </button>
    {#if expenseToEdit}
      <button
        type="button"
        on:click={onCancel}
        class="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 transition-colors"
      >
        Cancel
      </button>
    {/if}
  </div>
</form>