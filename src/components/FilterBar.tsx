import clsx from 'clsx';
import type { FilterType } from '@/types/index';

type FilterBarProps = {
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  categories: string[];
  categoryFilter: string;
  onCategoryChange: (c: string) => void;
  search: string;
  onSearchChange: (s: string) => void;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  categories,
  categoryFilter,
  onCategoryChange,
  search,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
      />
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={clsx(
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition',
                filter === f.value
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={clsx(
                'px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition border',
                categoryFilter === cat
                  ? 'bg-indigo-500 text-white border-indigo-500'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-300 hover:text-indigo-500'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
