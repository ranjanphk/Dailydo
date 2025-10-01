import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TaskTable from '../components/TaskTable';
import Overview from '../components/Overview';
import TaskOverview from '../components/TaskOverview';
import TaskComposer from '../components/TaskComposer';
import Profile from '../components/Profile';
import Projects from '../components/Projects';  
import ProjectDetail from '../components/ProjectDetail';
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, updateDoc, doc, deleteDoc, writeBatch, where } from "firebase/firestore";


export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [activePage, setActivePage] = useState("tasks"); 
  const [editingTask, setEditingTask] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  // Listen to tasks
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid),
      orderBy("order", "desc")
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
            order: data.order ?? 0,
            projectId: data.projectId || null,
          };
        })
      );
    });

    return unsub;
  }, [user]);


  // chart Data
  const chartData = useMemo(() => {
  const grouped = {};

  tasks.forEach(task => {
    if (!task.createdAt) return;

    const dateKey = task.createdAt.toISOString().split("T")[0]; // YYYY-MM-DD

    if (!grouped[dateKey]) {
      grouped[dateKey] = { 
        date: dateKey, 
        completed: 0, 
        inProgress: 0, 
        pending: 0 
      };
    }

    if (task.status === "Completed") grouped[dateKey].completed += 1;
    else if (task.status === "In Progress") grouped[dateKey].inProgress += 1;
    else if (task.status === "Pending") grouped[dateKey].pending += 1;
  });

  // return array sorted by date
  return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
}, [tasks]);



  // Listen to projects
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

  // Task counts
  const { completed, inProgress, pending } = useMemo(() => ({
    completed: tasks.filter(t => t.status === "Completed").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
    pending: tasks.filter(t => t.status === "Pending").length,
  }), [tasks]);

  // Reorder
  const handleReorder = async (reorderedSlice, startIndex) => {
    const updated = [...tasks];
    for (let i = 0; i < reorderedSlice.length; i++) {
      updated[startIndex + i] = reorderedSlice[i];
    }
    setTasks(updated);

    const batch = writeBatch(db);
    const newOrders = updated.length;
    updated.forEach((task, index) => {
      const newOrder = newOrders - index;
      if (task.order !== newOrder) {
        batch.update(doc(db, "tasks", task.id), { order: newOrder });
      }
    });
    await batch.commit();
  };

// handleoverviewclick
  


  // handleprojectdelete

  const handleDeleteProject = async (projectId, projectTasks) => {
  if (projectTasks.length > 0) {
    alert("Cannot delete a project with tasks!");
    return;
  }

  try {
    // Delete project document
    await deleteDoc(doc(db, "projects", projectId));

    // Update local state
    setProjects(prev => prev.filter(p => p.id !== projectId));
  } catch (error) {
    console.error("Error deleting project:", error);
    alert("Failed to delete project");
  }
};
  // Edit task

  const handleEditTask = (task) => setEditingTask(task);

  // Add task
  const addTask = async (text, projectId = null) => {
    if (!user) return;
    const maxOrder = tasks.length > 0 ? Math.max(...tasks.map(t => t.order ?? 0)) : -1;

    await addDoc(collection(db, "tasks"), {
      title: text,
      status: "In Progress",
      userId: user.uid,
      createdAt: serverTimestamp(),
      order: maxOrder + 1,
      projectId: projectId || null,
    });
  };

  // Add project
  const addProject = async (title) => {
    if (!user) return;
    await addDoc(collection(db, "projects"), {
      title,
      userId: user.uid,
      createdAt: serverTimestamp(),
      totaltasks: 0,
      completedtasks: 0,
    });
  };

  const changeStatus = async (task, next) => {
    await updateDoc(doc(db, "tasks", task.id), { status: next });
  };

  const deleteTask = async (task) => {
    await deleteDoc(doc(db, "tasks", task.id));
  };

  const updateTask = async (task) => {
    if (!user) return;
    const maxOrder = tasks.length > 0 ? Math.max(...tasks.map(t => t.order ?? 0)) : 0;
    await updateDoc(doc(db, "tasks", task.id), { 
      title: task.title,
      createdAt: serverTimestamp(),
      order: maxOrder + 1,
    });
    setEditingTask(null);
  };

  // Sidebar click handlers
  const handleProfileClick = () => setActivePage("profile");
  const handleProjectsClick = () => setActivePage("projects");
  const handleOverviewClick = () => setActivePage("overview");
  const handleTasksClick = () => setActivePage("tasks");
  const handleProfileSave = (updatedUser) => {
    console.log("Profile saved:", updatedUser);
    setActivePage("tasks");
  };

  return (
    <div className="flex h-screen bg-gray-100 w-screen">
      <div className="w-24 flex flex-col items-center justify-center bg-slate-500 text-white absolute top-1/2 left-8">
        <Sidebar 
          activePage={activePage}
          onTasksClick={handleTasksClick}
          onProjectsClick={handleProjectsClick} 
          onOverviewClick={handleOverviewClick}
        />
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
            <div className="mx-auto max-w-6xl flex bg-white rounded-md overflow-hidden shadow">
              <div className="flex-1">
                <TaskTable
                  tasks={tasks}
                  onDelete={deleteTask}
                  onChangeStatus={changeStatus}
                  onReorder={handleReorder}
                  onEdit={handleEditTask}
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
              <Projects 
                projects={projects} 
                setActiveProject={setActiveProject} 
                setActivePage={setActivePage}  
                tasks={tasks}
                setProjects={setProjects}
                onDelete={(projectId, projectTasks) => handleDeleteProject(projectId, projectTasks)}
              />  
            </div>
          )}

          {/* Overview Page */}
          {activePage === "overview" && (
            <div className="mx-auto max-w-6xl">
              <Overview
              setActivePage={setActivePage}
              Overview={Overview}
              chartData={chartData}
              tasks={tasks}     
              />
            </div>
          )}

          {activePage === "projectDetail" && (
            <div className="mx-auto max-w-6xl">
              <ProjectDetail
                project={activeProject}
                user={user}
                tasks={tasks} // ✅ pass all tasks
                onCreateTask={addTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onChangeStatus={changeStatus}
                onReorder={handleReorder}
                editingTask={editingTask}
                handleEditTask={handleEditTask}
              />
            </div>
          )}
        </main>

        {/* TaskComposer */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full px-4">
          <TaskComposer
            user={user}
            currentProject={activeProject} // ✅ pass current project
            onCreate={(newItem) => {
              if (newItem.type === "project") {
                addProject(newItem.title);
              } else {
                addTask(newItem.title, activeProject?.id || newItem.projectId);
              }
            }}
            editingTask={editingTask}
            onUpdate={updateTask}
            onCancelEdit={() => setEditingTask(null)}
            setEditingTask={setEditingTask}
          />
        </div>
      </div>
    </div>
  );
}
