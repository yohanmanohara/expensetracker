// src/stores/store.js
import { writable } from 'svelte/store';

// Fetch the stored spending limit from localStorage, default to 0 if none found
const getStoredLimit = () => {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('spendingLimit');
    return stored ? parseFloat(stored) : 0;
  }
  return 0;
};

// Store for spending limit
export const spendingLimit = writable(getStoredLimit());

// Sync store value to localStorage when it changes
if (typeof localStorage !== 'undefined') {
  spendingLimit.subscribe((value) => {
    localStorage.setItem('spendingLimit', value);
  });
}

// Store for expenses
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

// Sync expenses store value to localStorage
if (typeof localStorage !== 'undefined') {
  expenses.subscribe((value) => {
    localStorage.setItem('expenses', JSON.stringify(value));
  });
}

// Add new expense function
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

// Edit expense function
export const editExpense = (id, updatedExpense) => {
  expenses.update((current) =>
    current.map(expense =>
      expense.id === id
        ? { ...updatedExpense, id, date: new Date(updatedExpense.date) }
        : expense
    )
  );
};

// Delete expense function
export const deleteExpense = (id) => {
  expenses.update((current) => current.filter(expense => expense.id !== id));
};
