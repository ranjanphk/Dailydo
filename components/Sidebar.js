import { LucideBookTemplate, LucideChartBar, LucideClipboardCheck, LucideFolder, LucideHome, LucidePlus } from 'lucide-react';

const Sidebar = ({ onTasksClick }) => {

  const navigate = (url) => {
    window.location.href = url;
  };  
  
  return (
    <aside className="w-20 h-auto py-6 fixed bg-white shadow-lg flex flex-col items-center justify-center gap-8 rounded-xl p-4">
      {/* Create */}
      {/* <button 
      
      onClick={() => navigate('/dashboard')} // <-- click handler on button
      
      className="text-gray-600 hover:text-indigo-600 flex flex-col items-center">


        <LucideHome size={24} />
        <span className="text-xs mt-1">Dashboard
        </span>
      </button> */}

      {/* Daily Task */}
      <button
        onClick={onTasksClick}
        className="text-white bg-indigo-500 p-3 rounded-xl flex flex-col items-center shadow-md hover:bg-indigo-600"
      >
        <LucideClipboardCheck size={16} />
        <span className="text-xs mt-1">Tasks</span>
      </button>
       {/* Projects */}
      <button
        onClick={onTasksClick}
        className="text-gray-600 hover:text-indigo-600 flex flex-col items-center"
      >
        <LucideFolder size={16} />
        <span className="text-xs mt-1">Projects</span>
      </button>
             {/* Templates */}
      <button
        onClick={onTasksClick}
        className="text-gray-600 hover:text-indigo-600 flex flex-col items-center"
      >
        <LucideBookTemplate size={16} />
        <span className="text-xs mt-1">Templates</span>
      </button>
      
    </aside>
  );
};

export default Sidebar;
