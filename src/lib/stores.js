
import { writable } from 'svelte/store';

const getStoredExpenses = () => {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('expenses');
    return stored ? JSON.parse(stored).map(exp => ({
      ...exp,
      date: new Date(exp.date)
    })) : [];
  }
  return [];
};


export const expenses = writable(getStoredExpenses());


if (typeof localStorage !== 'undefined') {
  expenses.subscribe((value) => {
    localStorage.setItem('expenses', JSON.stringify(value));
  });
}

// Add new expense
export const addExpense = (expense) => {
  expenses.update((current) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      date: new Date(expense.date)
    };
    return [newExpense, ...current];
  });
};

// Edit expense
export const editExpense = (id, updatedExpense) => {
  expenses.update((current) =>
    current.map(expense =>
      expense.id === id
        ? { ...updatedExpense, id, date: new Date(updatedExpense.date) }
        : expense
    )
  );
};

// Delete expense
export const deleteExpense = (id) => {
  expenses.update((current) => current.filter(expense => expense.id !== id));
};
