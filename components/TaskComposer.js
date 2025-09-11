import { useEffect, useState } from "react";

export default function TaskComposer({ user, onCreate, editingTask, onUpdate }) {
  const [value, setValue] = useState("");

useEffect(() => {
  if (editingTask) {
    setValue(editingTask.title);
  } else {
    setValue("");
  }
}, [editingTask]);

  if (!user) return null;

  const send = () => {
    const text = value.trim();
    if (!text) return;
    if (editingTask) {
      onUpdate?.({ ...editingTask, title: text });
      return;
    } else {

    onCreate?.(text);    
  };
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
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type a task and press Enter… (Shift+Enter for newline)"
        className="flex-1 border rounded-xl px-4 py-3 pr-16 resize-none focus:outline-none w-full shadow-lg"
      />
      <button
        onClick={send}
        className="absolute right-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-1 text-sm top-1/2 -translate-y-1/2"
      >
        {editingTask ? "Update" : "Add"}
      </button>
    </div>
  </div>
</div>
  );
}
