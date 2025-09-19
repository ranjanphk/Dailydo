import TaskTable from "./TaskTable";
import TaskOverview from "./TaskOverview";
import TaskComposer from "./TaskComposer";

export default function ProjectDetail({ project, user, tasks, onCreateTask, onUpdateTask, onDeleteTask, onChangeStatus, onReorder, editingTask }) {
  if (!project) return <p className="text-gray-500">No project selected</p>;

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
            tasks={tasks}
            onDelete={onDeleteTask}
            onChangeStatus={onChangeStatus}
            onReorder={onReorder}
            onEdit={onUpdateTask}
          />
        </div>

        {/* Right: Overview */}
        <TaskOverview
          completed={tasks.filter(t => t.status === "Completed").length}
          inProgress={tasks.filter(t => t.status === "In Progress").length}
          pending={tasks.filter(t => t.status === "Pending").length}
        />
      </div>

      {/* Composer */}
      <TaskComposer
        user={user}
        onCreate={onCreateTask}
        editingTask={editingTask}
        onUpdate={onUpdateTask}
      />
    </div>
  );
}
