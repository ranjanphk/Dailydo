// pages/projects.js
import { PlusCircle } from "lucide-react";
import ProjectCard from "../components/ProjectCard";


export default function Projects({ projects, setActiveProject, tasks, setActivePage, onDelete }) {


  return (
    <div className="flex flex-col h-full">
      {/* Empty State */}
      {!projects?.length ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center">
          <div className="
          bg-gray-50 rounded-2xl dark:bg-gray-900 border-2
          dark:border-gray-800-gray-200 
          dark:border-gray-800-gray-200-dashed dark:border-gray-800 border 
          border-gray-100 dark:border-gray-800-gray-200-gray-300 
          p-10 max-w-md w-full shadow-sm
          
          ">
            <PlusCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              No Projects Yet
            </h2>
            <p className="text-gray-500 dark:text-gray-100">
              Start by creating your first project.  
              Type <span className="font-mono text-blue-600">/p ProjectName</span> below.
            </p>
          </div>
        </div>
      ) : (
        /* Projects Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 flex-1 overflow-auto">
          {projects.map((project) => {
            // 👇 define projectTasks inside map, so no scope issues
            const projectTasks = tasks.filter(
              (t) => String(t.projectId) === String(project.id)
              
            );

            return (
              <ProjectCard
                key={project.id}
                project={{ ...project, tasks: projectTasks }} // 👈 safe
                onSelect={() => {
                  setActiveProject(project)
                  setActivePage("projectDetail")   
                  
                  
                
                }}
                onDelete={(projectId, projectTasks) => onDelete(projectId, projectTasks)}

              />
            );
          })}
        </div>
      )}
    </div>
  );
}
