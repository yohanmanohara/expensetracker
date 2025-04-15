<script>
  import { onMount } from 'svelte'
  import { Chart, registerables } from 'chart.js'
  import { expenses } from '../stores.js'
  
  Chart.register(...registerables)
  
  let chart
  let darkMode = false
  
  // Check for dark mode preference
  onMount(() => {
      darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleColorSchemeChange)
      
      initializeChart()
      
      return () => {
          if (chart) chart.destroy()
          mediaQuery.removeEventListener('change', handleColorSchemeChange)
          unsubscribe?.()
      }
  })
  
  let unsubscribe
  const initializeChart = () => {
      const ctx = document.getElementById('expenseChart')
      
      const updateChart = () => {
          const categories = {}
          
          $expenses.forEach(expense => {
              categories[expense.category] = (categories[expense.category] || 0) + expense.amount
          })
          
          const labels = Object.keys(categories)
          const data = Object.values(categories)
          
          const backgroundColors = [
              '#3B82F6', // blue-500
              '#10B981', // emerald-500
              '#F59E0B', // amber-500
              '#EF4444', // red-500
              '#8B5CF6', // violet-500
              '#EC4899', // pink-500
              '#14B8A6', // teal-500
              '#F97316'  // orange-500
          ]
          
          if (chart) {
              chart.data.labels = labels
              chart.data.datasets[0].data = data
              chart.options.plugins.legend.labels.color = darkMode ? '#E5E7EB' : '#111827'
              chart.update()
          } else {
              chart = new Chart(ctx, {
                  type: 'doughnut',
                  data: {
                      labels,
                      datasets: [{
                          data,
                          backgroundColor: backgroundColors,
                          borderColor: darkMode ? '#1F2937' : '#FFFFFF',
                          borderWidth: 2
                      }]
                  },
                  options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      cutout: '70%',
                      plugins: {
                          legend: {
                              position: 'bottom',
                              labels: {
                                  color: darkMode ? '#E5E7EB' : '#111827',
                                  font: {
                                      family: "'Inter', sans-serif",
                                      size: 14
                                  },
                                  padding: 20,
                                  usePointStyle: true,
                                  pointStyle: 'circle'
                              }
                          },
                          tooltip: {
                              backgroundColor: darkMode ? '#1F2937' : '#F9FAFB',
                              titleColor: darkMode ? '#E5E7EB' : '#111827',
                              bodyColor: darkMode ? '#E5E7EB' : '#111827',
                              borderColor: darkMode ? '#374151' : '#E5E7EB',
                              borderWidth: 1,
                              padding: 12,
                              displayColors: true,
                              usePointStyle: true,
                              callbacks: {
                                  label: function(context) {
                                      const label = context.label || ''
                                      const value = context.formattedValue || ''
                                      const total = context.dataset.data.reduce((a, b) => a + b, 0)
                                      const percentage = Math.round((context.parsed / total) * 100)
                                      return `${label}: $${value} (${percentage}%)`
                                  }
                              }
                          }
                      }
                  }
              })
          }
      }
      
      updateChart()
      
     
      unsubscribe = expenses.subscribe(updateChart)
  }
  
  const handleColorSchemeChange = (e) => {
      darkMode = e.matches
      if (chart) {
          chart.options.plugins.legend.labels.color = darkMode ? '#E5E7EB' : '#111827'
          chart.options.plugins.tooltip.backgroundColor = darkMode ? '#1F2937' : '#F9FAFB'
          chart.options.plugins.tooltip.titleColor = darkMode ? '#E5E7EB' : '#111827'
          chart.options.plugins.tooltip.bodyColor = darkMode ? '#E5E7EB' : '#111827'
          chart.options.plugins.tooltip.borderColor = darkMode ? '#374151' : '#E5E7EB'
          chart.data.datasets[0].borderColor = darkMode ? '#1F2937' : '#FFFFFF'
          chart.update()
      }
  }
</script>

<div class="bg-white  dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-colors duration-300">
  <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Expense Breakdown</h2>
  <div class="h-80 relative">
      <canvas id="expenseChart"></canvas>
  </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
</style>