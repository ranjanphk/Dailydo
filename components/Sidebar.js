import { LucideBookTemplate, LucideBriefcase, LucideChartBar, LucideClipboardCheck, LucideFolder, LucideHistory, LucideHome, LucideNotebook, LucidePlus } from 'lucide-react';

const Sidebar = ({activePage, onTasksClick, onProjectsClick, onOverviewClick, onHistoryClick }) => {
  
  return (
    <aside className="w-24 h-auto py-6 fixed bg-white dark:bg-gray-900 shadow-lg flex flex-col items-center justify-center gap-8 rounded-xl p-4">


      {/* Daily Task */}
      <button
        onClick={onTasksClick}
        className={`text-gray-600 dark:text-gray-300 hover:text-indigo-600 flex flex-col items-center w-8 cursor-pointer
        ${activePage === 'tasks' ? 'hover:text-white text-white bg-indigo-500 p-3 w-full rounded-xl flex flex-col items-center shadow-md hover:bg-indigo-600' : ''}`}
      >
        <LucideClipboardCheck size={16} />
        <span className="text-xs mt-1">Today</span>
      </button>
       {/* Projects */}
      <button
        onClick={onProjectsClick}
        className={`text-gray-600 dark:text-gray-300 hover:text-indigo-600 flex flex-col items-center w-8 cursor-pointer
        ${activePage === 'projects' ? 'hover:text-white text-white bg-indigo-500 p-3 w-full rounded-xl flex flex-col items-center shadow-md hover:bg-indigo-600' : ''}`}
      >
        <LucideBriefcase size={16} />
        <span className="text-xs mt-1">Projects</span>
      </button>
    
    
      {/* Overview */}

      <button
        onClick={onOverviewClick}
        className={`text-gray-600 dark:text-gray-300 hover:text-indigo-600 flex flex-col items-center w-8 cursor-pointer
        ${activePage === 'overview' ? 'hover:text-white text-white bg-indigo-500 p-3 w-full rounded-xl flex flex-col items-center shadow-md hover:bg-indigo-600' : ''}`}
      >
        <LucideChartBar size={16} />
        <span className="text-xs mt-1">Overview</span>
      </button>

          
      {/* Overview */}

      <button
        onClick={onHistoryClick}
        className={`text-gray-600 dark:text-gray-300 hover:text-indigo-600 flex flex-col items-center w-8 cursor-pointer
        ${activePage === 'history' ? 'hover:text-white text-white bg-indigo-500 p-3 w-full rounded-xl flex flex-col items-center shadow-md hover:bg-indigo-600' : ''}`}
      >
        <LucideHistory size={16} />
        <span className="text-xs mt-1">Completed</span>
      </button>

      
    </aside>
  );
};

export default Sidebar;
