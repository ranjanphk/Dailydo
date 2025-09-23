import { useEffect, useState, useRef } from "react";

export default function TaskComposer({
  user,
  onCreate,
  editingTask,
  onUpdate,
  projects = [],
  type = "task",
}) {
  const [value, setValue] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (editingTask) {
      setValue(editingTask.title);
    } else {
      setValue("");
    }
  }, [editingTask]);

  // Auto-height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  if (!user) return null;

  // Send task/project
  const send = () => {
    const text = value.trim();
    if (!text) return;

    if (editingTask) {
      onUpdate?.({ ...editingTask, title: text });
      setValue("");
      return;
    }

    // Create project with /p
    if (text.startsWith("/p ")) {
      const projectTitle = text.slice(3).trim();
      if (projectTitle) {
        onCreate?.({ type: "project", title: projectTitle });
      }
      setValue("");
      return;
    }

    // Check for #project tag
    let projectId = null;
    const tagMatch = text.match(/#(\w+)/g);
    if (tagMatch) {
      const tag = tagMatch[tagMatch.length - 1].toLowerCase();
      const project = projects.find((p) =>
        p.title.toLowerCase().startsWith(tag)
      );
      if (project) projectId = project.id;
    }

    onCreate?.({ type, title: text, projectId });
    setValue("");
  };

  // Suggested project
  const suggestedProject = currentTag
    ? projects.find((p) =>
        p.title.toLowerCase().startsWith(currentTag.toLowerCase())
      )
    : null;

  // Select suggested project via click or Tab
  const selectSuggestedProject = () => {
    if (!suggestedProject) return;
    const newText = value.replace(/#(\w*)$/, `#${suggestedProject.title} `);
    setValue(newText);
    setCurrentTag("");
    textareaRef.current.focus();
  };

  const onKeyDown = (e) => {
    // Tab selects suggested project
    if (suggestedProject && e.key === "Tab") {
      e.preventDefault();
      selectSuggestedProject();
      return;
    }

    // Enter sends task/project
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);

    // Track last #tag anywhere in text
    const matches = e.target.value.match(/#(\w+)/g);
    if (matches) setCurrentTag(matches[matches.length - 1].slice(1));
    else setCurrentTag("");
  };

  return (
    <div className="fixed bottom-0 left-20 right-0">
      <div className="mx-auto w-1/2 p-4 flex items-end gap-2">
        <div className="relative flex-1 vertical-align-middle">
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={
              type === "project"
                ? "Type a Project Name and press Enter… (Shift+Enter for newline)"
                : "Type a task and press Enter… (Shift+Enter for newline)"
            }
            className="flex-1 border rounded-xl px-4 py-3 pr-16 focus:outline-none w-full shadow-lg resize-none overflow-hidden bg-transparent relative z-10"
          />

          {/* Inline suggestion */}
          {suggestedProject && currentTag && (
            <div
              className="absolute left-4 bottom-full mb-1 bg-white border px-2 py-1 rounded text-sm text-gray-600 shadow cursor-pointer z-20"
              onClick={selectSuggestedProject}
            >
              Did you mean{" "}
              <span className="text-blue-600">{suggestedProject.title}</span>?
            </div>
          )}

          <button
            onClick={send}
            className="absolute right-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-1 text-sm top-1/2 -translate-y-1/2"
          >
            {editingTask
              ? "Update"
              : type === "project"
              ? "Create Project"
              : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
