<script>
  import { addExpense, editExpense } from '../stores.js'

  const { expenseToEdit = null, onCancel = () => {} } = $props();


  let title = $state(expenseToEdit?.title || '')
  let amount = $state(expenseToEdit?.amount?.toString() || '')
  let date = $state(expenseToEdit?.date?.toISOString().slice(0, 10) || '')
  let category = $state(expenseToEdit?.category || 'Food')

  const categories = ['Food', 'Transport', 'Entertainment', 'Bills', 'Shopping', 'Other']

  const handleSubmit = () => {
    if (!title || !amount || !date) return

    const expenseData = {
      title,
      amount: parseFloat(amount),
      date,
      category
    }

    if (expenseToEdit) {
      editExpense(expenseToEdit.id, expenseData)
    } else {
      addExpense(expenseData)
    }

    // Reset form
    title = ''
    amount = ''
    date = ''
    category = 'Food'
  }
</script>

<form 
  on:submit|preventDefault={handleSubmit}
  class="space-y-4 bg-white p-6 rounded-lg shadow-md"
>
  <h2 class="text-xl font-semibold text-gray-800">
    {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
  </h2>

  <div class="space-y-2">
    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
    <input
      id="title"
      type="text"
      bind:value={title}
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div class="space-y-2">
    <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
    <input
      id="amount"
      type="number"
      min="0.01"
      step="0.01"
      bind:value={amount}
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div class="space-y-2">
    <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
    <input
      id="date"
      type="date"
      bind:value={date}
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div class="space-y-2">
    <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
    <select
      id="category"
      bind:value={category}
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
  </div>

  <div class="flex space-x-3 pt-2">
    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {expenseToEdit ? 'Update' : 'Add'} Expense
    </button>
    {#if expenseToEdit}
      <button
        type="button"
        on:click={onCancel}
        class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Cancel
      </button>
    {/if}
  </div>
</form>