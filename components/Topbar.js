  import { useState } from "react";
  import { Search, Bell } from "lucide-react"; // Example icons, replace with yours
  import { ChartPie } from "lucide-react";  
  import { useTheme } from "next-themes";

  const Topbar = ({ user, onProfileClick, logout }) => {
    const { theme, setTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    // Get first letter of user's name or fallback
    const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
      <header className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-sm relative w-screen">
                <h1
            className="text-2xl font-bold text-indigo-600 cursor-pointer flex items-center gap-2"
            onClick={() => window.location.reload()}
          >

            DailyDo
              </h1>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="dark:border-gray-800 border border-gray-300 dark:border-gray-800-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button className="p-2 hover:bg-gray-100 dark:bg-gray-800 rounded">
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Theme Toggle */
              <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>}

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 dark:bg-gray-800 rounded">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold focus:outline-none"
            >
                {user?.email ? user.email.charAt(0).toUpperCase() : "U"}
            </button>


            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 dark:border-gray-800-gray-200 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200-gray-200 rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onProfileClick();
                  }}
                  
                  className="w-full px-4 py-2 text-left text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:bg-gray-800 rounded-t-lg"
                >
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:bg-gray-800 rounded-b-lg"
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
