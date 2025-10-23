import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Trash2 } from 'lucide-react';

export default function ProjectCard({ project, onSelect, onDelete }) {
  const { tasks = [], title } = project;

  // Calculate totals reactively using useMemo
  const { totalTasks, completedTasks, pendingTasks, progress, projectTask } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const pending = total - completed;
    const prog = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { totalTasks: total, completedTasks: completed, pendingTasks: pending, progress: prog };
  }, [tasks]); // recalc when tasks array changes

  const data = [
    { name: 'Completed', value: completedTasks },
    { name: 'Pending', value: pendingTasks },
  ];

  const COLORS = ['#22c55e', '#e5e7eb']; // green + gray

  return (
    <div
      className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 hover:shadow-md transition flex flex-col items-center justify-center gap-2 w-64 overflow-hidden"
      onClick={() => onSelect(project)}
    >
      <div className="flex top-2 right-2 float-right text-red-500 hover:text-red-700 w-full place-items-center flex-row justify-end">
        {tasks.length === 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(project.id, tasks); // parent handles Firestore
            }}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Donut Chart */}
      <div className="relative w-24 h-24">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={35} outerRadius={45} paddingAngle={2} stroke="none">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">{progress}%</div>
      </div>

      {/* Title */}
      <h2 className="text-md font-semibold text-gray-800 dark:text-gray-100 flex text-center mx-auto">{title}</h2>

      {/* Task count */}
      <p className="text-sm text-gray-500 dark:text-gray-100">
        {completedTasks}/{totalTasks} tasks
      </p>
    </div>
  );
}
