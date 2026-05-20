import TodoInput from '@/components/TodoInput';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import StatsBar from '@/components/StatsBar';
import { useTodos } from '@/hooks/useTodos';
import { ClipboardList } from 'lucide-react';

export default function HomePage() {
  const {
    todos,
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
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-md">
            <ClipboardList size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 leading-none">My Tasks</h1>
            <p className="text-sm text-slate-400 mt-0.5">Stay organised, stay productive</p>
          </div>
        </div>

        {/* Input */}
        <div className="mb-5">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Stats */}
        <div className="mb-4">
          <StatsBar
            total={stats.total}
            active={stats.active}
            completed={stats.completed}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* Filters */}
        <div className="mb-5">
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            categories={categories}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            search={search}
            onSearchChange={setSearch}
          />
        </div>

        {/* Todo List */}
        <div className="flex flex-col gap-2">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-300">
              <ClipboardList size={48} strokeWidth={1} />
              <p className="mt-3 text-sm font-medium">No tasks yet. Add one above!</p>
            </div>
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
