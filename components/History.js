import { useMemo } from 'react';
import TaskTable from './TaskTable';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function History({
  user,
  tasks = [],
  projects = [],
  onDelete,
  onChangeStatus,
  onReorder,
  setActivePage,
  setActiveProject, // ✅ make sure Dashboard passes this prop
}) {
  // change status
  const changeStatus = async (task, next) => {
    await updateDoc(doc(db, 'tasks', task.id), { status: next });
  };

  // delete task
  const deleteTask = async (task) => {
    await deleteDoc(doc(db, 'tasks', task.id));
  };

  // ✅ Filter completed tasks only
  const completedTasks = useMemo(() => tasks.filter((t) => t.status === 'Completed'), [tasks]);

  // ✅ Compute task stats (optional)
  const completed = completedTasks.length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-6">
      <div className="flex bg-white dark:bg-gray-900 rounded-md overflow-hidden shadow">
        <div className="flex-1">
          <TaskTable
            tasks={completedTasks}
            projects={projects}
            onDelete={deleteTask}
            onChangeStatus={changeStatus}
            onReorder={onReorder}
            allowEdit={false}
            onProjectClick={(projectId) => {
              const project = projects.find((p) => p.id === projectId);
              if (project) {
                setActiveProject(project); // ✅ tell Dashboard which project to load
                setActivePage('projectDetail'); // ✅ navigate to project detail
              }
            }}
            hideProjectTag={false}
          />
        </div>
      </div>

      {completedTasks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No completed tasks yet. Finish some tasks to see them here ✅
        </div>
      )}
    </div>
  );
}
