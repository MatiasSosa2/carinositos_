import { useState, useEffect } from 'react';

const STORAGE_KEY = 'budget-app-data';

const defaultCategories = [
  { id: 'food', name: 'Comida', color: 'category-food', icon: '🍽️' },
  { id: 'transport', name: 'Transporte', color: 'category-transport', icon: '🚗' },
  { id: 'entertainment', name: 'Entretenimiento', color: 'category-entertainment', icon: '🎬' },
  { id: 'shopping', name: 'Compras', color: 'category-shopping', icon: '🛍️' },
  { id: 'health', name: 'Salud', color: 'category-health', icon: '🏥' },
  { id: 'education', name: 'Educación', color: 'category-education', icon: '📚' },
  { id: 'bills', name: 'Facturas', color: 'category-bills', icon: '💡' },
  { id: 'other', name: 'Otros', color: 'category-other', icon: '📦' }
];

const sampleExpenses = [
  { id: '1', description: 'Supermercado', amount: 85.50, category: 'food', date: '2024-01-15' },
  { id: '2', description: 'Gasolina', amount: 45.00, category: 'transport', date: '2024-01-14' },
  { id: '3', description: 'Netflix', amount: 12.99, category: 'entertainment', date: '2024-01-13' },
  { id: '4', description: 'Ropa nueva', amount: 120.00, category: 'shopping', date: '2024-01-12' },
  { id: '5', description: 'Farmacia', amount: 25.75, category: 'health', date: '2024-01-11' },
  { id: '6', description: 'Curso online', amount: 89.99, category: 'education', date: '2024-01-10' },
  { id: '7', description: 'Electricidad', amount: 78.50, category: 'bills', date: '2024-01-09' },
  { id: '8', description: 'Café', amount: 4.50, category: 'food', date: '2024-01-08' },
  { id: '9', description: 'Uber', amount: 15.25, category: 'transport', date: '2024-01-07' },
  { id: '10', description: 'Cine', amount: 18.00, category: 'entertainment', date: '2024-01-06' },
  { id: '11', description: 'Almuerzo', amount: 22.50, category: 'food', date: '2024-01-05' },
  { id: '12', description: 'Libros', amount: 35.99, category: 'education', date: '2024-01-04' }
];

export const useBudget = () => {
  const [monthlyBudget, setMonthlyBudget] = useState(1500);
  const [expenses, setExpenses] = useState([]);
  const [categories] = useState(defaultCategories);

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const data = JSON.parse(savedData);
      setMonthlyBudget(data.monthlyBudget || 1500);
      setExpenses(data.expenses || sampleExpenses);
    } else {
      setExpenses(sampleExpenses);
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      monthlyBudget,
      expenses
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [monthlyBudget, expenses]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const getTotalSpent = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getRemainingBudget = () => {
    return monthlyBudget - getTotalSpent();
  };

  const getExpensesByCategory = () => {
    const categoryTotals = {};
    categories.forEach(category => {
      categoryTotals[category.id] = {
        ...category,
        total: 0,
        expenses: []
      };
    });

    expenses.forEach(expense => {
      if (categoryTotals[expense.category]) {
        categoryTotals[expense.category].total += expense.amount;
        categoryTotals[expense.category].expenses.push(expense);
      }
    });

    return Object.values(categoryTotals);
  };

  const getWeeklyData = () => {
    const weeklyData = {};
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      weeklyData[dateStr] = 0;
    }

    expenses.forEach(expense => {
      if (weeklyData.hasOwnProperty(expense.date)) {
        weeklyData[expense.date] += expense.amount;
      }
    });

    return Object.entries(weeklyData).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString('es-ES', { weekday: 'short' }),
      amount
    }));
  };

  const getMonthlyData = () => {
    const monthlyData = {};
    const currentYear = new Date().getFullYear();
    
    for (let i = 0; i < 12; i++) {
      const month = new Date(currentYear, i, 1).toLocaleDateString('es-ES', { month: 'short' });
      monthlyData[i] = { month, amount: 0 };
    }

    expenses.forEach(expense => {
      const expenseMonth = new Date(expense.date).getMonth();
      monthlyData[expenseMonth].amount += expense.amount;
    });

    return Object.values(monthlyData);
  };

  return {
    monthlyBudget,
    setMonthlyBudget,
    expenses,
    categories,
    addExpense,
    deleteExpense,
    getTotalSpent,
    getRemainingBudget,
    getExpensesByCategory,
    getWeeklyData,
    getMonthlyData
  };
};