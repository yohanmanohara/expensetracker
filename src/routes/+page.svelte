<script>
  import ExpenseForm from '$lib/components/ExpenseForm.svelte'
  import ExpenseList from '$lib/components/ExpenseList.svelte'
  import ExpenseChart from '$lib/components/ExpenseChart.svelte'
  import StatsCard from '$lib/components/StatsCard.svelte'
  import ExpenseLimit from '$lib/components/ExpenseLimit.svelte'
  
</script>

<div class="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <div>
     <ExpenseLimit />
     
    </div>
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