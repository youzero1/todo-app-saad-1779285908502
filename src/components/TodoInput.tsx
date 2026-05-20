import { useState } from 'react';
import { Plus } from 'lucide-react';
import clsx from 'clsx';
import type { Priority } from '@/types/index';

type TodoInputProps = {
  onAdd: (text: string, priority: Priority, category: string) => void;
};

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

const priorityColors: Record<Priority, string> = {
  low: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  medium: 'bg-amber-100 text-amber-700 border-amber-300',
  high: 'bg-rose-100 text-rose-700 border-rose-300',
};

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState<string>('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text, priority, category);
    setText('');
    setCategory('');
    setPriority('medium');
    setExpanded(false);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-slate-700 placeholder-slate-400 transition"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-sm transition"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>

      {expanded && (
        <div className="mt-3 flex flex-wrap gap-3 items-center">
          <div className="flex gap-1">
            {PRIORITIES.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={clsx(
                  'px-3 py-1 rounded-lg text-xs font-semibold border capitalize transition',
                  priorityColors[p],
                  priority === p ? 'ring-2 ring-offset-1 ring-indigo-400' : 'opacity-60 hover:opacity-100'
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
            placeholder="Category (e.g. Work)"
            className="flex-1 min-w-32 px-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 text-slate-600 placeholder-slate-400 transition"
          />
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="text-xs text-slate-400 hover:text-slate-600 transition"
          >
            Collapse
          </button>
        </div>
      )}
    </form>
  );
}
