import { useState } from "react";

export default function TaskComposer({ user }) {
  const [messages, setMessages] = useState([]); // stores tasks or chat-like entries
  const [input, setInput] = useState("");

  if (!user) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: user?.email }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-2 max-w-md"
          >
            <p className="text-sm font-medium">{msg.sender}</p>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Composer bar (fixed at bottom) */}
      <div className="fixed bottom-0 left-20 right-0 bg-white border-t p-4 flex items-center gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a task..."
          className="flex-1 border rounded px-3 py-2 resize-none focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
