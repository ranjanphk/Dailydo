import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TaskTable from '../components/TaskTable';
import TaskOverview from '../components/TaskOverview';
import TaskComposer from '../components/TaskComposer';
import Profile from '../components/Profile';
import Projects from '../components/Projects';  
import ProjectCard from '../components/ProjectCard';  
import ProjectDetail from '../components/ProjectDetail';
import { where, writeBatch } from "firebase/firestore";
import { LucidePlus } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { use, useEffect, useMemo, useState } from "react";

import { db } from "../lib/firebase";
import {
  addDoc, collection, onSnapshot, orderBy, query,
  serverTimestamp, updateDoc, doc, deleteDoc
} from "firebase/firestore";
import { create } from 'framer-motion/client';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [activePage, setActivePage] = useState("tasks"); // "tasks", "profile", "projects"
  const [editingTask, setEditingTask] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);


  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Listen to tasks collection
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("order", "desc") // highest order → top
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



  // Listen to projects collection
 useEffect(() => {
  if (!user) return;

          const q = query(
            collection(db, "projects"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc")
          );

          const unsub = onSnapshot(q, (snap) => {
            setProjects(
              snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
              }))
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
    const newOrders = updated.length;
      updated.forEach((task, index) => {
        const newOrder = newOrders - index; // highest order → top
        if (task.order !== newOrder) { // ✅ only update changed ones
          const taskRef = doc(db, "tasks", task.id);
          batch.update(taskRef, { order: newOrder });
        }
      });
    await batch.commit();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
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
      order: maxOrder + 1, //
    });
  };

// add project (skeleton function, implement as needed)
const addProject = async (title) => {
  if (!user) return;

  await addDoc(collection(db, "projects"), {
    title,
    userId: user.uid,
    createdAt: serverTimestamp(),
    totaltasks: 0,
    completedtasks: 0,
  });
}



  const changeStatus = async (task, next) => {
    await updateDoc(doc(db, "tasks", task.id), { status: next });
  };

  const deleteTask = async (task) => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const updateTask = async (task) => {

    if (!user) return;

    // ✅ compute next order safely
    const maxOrder = tasks.length > 0 ? Math.max(...tasks.map(t => t.order ?? 0)) : 0;
    await updateDoc(doc(db, "tasks", task.id), { 
      
      title: task.title,
      createdAt: serverTimestamp(),
      order:maxOrder +1,

    });
  
    setEditingTask(null); // exit editing mode after update
  }

 // ✅ Sidebar click handlers
  const handleProfileClick = () => setActivePage("profile");
  const handleProjectsClick = () => setActivePage("projects");
  const handleTasksClick = () => setActivePage("tasks");
  const handleProfileSave = (updatedUser) => {
    // Implement profile save logic here
    console.log("Profile saved:", updatedUser);
    setActivePage("tasks"); // Go back to tasks after saving profile
  }



  return (
    <div className="flex h-screen bg-gray-100 w-screen">
      <div className="w-20 flex flex-col items-center justify-center bg-slate-500 text-white absolute top-1/2 left-4">
        <Sidebar 
        activePage = {activePage}
        onTasksClick={handleTasksClick}
        onProjectsClick={handleProjectsClick} />
      </div>

      <div className="flex-1 flex flex-col w-screen">
        <Topbar
          className="flex fixed top-0 w-screen"
          user={user}
          onProfileClick={() => setActivePage("profile")}
          logout={logout}
        />

        <main className="flex-1 overflow-y-auto p-6 pb-32">
          {activePage === "tasks" && (
            <div className="mx-auto max-w-6xl flex gap-6">
              <div className="flex-1">
                <TaskTable
                  tasks={tasks}
                  onDelete={deleteTask}
                  onChangeStatus={changeStatus}
                  onReorder={handleReorder}  // ✅ reorder works
                  onEdit={handleEditTask}  // ✏️ edit works
                />
              </div>
              <TaskOverview
                completed={completed}
                inProgress={inProgress}
                pending={pending}
              />
            </div>
          )}

          {activePage === "profile" && (
            <div className="mx-auto max-w-2xl">
              <Profile user={user} onSave={handleProfileSave} />
            </div>
          )}

          {activePage === "projects" && (
            <div className="mx-auto max-w-6xl">
              <div className="flex justify-between items-center mb-4">

                <Projects 
                  projects={projects} 
                  setActiveProject={setActiveProject} 
                  setActivePage={setActivePage}  
                  
                
                />  
            </div>
            </div>
          )}




          {/* Project Detail Page */}
          {activePage === "projectDetail" && (
            <div className="mx-auto max-w-6xl">
              <ProjectDetail
                  project={activeProject}
                  user={user}
                  tasks={tasks.filter(t => t.projectId === activeProject.id)} // temporary filter
                  onCreateTask={addTask}
                  onUpdateTask={updateTask}
                  onDeleteTask={deleteTask}
                  onChangeStatus={changeStatus}
                  onReorder={handleReorder}
                  editingTask={editingTask}
                  onEdit={handleEditTask}  // ✏️ edit works
              />
              </div>
          )}

        </main>

    {/* TaskComposer (always visible, floating bottom-center) */}
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full px-4">
      <TaskComposer
        user={user}
        onCreate={(newItem) => {
          if (newItem.type === "project") {
            addProject(newItem.title);
          } else {
            addTask(newItem.title);
          }
        }}
        editingTask={editingTask}
        onUpdate={updateTask}
      />
    </div>
      </div>
    </div>
  );
}
