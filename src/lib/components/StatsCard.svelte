<script>
  import { expenses } from '../stores.js'
  
  $: totalExpenses = $expenses.reduce((sum, expense) => sum + expense.amount, 0)
  $: averageExpense = $expenses.length > 0 ? totalExpenses / $expenses.length : 0
</script>

<div class="grid grid-row-1 md:grid-cols-1 gap-5 mb-8">
  <!-- Total Expenses Card -->
  <div class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md dark:hover:border-gray-600 group">
      <div class="flex items-center gap-3 mb-2">
          <div class="p-2 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 group-hover:bg-blue-200/80 dark:group-hover:bg-blue-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
          </div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</h3>
      </div>
      <p class="text-2xl font-semibold text-gray-900 dark:text-white">Rs {totalExpenses.toFixed(2)}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">All-time spending</p>
  </div>

  <!-- Number of Expenses Card -->
  <div class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md dark:hover:border-gray-600 group">
      <div class="flex items-center gap-3 mb-2">
          <div class="p-2 rounded-lg bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 group-hover:bg-emerald-200/80 dark:group-hover:bg-emerald-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
          </div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Transactions</h3>
      </div>
      <p class="text-2xl font-semibold text-gray-900 dark:text-white">{$expenses.length}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Total records</p>
  </div>

  <!-- Average Expense Card -->
  <div class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md dark:hover:border-gray-600 group">
      <div class="flex items-center gap-3 mb-2">
          <div class="p-2 rounded-lg bg-purple-100/80 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 group-hover:bg-purple-200/80 dark:group-hover:bg-purple-900/50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
          </div>
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Average</h3>
      </div>
      <p class="text-2xl font-semibold text-gray-900 dark:text-white">Rs {averageExpense.toFixed(2)}</p>
      <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">Per transaction</p>
  </div>
</div>