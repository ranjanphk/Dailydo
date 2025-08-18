const MainContent = () => {
  return (
    <main className="flex-1 bg-gray-100 rounded-xl m-6 p-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold text-gray-600">No tasks for today!</h2>
      <p className="text-sm text-gray-400 mt-2">Start by creating one from the sidebar or below.</p>
      <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow">
        + Add Daily Task
      </button>
    </main>
  );
};

export default MainContent;
