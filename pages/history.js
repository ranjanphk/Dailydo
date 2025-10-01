export default function HistoryPage() {
  // Later fetch history tasks from Firestore
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task History</h1>
      <p className="text-gray-600 dark:text-gray-300">Completed tasks will appear here grouped by date.</p>
    </div>
  );
}
