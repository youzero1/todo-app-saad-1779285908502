import { CheckCircle2, Circle, ListTodo } from 'lucide-react';

type StatsBarProps = {
  total: number;
  active: number;
  completed: number;
  onClearCompleted: () => void;
};

export default function StatsBar({ total, active, completed, onClearCompleted }: StatsBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
      <div className="flex items-center gap-1.5">
        <ListTodo size={15} className="text-indigo-400" />
        <span>{total} total</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Circle size={15} className="text-amber-400" />
        <span>{active} active</span>
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={15} className="text-emerald-400" />
        <span>{completed} done</span>
      </div>
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="ml-auto text-xs text-rose-400 hover:text-rose-600 transition font-medium"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
