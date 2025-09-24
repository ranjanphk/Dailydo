import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function ProjectCard({ project, onSelect }) {
  const { tasks = [], title } = project;

  // Calculate totals reactively using useMemo
  const { totalTasks, completedTasks, pendingTasks, progress, projectTask } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Completed").length;
    const pending = total - completed;
    const prog = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { totalTasks: total, completedTasks: completed, pendingTasks: pending, progress: prog };
  }, [tasks]); // recalc when tasks array changes

  const data = [
    { name: "Completed", value: completedTasks },
    { name: "Pending", value: pendingTasks },
  ];

  const COLORS = ["#22c55e", "#e5e7eb"]; // green + gray

  return (
    <div
      className="bg-white rounded-xl shadow p-4 hover:shadow-md transition flex flex-col items-center justify-center gap-2 w-64"
      onClick={() => onSelect(project)}
    >
      {/* Donut Chart */}
      <div className="relative w-24 h-24">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={35}
              outerRadius={45}
              paddingAngle={2}
              stroke="none"

            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
          {progress}%
        </div>
      </div>

      {/* Title */}
      <h2 className="text-md font-semibold text-gray-800">{title}</h2>

      {/* Task count */}
      <p className="text-sm text-gray-500">
        {completedTasks}/{totalTasks} tasks
      </p>
    </div>
  );
}
