import { useState } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo, Priority } from '@/types/index';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string, priority: Priority, category: string) => void;
};

const priorityDot: Record<Priority, string> = {
  low: 'bg-emerald-400',
  medium: 'bg-amber-400',
  high: 'bg-rose-400',
};

const priorityBorder: Record<Priority, string> = {
  low: 'border-l-emerald-400',
  medium: 'border-l-amber-400',
  high: 'border-l-rose-400',
};

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editCategory, setEditCategory] = useState<string>(todo.category);

  function handleSave() {
    if (!editText.trim()) return;
    onEdit(todo.id, editText, editPriority, editCategory);
    setEditing(false);
  }

  function handleCancel() {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditCategory(todo.category);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className={clsx(
        'flex flex-col gap-2 p-4 bg-white rounded-xl shadow-sm border border-indigo-200 border-l-4',
        priorityBorder[editPriority]
      )}>
        <input
          autoFocus
          value={editText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-1">
            {PRIORITIES.map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setEditPriority(p)}
                className={clsx(
                  'px-2 py-0.5 rounded text-xs font-semibold capitalize transition border',
                  p === 'low' ? 'bg-emerald-100 text-emerald-700 border-emerald-300' :
                  p === 'medium' ? 'bg-amber-100 text-amber-700 border-amber-300' :
                  'bg-rose-100 text-rose-700 border-rose-300',
                  editPriority === p ? 'ring-2 ring-indigo-300' : 'opacity-60'
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <input
            value={editCategory}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditCategory(e.target.value)}
            placeholder="Category"
            className="flex-1 min-w-24 px-2 py-1 text-xs rounded border border-slate-200 text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          />
          <div className="flex gap-1 ml-auto">
            <button
              onClick={handleSave}
              className="p-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition"
            >
              <Check size={14} />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 transition"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      'group flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100 border-l-4 transition hover:shadow-md',
      priorityBorder[todo.priority],
      todo.completed && 'opacity-60'
    )}>
      <button
        onClick={() => onToggle(todo.id)}
        className={clsx(
          'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition',
          todo.completed
            ? 'bg-indigo-500 border-indigo-500'
            : 'border-slate-300 hover:border-indigo-400'
        )}
      >
        {todo.completed && <Check size={10} strokeWidth={3} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={clsx(
          'text-slate-700 text-sm leading-snug',
          todo.completed && 'line-through text-slate-400'
        )}>
          {todo.text}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className={clsx('w-2 h-2 rounded-full flex-shrink-0', priorityDot[todo.priority])} />
          <span className="text-xs text-slate-400 capitalize">{todo.priority}</span>
          <span className="text-slate-200">·</span>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{todo.category}</span>
        </div>
      </div>

      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => setEditing(true)}
          className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-500 transition"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}
