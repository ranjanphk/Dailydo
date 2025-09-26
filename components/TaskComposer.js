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
            className="flex-1 border rounded-xl px-4 py-3 pr-16 focus:outline-none w-full shadow-lg resize-none overflow-hidden relative z-10"
          />

                    
              {/* ✅ Hints go here */}
              <div className="absolute left-2 -bottom-5 text-xs text-gray-500">
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
                  className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-1 text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setValue(currentProject ? `#${currentProject.title} ` : "");
                  }}
                  className="bg-gray-300 text-gray-800 rounded-lg px-3 py-1 text-sm"
                >
                  Cancel
                </button>
              </> 
            ) : (
              <button
                onClick={send}
                className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-1 text-sm"
              >
                {type === "project" ? "Create Project" : "Add"}
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
