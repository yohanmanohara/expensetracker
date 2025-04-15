<script>
    import { onMount } from 'svelte'
    import { Chart, registerables } from 'chart.js'
    import { expenses } from '../stores.js'
    
    Chart.register(...registerables)
    
    let chart
    
    onMount(() => {
      const ctx = document.getElementById('expenseChart')
      
      const updateChart = () => {
        const categories = {}
        
        $expenses.forEach(expense => {
          categories[expense.category] = (categories[expense.category] || 0) + expense.amount
        })
        
        const labels = Object.keys(categories)
        const data = Object.values(categories)
        
        if (chart) {
          chart.data.labels = labels
          chart.data.datasets[0].data = data
          chart.update()
        } else {
          chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels,
              datasets: [{
                data,
                backgroundColor: [
                  '#3B82F6',
                  '#10B981',
                  '#F59E0B',
                  '#EF4444',
                  '#8B5CF6',
                  '#EC4899'
                ],
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom'
                }
              }
            }
          })
        }
      }
      
      updateChart()
      
      // Update chart when expenses change
      const unsubscribe = expenses.subscribe(updateChart)
      
      return () => {
        if (chart) chart.destroy()
        unsubscribe()
      }
    })
  </script>
  
  <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-xl font-semibold text-gray-800 mb-4">Expense Breakdown</h2>
    <div class="h-64">
      <canvas id="expenseChart"></canvas>
    </div>
  </div>