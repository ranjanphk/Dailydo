import { useState } from "react";

export default function TaskComposer({ user, onAddTask }) {
  const [input, setInput] = useState("");

  if (!user) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    onAddTask(input.trim());
    setInput("");
  };

  return (
    <div className="justify-center fixed bottom-5 items-center bg-white border-t shadow-md p-4 flex gap-2 w-6/12">
      <textarea
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a new task..."
        className="flex-1 border rounded px-3 py-2 resize-none focus:outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add
      </button>
    </div>
  );
}
