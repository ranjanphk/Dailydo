import { useMemo, useState } from "react";
import TaskTable from "./TaskTable";
import TaskOverview from "./TaskOverview";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function History({
  user,
  tasks = [],
  projects = [],
  onDeleteTask,
  onChangeStatus,
  onReorder,
  handleEditTask,
  setActivePage,
}) {
  // ✅ Filter completed tasks only
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.status === "Completed"),
    [tasks]
  );

  // ✅ Compute task stats for overview
  const completed = completedTasks.length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-6">
      {/* Header
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Completed Tasks</h1>
        <button
          onClick={() => setActivePage("tasks")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          ← Back
        </button>
      </div> */}

      {/* Main Content */}
      <div className="flex bg-white dark:bg-gray-900 rounded-md overflow-hidden shadow">
        {/* Left: Task Table */}
        <div className="flex-1">
          <TaskTable
            tasks={completedTasks}
            projects={projects}
            onDelete={onDeleteTask}
            onChangeStatus={onChangeStatus}
            onReorder={onReorder}
            onEdit={handleEditTask}
            onProjectClick={(projectId) => {
              const project = projects.find((p) => p.id === projectId);
              if (project) {
                setActivePage("projectDetail");
              }
            }}
            hideProjectTag={false}
          />
        </div>

        {/* Right: Overview */}
        <TaskOverview
          completed={completed}
          inProgress={inProgress}
          pending={pending}
          user={user}
          tasks={completedTasks}
        />
      </div>

      {/* Empty State */}
      {completedTasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No completed tasks yet. Finish some tasks to see them here ✅
        </div>
      )}
    </div>
  );
}
