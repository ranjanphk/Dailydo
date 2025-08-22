// pages/dashboard.js
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import TaskComposer from '../components/TaskComposer';
import MainContent from '../components/MainContent';
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - vertically centered */}
      <div className="w-20 flex flex-col items-center justify-center bg-slate-500 text-white fixed left-0 top-0 bottom-0">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col ml-20">
        {/* Topbar with avatar + logout dropdown */}
        <Topbar user={user} />

          <main className="flex-1 overflow-y-auto p-6">
            <MainContent />
              <div className="text-center mt-6">
                  <h1 className="text-xl font-medium">
                    Dashboard Coming soon, {user?.email}
                  </h1>
          </div>

          {/* Task composer fixed at bottom */}
         <div className="absolute bottom-0 left-0 right-0 bg-white border-t shadow-md p-4 max-w-screen-md mx-auto">
            <TaskComposer user={user} />
        </div>
        </main>
      </div>
    </div>
  );
}
