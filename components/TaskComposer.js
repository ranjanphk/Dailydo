import { useState } from "react";

export default function TaskComposer({ user, onCreate }) {
  const [value, setValue] = useState("");

  if (!user) return null;

  const send = () => {
    const text = value.trim();
    if (!text) return;
    onCreate?.(text);
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-0 left-20 right-0 bg-white border-t shadow-md">
      <div className="mx-auto max-w-6xl p-4 flex items-end gap-2">
        <textarea
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a task and press Enter… (Shift+Enter for newline)"
          className="flex-1 border rounded-xl px-4 py-3 resize-none focus:outline-none"
        />
        <button
          onClick={send}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
}
