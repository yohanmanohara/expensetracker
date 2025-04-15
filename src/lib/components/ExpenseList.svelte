<script>
    import { expenses, deleteExpense } from '../stores.js'
    import { format } from 'date-fns'
    import ExpenseForm from './ExpenseForm.svelte'
    
    let editingId = $state(null)
    
    const handleEdit = (id) => {
      editingId = id
    }
    
    const handleCancelEdit = () => {
      editingId = null
    }
  
    // Color mapping for categories
    const categoryColors = {
      'Food': {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        darkBg: 'dark:bg-blue-900/30',
        darkText: 'dark:text-blue-200',
        icon: '🍔'
      },
      'Transport': {
        bg: 'bg-green-100',
        text: 'text-green-800',
        darkBg: 'dark:bg-green-900/30',
        darkText: 'dark:text-green-200',
        icon: '🚗'
      },
      'Entertainment': {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        darkBg: 'dark:bg-purple-900/30',
        darkText: 'dark:text-purple-200',
        icon: '🎬'
      },
      'Bills': {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        darkBg: 'dark:bg-yellow-900/30',
        darkText: 'dark:text-yellow-200',
        icon: '🧾'
      },
      'Shopping': {
        bg: 'bg-pink-100',
        text: 'text-pink-800',
        darkBg: 'dark:bg-pink-900/30',
        darkText: 'dark:text-pink-200',
        icon: '🛍️'
      },
      'Other': {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        darkBg: 'dark:bg-gray-900/30',
        darkText: 'dark:text-gray-200',
        icon: '📌'
      }
    }
  </script>
  
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6 
    bg-white/50 dark:bg-gray-900/50 
    backdrop-blur-md 
    p-4 rounded-2xl shadow-lg 
    border border-gray-200 dark:border-gray-700">
<h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
Your Expenses
</h2>
<button class="flex items-center gap-2 px-4 py-2 
           bg-white/30 dark:bg-gray-800/50 
           backdrop-blur-sm rounded-xl 
           border border-gray-300 dark:border-gray-600 
           text-gray-800 dark:text-gray-200 
           hover:bg-white/40 dark:hover:bg-gray-700 
           transition-all">
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
</svg>
Filter
</button>
</div>

      
    {#if $expenses.length === 0}
      <div class="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
        <p class="mt-3 text-gray-500 dark:text-gray-400">No expenses yet. Add one to get started!</p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each $expenses as expense (expense.id)}
          <article class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50 transition-all hover:shadow-md dark:hover:border-gray-600">
            {#if editingId === expense.id}
              <ExpenseForm 
                expenseToEdit={expense} 
                onCancel={handleCancelEdit}
              />
            {:else}
              <div class="flex justify-between items-start gap-4">
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-gray-900 dark:text-gray-100 truncate">{expense.title}</h3>
                  <div class="flex items-center gap-2 mt-1 text-sm">
                    <span class="text-gray-500 dark:text-gray-400">
                      {format(expense.date, 'MMM dd, yyyy')}
                    </span>
                    <span class="text-gray-300 dark:text-gray-600">•</span>
                    <span class={`px-2 py-0.5 text-xs font-medium rounded-full flex items-center gap-1 
                      ${categoryColors[expense.category].bg} 
                      ${categoryColors[expense.category].text}
                      ${categoryColors[expense.category].darkBg}
                      ${categoryColors[expense.category].darkText}`}>
                      <span class="text-xs">{categoryColors[expense.category].icon}</span>
                      {expense.category}
                    </span>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <span class="font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <div class="flex gap-1">
                    <button
                      on:click={() => handleEdit(expense.id)}
                      class="p-1.5 rounded-md text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      on:click={() => deleteExpense(expense.id)}
                      class="p-1.5 rounded-md text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            {/if}
          </article>
        {/each}
      </div>
    {/if}
  </div>