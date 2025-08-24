import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TaskTable from '../components/TaskTable';
import TaskOverview from '../components/TaskOverview';
import TaskComposer from '../components/TaskComposer';

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { db } from "../lib/firebase";
import {
  addDoc, collection, onSnapshot, orderBy, query,
  serverTimestamp, updateDoc, doc, deleteDoc
} from "firebase/firestore";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  // Subscribe to tasks (ALL users). To see only yours, add where("userId","==",user.uid)
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map(d => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title,
          status: data.status || "In Progress",
          userId: data.userId,
          createdAt: data.createdAt?.toMillis?.() || Date.now(),
          avatarUrl: data.avatarUrl || null,
        };
      });
      setTasks(items);
    });
    return unsub;
  }, [user]);

  if (loading) return <p>Loading...</p>;

  // Add task (from composer)
  const addTask = async (text) => {
    await addDoc(collection(db, "tasks"), {
      title: text,
      status: "In Progress",     // default
      userId: user.uid,
      createdAt: serverTimestamp(),
    });
  };

  // Change status inline
  const changeStatus = async (task, next) => {
    await updateDoc(doc(db, "tasks", task.id), { status: next });
  };

  // Delete
  const deleteTask = async (task) => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  // Counts for overview
  const { completed, inProgress, pending } = useMemo(() => ({
    completed: tasks.filter(t => t.status === "Completed").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    pending:   tasks.filter(t => t.status === "Pending").length,
  }), [tasks]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (fixed) */}
      <div className="w-20 flex flex-col items-center justify-center bg-slate-500 text-white fixed left-0 top-0 bottom-0">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col ml-20">
        <Topbar user={user} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 pb-32">
          <div className="mx-auto max-w-6xl flex gap-6">
            {/* Table */}
            <div className="flex-1">
              <TaskTable
                tasks={tasks}
                onDelete={deleteTask}
                onChangeStatus={changeStatus}
              />
            </div>

            {/* Performance Overview */}
            <TaskOverview completed={completed} inProgress={inProgress} pending={pending} />
          </div>
        </main>

        {/* Fixed bottom composer (ChatGPT-style) */}
        <TaskComposer user={user} onCreate={addTask} />
      </div>
    </div>
  );
}
