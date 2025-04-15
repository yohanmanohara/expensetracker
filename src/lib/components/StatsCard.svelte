<script>
    import { expenses } from '../stores.js'
    
    $: totalExpenses = $expenses.reduce((sum, expense) => sum + expense.amount, 0)
    $: averageExpense = $expenses.length > 0 ? totalExpenses / $expenses.length : 0
  </script>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-sm font-medium text-gray-500">Total Expenses</h3>
      <p class="text-2xl font-semibold text-gray-900">${totalExpenses.toFixed(2)}</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-sm font-medium text-gray-500">Number of Expenses</h3>
      <p class="text-2xl font-semibold text-gray-900">{$expenses.length}</p>
    </div>
    <div class="bg-white p-4 rounded-lg shadow">
      <h3 class="text-sm font-medium text-gray-500">Average Expense</h3>
      <p class="text-2xl font-semibold text-gray-900">${averageExpense.toFixed(2)}</p>
    </div>
  </div>    