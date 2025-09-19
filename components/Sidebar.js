import { LucideBookTemplate, LucideBriefcase, LucideChartBar, LucideClipboardCheck, LucideFolder, LucideHome, LucideNotebook, LucidePlus } from 'lucide-react';

const Sidebar = ({activePage, onTasksClick, onProjectsClick }) => {
  
  return (
    <aside className="w-20 h-auto py-6 fixed bg-white shadow-lg flex flex-col items-center justify-center gap-8 rounded-xl p-4">


      {/* Daily Task */}
      <button
        onClick={onTasksClick}
        className={`text-gray-600 hover:text-indigo-600 flex flex-col items-center w-8 cursor-pointer
        ${activePage === 'tasks' ? 'hover:text-white text-white bg-indigo-500 p-3 w-full rounded-xl flex flex-col items-center shadow-md hover:bg-indigo-600' : ''}`}
      >
        <LucideClipboardCheck size={16} />
        <span className="text-xs mt-1">Tasks</span>
      </button>
       {/* Projects */}
      <button
        onClick={onProjectsClick}
        className={`text-gray-600 hover:text-indigo-600 flex flex-col items-center w-8 cursor-pointer
        ${activePage === 'projects' ? 'hover:text-white text-white bg-indigo-500 p-3 w-full rounded-xl flex flex-col items-center shadow-md hover:bg-indigo-600' : ''}`}
      >
        <LucideBriefcase size={16} />
        <span className="text-xs mt-1">Projects</span>
      </button>
             {/* Templates */}
      <button
        onClick={onTasksClick}
        className="text-gray-600 hover:text-indigo-600 flex flex-col items-center"
      >
        <LucideNotebook size={16} />
        <span className="text-xs mt-1">Templates</span>
      </button>
      
    </aside>
  );
};

export default Sidebar;
