import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function TaskComposer({
  user,
  onCreate,
  onUpdate,
  editingTask,
  setEditingTask,
  currentProject,
  projects,
  type = "task",
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);
  const router = useRouter();

  // Prefill input when editing or in a project
 useEffect(() => {
  if (editingTask) {
    setValue(editingTask.title);
  } else {
    setValue(""); // ✅ no #project prefill
  }
}, [editingTask, currentProject]);

  // Auto-height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  // Clear when navigating away
  useEffect(() => {
    const handleRouteChange = () => {
      setValue("");
      setEditingTask?.(null);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, setEditingTask]);

  if (!user) return null;

const send = () => {
  const text = value.trim();
  if (!text) return;

  // 1. Update existing
  if (editingTask) {
    onUpdate?.({ ...editingTask, title: text });
    setEditingTask?.(null);
    setValue("");
    return;
  }

  // 2. Create Project with /p
  if (text.startsWith("/p ")) {
    const projectTitle = text.slice(3).trim();
    if (projectTitle) onCreate?.({ type: "project", title: projectTitle });
    setValue("");
    return;
  }

  // 3. If inside a project → force projectId
  if (currentProject) {
    onCreate?.({ type, title: text.replace(/^#\w+\s+/, ""), projectId: currentProject.id });
    setValue("");
    return;
  }

  // 4. If outside project → parse #Project
  const match = text.match(/^#(\w+)\s+(.*)$/);
  if (match) {
    const [, projectName, taskText] = match;
    const project = projects.find(
      (p) => p.title.toLowerCase() === projectName.toLowerCase()
    );
    onCreate?.({
      type,
      title: taskText,
      projectId: project?.id || null,
    });
  } else {
    // General task
    onCreate?.({ type, title: text, projectId: null });
  }

  setValue("");
};


  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-0 left-20 right-0">
      <div className="mx-auto w-1/2 p-4 flex items-end gap-2">
        <div className="relative flex-1 vertical-align-middle">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              type === "project"
                ? "Type a Project Name and press Enter… (Shift+Enter for newline)"
                : "Type a Task and press Enter…"
            }
            className={`
                  w-full px-4 py-4 pr-32 rounded-xl border border-gray-100 dark:border-gray-800
                  bg-white dark:bg-gray-900 shadow-lg resize-none overflow-hidden
                  focus:outline-none focus:ring-2 focus:ring-indigo-400
                  text-gray-900 dark:text-gray-100
                  flex
                  ${editingTask ? "pr-48" : "pr-32"}  /* adjust right padding based on buttons */
                `}
          >

          </textarea>
                    
              {/* ✅ Hints go here */}
              <div className="absolute left-2 -bottom-7 text-xs text-gray-500 dark:text-gray-100">
                {value.startsWith("/p") ? (
                  <span>💡 Press Enter to create a new project</span>
                ) : value.startsWith("#") ? (
                  <span>💡 Type a project name after <code>#</code> to assign task</span>
                ) : (
                  <span>💡 Hint: Use <code>/p</code> <b>ProjectTitle</b> to create a project, or <code><b>#Project</b> Task</code> to assign</span>
                )}
              </div>

          {/* Buttons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2 z-20">
            {editingTask ? (
              <>
                <button
                  onClick={send}
                  className=" text-white rounded-lg px-3 py-1 text-sm
                  from-indigo-600 to-purple-600 bg-gradient-to-r 
                   hover:from-indigo-700 hover:to-purple-700 focus:ring-4
                    focus:ring-indigo-300 dark:focus:ring-indigo-800 flex items-center gap-1                
                  "
                >
                  Update
                 <i class="fa-solid fa-arrow-up px-1"></i>
                </button>
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setValue(currentProject ? `#${currentProject.title} ` : "");
                  }}
                  className="bg-gray-600 text-gray-100 dark:text-gray-100 rounded-lg px-5 py-2 text-sm"
                >
                  Cancel
                </button>
              </> 
            ) : (
              <button
                onClick={send}
                className=" text-white rounded-lg px-5 py-2 text-sm
                  from-indigo-600 to-purple-600 bg-gradient-to-r 
                   hover:from-indigo-700 hover:to-purple-700 focus:ring-4
                    focus:ring-indigo-300 dark:focus:ring-indigo-800 flex items-center gap-1
                "
              >
                {type === "project" ? "Create Project" : "Add"}
                <i class="fa-solid fa-plus px-2"></i>
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
