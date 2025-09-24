import { useEffect, useState, useRef } from "react";

export default function TaskComposer({
  user,
  onCreate,
  onUpdate,
  editingTask,
  setEditingTask, // ✅ pass from Dashboard
  currentProject,
  type = "task",
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // Prefill input when editing or in a project
  useEffect(() => {
    if (editingTask) {
      setValue(editingTask.title);
    } else if (currentProject?.title) {
      setValue(`#${currentProject.title} `);
    } else {
      setValue("");
    }
  }, [editingTask, currentProject]);

  // Auto-height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  if (!user) return null;

  const send = () => {
    const text = value.trim();
    if (!text) return;

    // Update existing task
    if (editingTask) {
      onUpdate?.({ ...editingTask, title: text });
      setEditingTask?.(null);
      setValue(currentProject ? `#${currentProject.title} ` : "");
      return;
    }

    // Create project with /p
    if (text.startsWith("/p ")) {
      const projectTitle = text.slice(3).trim();
      if (projectTitle) onCreate?.({ type: "project", title: projectTitle });
      setValue(currentProject ? `#${currentProject.title} ` : "");
      return;
    }

    // Determine projectId
    const projectId = currentProject?.id || null;

    // Create new task
    onCreate?.({ type, title: text, projectId });
    setValue(currentProject ? `#${currentProject.title} ` : "");
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
                : "Type a task and press Enter… (Shift+Enter for newline)"
            }
            className="flex-1 border rounded-xl px-4 py-3 pr-16 focus:outline-none w-full shadow-lg resize-none overflow-hidden relative z-10"
          />

            <button
              onClick={send}
              className="absolute right-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-1 text-sm top-1/2 -translate-y-1/2 z-20"
            >
              {editingTask ? "Update" : type === "project" ? "Create Project" : "Add"}
            </button>
        </div>
      </div>
    </div>
  );
}
