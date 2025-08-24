import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const statusColor = (s) =>
  s === "Completed"
    ? "text-green-600"
    : s === "Pending"
    ? "text-orange-500"
    : "text-blue-600";

export default function TaskTable({ tasks, onDelete, onChangeStatus }) {
  // Show only 6 tasks
  const displayedTasks = tasks.slice(0, 6);

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto text-xs">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Status</th>
            <th className="py-2 px-3">Date / Time</th>
            <th className="py-2 px-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedTasks.map((t) => (
            <tr key={t.id} className="bg-white hover:bg-gray-50 rounded-lg">
              <td className="py-3 px-3">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      t.avatarUrl ||
                      `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                        t.title || "T"
                      )}`
                    }
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <span className="font-medium text-gray-800">{t.title}</span>
                </div>
              </td>
              <td className="py-3 px-3">
                <select
                  value={t.status}
                  onChange={(e) => onChangeStatus?.(t, e.target.value)}
                  className={`bg-transparent font-medium ${statusColor(
                    t.status
                  )} focus:outline-none`}
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>
              <td className="py-3 px-3 text-gray-700">
                {t.createdAt && t.createdAt.toDate
                  ? t.createdAt.toDate().toLocaleString()
                  : "-"}
              </td>
              <td className="py-3 px-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <TrashIcon
                    className="w-5 h-5 cursor-pointer hover:text-red-600"
                    onClick={() => onDelete?.(t)}
                  />
                  <PencilSquareIcon className="w-5 h-5 opacity-50" />
                </div>
              </td>
            </tr>
          ))}
          {displayedTasks.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-gray-500">
                No tasks yet. Add one below.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
        <span>
          Showing {displayedTasks.length} of {tasks.length}
        </span>
      </div>
    </div>
  );
}
