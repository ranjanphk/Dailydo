import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TaskComposer from '../components/TaskComposer';
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  const addTask = (taskText) => {
    setTasks((prev) => [...prev, { text: taskText, id: Date.now() }]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-20 flex flex-col items-center justify-center bg-slate-500 text-white fixed left-0 top-0 bottom-0">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col ml-20 relative">
        <Topbar user={user} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6 pb-28">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          {tasks.length === 0 && (
            <p className="text-gray-500">No tasks yet. Add one below.</p>
          )}
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="bg-white rounded shadow p-3 border"
              >
                {task.text}
              </li>
            ))}
          </ul>
        </main>

        {/* Composer bar at bottom */}
        <div className="flex justify-center">
          <TaskComposer user={user} onAddTask={addTask} /></div>'
        
      </div>
    </div>
  );
}
