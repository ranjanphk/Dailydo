import { useState } from "react";
import { LucideSearch, LucideSettings, LucideBell } from "lucide-react";
import Image from "next/image";
import { logout } from "../lib/auth";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm relative">
      {/* Brand */}
      <h1 className="text-2xl font-bold text-indigo-600">Heymate</h1>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <LucideSearch size={20} />
        </button>

        {/* Settings */}
        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
          <LucideSettings size={20} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
            <LucideBell size={20} />
          </button>
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="focus:outline-none"
          >
            <Image
              src="/images/avatar.png"
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full border-2 border-purple-500"
            />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
              <button
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
