import { useMemo } from "react";
import TaskTable from "./TaskTable";
import TaskOverview from "./TaskOverview";
import { Pencil } from "lucide-react";
import {doc, updateDoc} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useState } from "react";

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

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(project.title);

  const handleSave = async () => {
  if (!title.trim()) return;
  await updateDoc(doc(db, "projects", project.id), { title });
  setIsEditing(false);
  };


  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-6">
      {/* Project Header */}
      <div>
        <div className="flex items-center gap-2">
  {isEditing ? (
    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSave()}
      className="rounded px-2 py-1 text-sm font-semibold border-0"
      autoFocus
    />
  ) : (
    <h1 className="text-xl font-semibold">{title}</h1>
  )}

  {!isEditing && (
    <button
      onClick={() => setIsEditing(true)}
      className="text-gray-500 hover:text-gray-700"
    >
      <Pencil size={18} />
    </button>
  )}

  {isEditing && (
    <button
      onClick={handleSave}
      className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
    >
      Save
    </button>
  )}
</div>

        <p className="text-gray-500">{project.description}</p>
      </div>

      <div className="flex bg-white rounded-md overflow-hidden shadow">
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
            handleEditTask={handleEditTask}
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
