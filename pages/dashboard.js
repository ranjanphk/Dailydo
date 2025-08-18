// pages/dashboard.js
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import MainContent from '../components/MainContent';
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { logout } from "../lib/auth";

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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <MainContent />
        <div className="text-center mb-6">
          <h1 className="text-xl font-medium">Dashboard Coming soon, {user?.email}</h1>
          <button
            onClick={logout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
