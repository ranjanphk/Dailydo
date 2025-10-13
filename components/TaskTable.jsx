import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Search } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Title } from "chart.js";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"


export default function TaskTable({ 
  tasks = [], 
  onDelete, 
  onChangeStatus, 
  onReorder, 
  onEdit,
  onProjectClick,
  projects = [],
  hideProjectTag = false, // new prop
}) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const tasksPerPage = 6;
  

// status colors 

const statusColors = {
  "Completed": "text-green-600 dark:-text-green-600",
  "In Progress": "text-blue-500 dark:text-blue-500",
  "Pending": "text-red-500 dark:text-red-500",
  "No Status": "text-gray-400",
};



// Debugging: check what your data looks like
console.log("Tasks array:", tasks);

const filteredTasks = tasks.filter((t) => {
  const title = typeof t.title === "string" ? t.title : String(t.title ?? "");
  return title.toLowerCase().includes((searchTerm ?? "").toLowerCase());
});

  // sort
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortBy) return 0;
    const valA = sortBy === "createdAt" ? new Date(a.createdAt) : a.status;
    const valB = sortBy === "createdAt" ? new Date(b.createdAt) : b.status;

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (page - 1) * tasksPerPage;
  const displayedTasks = sortedTasks.slice(startIndex, startIndex + tasksPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // drag & drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // reorder the current page
    const reordered = Array.from(displayedTasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    onReorder?.(reordered, startIndex);

    // Update parent with new order relative to global index
    onReorder?.(
      [...sortedTasks.slice(0, startIndex), ...reordered, ...sortedTasks.slice(startIndex + tasksPerPage)],
      startIndex
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 overflow-x-auto text-xs">
      {/* Search Bar */}
      <div className="flex items-center justify-between mb-4 relative">
        <Search className="w-4 h-4 text-gray-600 dark:text-gray-50 absolute left-2 top-1/2 transform -translate-y-1/2" />

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className=" dark:border-gray-800 border border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-800-gray-200 rounded px-3 py-2 pl-8 text-sm w-64 focus:outline-none focus:ring"
        />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="taskTable">
          {(provided) => (
            <table
              className="min-w-full dark:border-gray-800-gray-200-separate text-xs dark:border-gray-800 border border-gray-300 dark:border-gray-800-gray-200-spacing-y-2"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-400">
                  <th className="py-2 px-3">Task Name</th>
                  <th
                    className="py-2 px-3 cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status{" "}
                    {sortBy === "status" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                  <th
                    className="py-2 px-3 cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Date / Time{" "}
                    {sortBy === "createdAt"
                      ? sortOrder === "asc"
                        ? "↑"
                        : "↓"
                      : ""}
                  </th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedTasks.map((t, index) => (
                  <Draggable key={t.id} draggableId={t.id} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white dark:bg-gray-900 hover:bg-gray-50 rounded-lg"
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={
                                t.avatarUrl ||
                                `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
                                  typeof t.title === "string" ? t.title : JSON.stringify(t.title ?? "")
                                )}`
                              }
                              className="w-8 h-8 rounded-full"
                              alt=""
                            />
                            <div className="flex-col flex grid-1">
                            <span className="font-medium text-xs text-gray-800 dark:text-gray-100 break-words max-w-xs">
                               {typeof t.title === "string" ? t.title : JSON.stringify(t.title ?? "")}  
                            </span>

                          {/* Project Tag here */}
                            {!hideProjectTag && t.projectId && (
                                  <span
                                    className="text-blue-600 w-fit dark:text-blue-400 text-[10px] font-medium bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onProjectClick?.(t.projectId);
                                    }}
                                  >
                                    #{projects?.find(p => p.id === t.projectId)?.title || "Project"}
                                  </span>
                                )}
                            </div>
                          </div>
                        </td>
                          <td className="py-3 px-3">
                                          <Select
                                            value={t.status}
                                            onValueChange={(value) => onChangeStatus?.(t, value)}
                                          >
                                            <SelectTrigger
                                              className={`w-full bg-100 dark:bg-gray-800
                                                  focus:ring-gray-300 dark:focus:ring-gray-600
                                              
                                                  dark:text-gray-50 ${statusColors[t.status] || ""}`}
                                            >
                                              <SelectValue
                                                placeholder="Select status"
                                                className={t.status ? statusColors[t.status] : "text-gray-400 dark:focus:outline-none"}
                                              />
                                            </SelectTrigger>

                                            <SelectContent className="bg-white text-black dark:bg-slate-800 dark:text-white">
                                              <SelectItem value="Completed" className="text-green-600">Completed</SelectItem>
                                              <SelectItem value="In Progress" className="text-yellow-500">In Progress</SelectItem>
                                              <SelectItem value="Pending" className="text-red-500">Pending</SelectItem>
                                              <SelectItem value="No Status" className="text-gray-400">No Status</SelectItem>
                                            </SelectContent>
                                          </Select>

                          </td>
                        <td className="py-3 px-3 text-gray-800 dark:text-gray-400">
                          {t.createdAt
                            ? new Date(t.createdAt).toLocaleString()
                            : "-"}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                            <TrashIcon
                              className="w-5 h-5 cursor-pointer hover:text-red-600"
                              onClick={() => onDelete?.(t)}
                            />
                            <PencilSquareIcon className="w-5 h-5 cursor-pointer hover:text-blue-600" 
                            
                            onClick={() => onEdit?.(t)}  // ✏️ edit works
                            
                            
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {displayedTasks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500 dark:text-gray-100">
                      No tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </Droppable>
      </DragDropContext>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-4">
        <span>
          Showing {displayedTasks.length} of {sortedTasks.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            disabled={page >= totalPages}
            className="px-3 py-1 dark:border-gray-800 border border-gray-100 dark:border-gray-800-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
