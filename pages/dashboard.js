import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TaskTable from '../components/TaskTable';
import TaskOverview from '../components/TaskOverview';
import TaskComposer from '../components/TaskComposer';
import Profile from '../components/Profile';
import { where, writeBatch } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import { db } from "../lib/firebase";
import {
  addDoc, collection, onSnapshot, orderBy, query,
  serverTimestamp, updateDoc, doc, deleteDoc
} from "firebase/firestore";

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("tasks"); // "tasks" or "profile"
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Listen to tasks collection
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("order", "asc") // ✅ ASC for natural order
    );

    const unsub = onSnapshot(q, (snap) => {
      setTasks(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            title: data.title || "",
            status: data.status || "In Progress",
            userId: data.userId,
            createdAt: data.createdAt?.toDate?.() || new Date(),
            avatarUrl: data.avatarUrl || null,
            order: data.order ?? 0, // ✅ include order
          };
        })
      );
    });

    return unsub;
  }, [user]);

  // Compute task counts
  const { completed, inProgress, pending } = useMemo(() => ({
    completed: tasks.filter(t => t.status === "Completed").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    pending: tasks.filter(t => t.status === "Pending").length,
  }), [tasks]);

  // handle drag reorder
  const handleReorder = async (reorderedSlice, startIndex) => {
    const updated = [...tasks];
    for (let i = 0; i < reorderedSlice.length; i++) {
      updated[startIndex + i] = reorderedSlice[i];
    }
    setTasks(updated);

    // 🔥 persist to Firestore
    const batch = writeBatch(db);
    updated.forEach((task, index) => {
      if (task.order !== index) { // ✅ only update changed ones
        const taskRef = doc(db, "tasks", task.id);
        batch.update(taskRef, { order: index });
      }
    });
    await batch.commit();
  };

  // add task
  const addTask = async (text) => {
    if (!user) return;

    // ✅ compute next order safely
    const maxOrder = tasks.length > 0 ? Math.max(...tasks.map(t => t.order ?? 0)) : -1;

    await addDoc(collection(db, "tasks"), {
      title: text,
      status: "In Progress",
      userId: user.uid,
      createdAt: serverTimestamp(),
      order: maxOrder + 1,
    });
  };

  const changeStatus = async (task, next) => {
    await updateDoc(doc(db, "tasks", task.id), { status: next });
  };

  const deleteTask = async (task) => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const handleProfileSave = () => {
    setView("tasks");
  };

  return (
    <div className="flex h-screen bg-gray-100 w-screen">
      <div className="w-20 flex flex-col items-center justify-center bg-slate-500 text-white absolute top-1/2 left-4">
        <Sidebar onTasksClick={() => setActiveSection("dashboard")} />
      </div>

      <div className="flex-1 flex flex-col w-screen">
        <Topbar
          className="flex fixed top-0 w-screen"
          user={user}
          onProfileClick={() => setView("profile")}
          logout={logout}
        />

        <main className="flex-1 overflow-y-auto p-6 pb-32">
          {view === "tasks" && (
            <div className="mx-auto max-w-6xl flex gap-6">
              <div className="flex-1">
                <TaskTable
                  tasks={tasks}
                  onDelete={deleteTask}
                  onChangeStatus={changeStatus}
                  onReorder={handleReorder}  // ✅ reorder works
                />
              </div>
              <TaskOverview
                completed={completed}
                inProgress={inProgress}
                pending={pending}
              />
            </div>
          )}

          {view === "profile" && (
            <div className="mx-auto max-w-2xl">
              <Profile user={user} onSave={handleProfileSave} />
            </div>
          )}
        </main>

        {view === "tasks" && (
          <TaskComposer user={user} onCreate={addTask} />
        )}
      </div>
    </div>
  );
}
