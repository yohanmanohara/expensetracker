<script>
    import ExpenseForm from '$lib/components/ExpenseForm.svelte'
    import ExpenseList from '$lib/components/ExpenseList.svelte'
    import ExpenseChart from '$lib/components/ExpenseChart.svelte'
    import StatsCard from '$lib/components/StatsCard.svelte'
  </script>
  
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Expense Tracker</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <ExpenseForm />
          <ExpenseList />
        </div>
        
        <div class="space-y-6">
          <StatsCard />
          <ExpenseChart />
        </div>
      </div>
    </div>
  </div>