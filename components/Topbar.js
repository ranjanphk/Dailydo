import { useState } from "react";
import { Search, Bell } from "lucide-react"; // Example icons, replace with yours

const Topbar = ({ user, onProfileClick, logout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get first letter of user's name or fallback
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm relative">
      <h1 className="text-2xl font-bold text-indigo-600">Heymate</h1>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button className="p-2 hover:bg-gray-100 rounded">
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 rounded">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-purple-500 text-white font-semibold focus:outline-none"
          >
            {initial}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onProfileClick();
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-t-lg"
              >
                Profile
              </button>
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 rounded-b-lg"
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
