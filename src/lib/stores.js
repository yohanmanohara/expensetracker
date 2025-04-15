import { writable } from 'svelte/store'

export const expenses = writable([
  { id: 1, title: 'Groceries', amount: 50, date: new Date('2023-05-15'), category: 'Food' },
  { id: 2, title: 'Gas', amount: 30, date: new Date('2023-05-10'), category: 'Transport' },
  { id: 3, title: 'Movie', amount: 15, date: new Date('2023-05-05'), category: 'Entertainment' },
])

export const addExpense = (expense) => {
  expenses.update((current) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      date: new Date(expense.date)
    }
    return [newExpense, ...current]
  })
}

export const editExpense = (id, updatedExpense) => {
  expenses.update((current) => 
    current.map(expense => 
      expense.id === id ? { ...updatedExpense, id, date: new Date(updatedExpense.date) } : expense
    )
  )
}

export const deleteExpense = (id) => {
  expenses.update((current) => current.filter(expense => expense.id !== id))
}