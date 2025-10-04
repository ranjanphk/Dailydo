"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Bell } from "lucide-react";
import { useTheme } from "next-themes";

const Topbar = ({ user, onProfileClick, logout, projects, tasks = [], onSelectItem }) => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Only ONE effect to handle outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Handle search
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const projectMatches = projects
      .filter((p) => p.title?.toLowerCase().includes(search.toLowerCase()))
      .map((p) => ({ id: p.id, label: p.title, type: "project" }));

    const taskMatches = tasks
      .filter((t) => t.title?.toLowerCase().includes(search.toLowerCase()))
      .map((t) => ({ id: t.id, label: t.title, type: "task", projectId: t.projectId }));

    setResults([...projectMatches, ...taskMatches]);
  }, [search, projects, tasks]);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-sm relative w-screen">
      <h1
        className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text cursor-pointer"
        onClick={() => window.location.reload()}
      >
        DailyDo
      </h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-800 dark:text-gray-300 absolute left-2 top-1/2 transform -translate-y-1/2 z-10" />
          <input
            type="text"
            placeholder="Search projects or tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border dark:border-gray-800 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64 pl-8 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />

          {results.length > 0 && (
            <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 dark:border-gray-100 rounded shadow-lg max-h-64 overflow-y-auto z-50">
              {results.map((r) => (
                <button
                  key={r.id}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    onSelectItem(r);
                    setSearch(""); // clear search
                  }}
                >
                  {r.type === "project" ? "📁 Project: " : "✅ Task: "} {r.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        )}

        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Profile Menu */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold"
          >
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-lg shadow-lg">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onProfileClick();
                }}
                className="w-full px-4 py-2 text-left text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
              >
                Profile
              </button>
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
