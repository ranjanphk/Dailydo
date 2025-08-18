import {
  LucideClipboardCheck,
  LucideFolder,
  LucideLayoutDashboard,
  LucideTimer,
  LucidePlus,
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="justify-center w-20 h-1 bg-white shadow-lg rounded-xl flex flex-col items-center py-4 gap-6 center bg-gray-50">
      <button className="text-gray-600 hover:text-indigo-600 flex flex-col items-center">
        <LucidePlus />
        <span className="text-xs mt-1">Create</span>
      </button>
      <button className="text-white bg-indigo-500 p-2 rounded-xl flex flex-col items-center">
        <LucideClipboardCheck />
        <span className="text-xs mt-1">Daily Task</span>
      </button>
      <button className="text-gray-600 hover:text-indigo-600 flex flex-col items-center">
        <LucideFolder />
        <span className="text-xs mt-1">Projects</span>
      </button>
      <button className="text-gray-600 hover:text-indigo-600 flex flex-col items-center">
        <LucideLayoutDashboard />
        <span className="text-xs mt-1">Overview</span>
      </button>
      <button className="text-gray-600 hover:text-indigo-600 flex flex-col items-center">
        <LucideTimer />
        <span className="text-xs mt-1">Estimate</span>
      </button>
    </aside>
  );
};

export default Sidebar;
