import { useMemo } from "react";
import TaskTable from "./TaskTable";
import TaskOverview from "./TaskOverview";

export default function ProjectDetail({
  project,
  user,
  tasks,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onChangeStatus,
  onReorder,
  editingTask,
  handleEditTask
}) {
  if (!project) return <p className="text-gray-500">No project selected</p>;

  const projectTasks = useMemo(() => {
    if (!project || !tasks) return [];
    return tasks.filter(t => String(t.projectId) === String(project.id));
  }, [tasks, project]);

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-6">
      {/* Project Header */}
      <div>
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <p className="text-gray-500">{project.description}</p>
      </div>

      <div className="flex gap-6">
        {/* Left: Task Table */}
        <div className="flex-1">
          <TaskTable
            tasks={projectTasks}
            onDelete={onDeleteTask}
            onChangeStatus={onChangeStatus}
            onReorder={onReorder}
            onEdit={handleEditTask}
            onCreateTask={(task) => onCreateTask({ ...task, projectId: project.id })}
            editingTask={editingTask}
            user={user}
            onUpdateTask={onUpdateTask}
          />
        </div>

        {/* Right: Overview */}
        <TaskOverview
          completed={projectTasks.filter(t => t.status === "Completed").length}
          inProgress={projectTasks.filter(t => t.status === "In Progress").length}
          pending={projectTasks.filter(t => t.status === "Pending").length}
        />
      </div>
    </div>
  );
}
