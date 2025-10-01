// pages/test.js
import TaskComposer from "../components/TaskComposer";

export default function TestPage() {
  const mockUser = { email: "demo@heymate.com" };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 items-center justify-center">
      <TaskComposer user={mockUser} />
    </div>
  );
}
