import { LucideClipboardCheck, LucidePlus } from 'lucide-react';

const Sidebar = ({ onTasksClick }) => {
  return (
    <aside className="w-20 h-screen bg-white shadow-lg flex flex-col items-center justify-center gap-8">
      {/* Create */}
      <button className="text-gray-600 hover:text-indigo-600 flex flex-col items-center">
        <LucidePlus size={24} />
        <span className="text-xs mt-1">Create</span>
      </button>

      {/* Daily Task */}
      <button
        onClick={onTasksClick}
        className="text-white bg-indigo-500 p-3 rounded-xl flex flex-col items-center shadow-md hover:bg-indigo-600"
      >
        <LucideClipboardCheck size={24} />
        <span className="text-xs mt-1">Tasks</span>
      </button>
    </aside>
  );
};

export default Sidebar;
