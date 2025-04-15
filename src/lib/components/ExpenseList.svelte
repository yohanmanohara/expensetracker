<script>
    import { expenses, deleteExpense } from '../stores.js'
    import { format } from 'date-fns'
    
    let editingId = $state(null)
    
    const handleEdit = (id) => {
      editingId = id
    }
    
    const handleCancelEdit = () => {
      editingId = null
    }
  </script>
  
  <div class="space-y-4">
    <h2 class="text-xl font-semibold text-gray-800">Your Expenses</h2>
    
    {#if $expenses.length === 0}
      <p class="text-gray-500">No expenses yet. Add one to get started!</p>
    {:else}
      <div class="space-y-3">
        {#each $expenses as expense (expense.id)}
          <article class="bg-white p-4 rounded-lg shadow">
            {#if editingId === expense.id}
              <ExpenseForm 
                expenseToEdit={expense} 
                onCancel={handleCancelEdit}
              />
            {:else}
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-medium text-gray-900">{expense.title}</h3>
                  <p class="text-sm text-gray-500">
                    {format(expense.date, 'MMM dd, yyyy')} • {expense.category}
                  </p>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="font-bold text-gray-900">${expense.amount.toFixed(2)}</span>
                  <div class="flex space-x-1">
                    <!-- svelte-ignore event_directive_deprecated -->
                    <button
                      on:click={() => handleEdit(expense.id)}
                      class="p-1 text-blue-600 hover:text-blue-800"
                      aria-label="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <!-- svelte-ignore event_directive_deprecated -->
                    <button
                      on:click={() => deleteExpense(expense.id)}
                      class="p-1 text-red-600 hover:text-red-800"
                      aria-label="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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