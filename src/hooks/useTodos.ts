import { useState, useEffect } from 'react';
import type { Todo, Priority, FilterType } from '@/types/index';

const STORAGE_KEY = 'todo-app-todos';

function loadFromStorage(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Todo[];
  } catch {
    return [];
  }
}

function saveToStorage(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  function addTodo(text: string, priority: Priority, category: string): void {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
      category: category.trim() || 'General',
    };
    setTodos(prev => [newTodo, ...prev]);
  }

  function toggleTodo(id: string): void {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id: string): void {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function editTodo(id: string, text: string, priority: Priority, category: string): void {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, text: text.trim(), priority, category: category.trim() || 'General' } : t
      )
    );
  }

  function clearCompleted(): void {
    setTodos(prev => prev.filter(t => !t.completed));
  }

  const categories = ['all', ...Array.from(new Set(todos.map(t => t.category)))];

  const filteredTodos = todos.filter(t => {
    const matchesFilter =
      filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed;
    const matchesSearch = t.text.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesFilter && matchesSearch && matchesCategory;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  };

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    categories,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    stats,
  };
}
