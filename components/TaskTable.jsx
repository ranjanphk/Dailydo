import { useState } from 'react';
import { PencilSquareIcon, TrashIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Search } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Title } from 'chart.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dayjs } from 'dayjs';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function TaskTable({
  tasks = [],
  setTasks,
  onDelete,
  onChangeStatus,
  onReorder,
  onProjectClick,
  projects = [],
  allowEdit = true,
  hideProjectTag = false, // new prop
  onEdit,
}) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const tasksPerPage = 6;
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  // status colors

  const statusColors = {
    Completed: 'text-green-600 dark:-text-green-600',
    'In Progress': 'text-blue-500 dark:text-blue-500',
    Pending: 'text-red-500 dark:text-red-500',
    'No Status': 'text-gray-400',
  };

  // Debugging: check what your data looks like
  console.log('Tasks array:', tasks);

  const filteredTasks = tasks.filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // sort
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (!sortBy) return 0;
    const valA = sortBy === 'createdAt' ? new Date(a.createdAt) : a.status;
    const valB = sortBy === 'createdAt' ? new Date(b.createdAt) : b.status;

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (page - 1) * tasksPerPage;
  const displayedTasks = sortedTasks.slice(startIndex, startIndex + tasksPerPage);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // handle workdate

  const handleDateConfirm = async (date, task) => {
    if (!task || !date) return;

    try {
      await updateDoc(doc(db, 'tasks', task.id), {
        status: 'Later',
        workDate: new Date(date),
      });

      // No need to call setTasks here!
      setShowDateModal(false); // close popup
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // drag & drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(sortedTasks);
    const [moved] = newTasks.splice(result.source.index + startIndex, 1);
    newTasks.splice(result.destination.index + startIndex, 0, moved);

    onReorder?.(newTasks);
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
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('status')}>
                    Status {sortBy === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="py-2 px-3 cursor-pointer" onClick={() => handleSort('createdAt')}>
                    Work / Created date {sortBy === 'createdAt' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
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
                                  typeof t.title === 'string' ? t.title : JSON.stringify(t.title ?? ''),
                                )}`
                              }
                              className="w-8 h-8 rounded-full"
                              alt=""
                            />
                            <div className="flex-col flex grid-1">
                              <span className="font-medium text-xs text-gray-800 dark:text-gray-100 break-words max-w-xs">
                                {typeof t.title === 'string' ? t.title : JSON.stringify(t.title ?? '')}
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
                                  #{projects?.find((p) => p.id === t.projectId)?.title || 'Project'}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <Select
                            value={t.status}
                            onValueChange={(value) => {
                              // 🚫 Prevent selecting 'Later' for general tasks
                              if (value === 'Later' && !t.projectId) return;

                              if (value === 'Later') {
                                setShowDateModal(true); // Show popup for project tasks
                                setSelectedTask(t);
                                setSelectedDate('');
                              } else {
                                onChangeStatus?.(t, value);
                              }
                            }}
                          >
                            <SelectTrigger
                              className={`w-full bg-100 dark:bg-gray-800
                                                  focus:ring-gray-300 dark:focus:ring-gray-600
                                              
                                                  dark:text-gray-50 ${statusColors[t.status] || ''}`}
                            >
                              <SelectValue
                                placeholder="Select status"
                                className={t.status ? statusColors[t.status] : 'text-gray-400 dark:focus:outline-none'}
                              />
                            </SelectTrigger>

                            <SelectContent className="bg-white text-black dark:bg-slate-800 dark:text-white">
                              <SelectItem value="Completed" className="text-green-600">
                                Completed
                              </SelectItem>
                              <SelectItem value="In Progress" className="text-blue-500">
                                In Progress
                              </SelectItem>
                              <SelectItem value="Pending" className="text-red-500">
                                Pending
                              </SelectItem>
                              <SelectItem value="No Status" className="text-gray-400">
                                No Status
                              </SelectItem>
                              {/* Show “Later” only if it belongs to a project */}
                              {t.projectId && (
                                <SelectItem value="Later" className="text-gray-400">
                                  Later
                                </SelectItem>
                              )}
                            </SelectContent>
                          </Select>
                        </td>
                            <td className="py-3 px-3 text-gray-800 dark:text-gray-400">
                              {t.status === 'Later' && t.workDate ? (
                                <div className="flex items-center gap-1 justify-center">
                                  <span className="whitespace-nowrap">
                                    {new Date(t.workDate).toLocaleDateString('en-IN', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric',
                                    })}
                                  </span>
                                  <CalendarIcon
                                    className="w-4 h-4 text-orange-500 cursor-pointer hover:text-orange-600"
                                    onClick={() => {
                                      setSelectedTask(t);
                                      setSelectedDate(
                                        t.workDate ? new Date(t.workDate).toISOString().split('T')[0] : ''
                                      );
                                      setShowDateModal(true);
                                    }}
                                  />
                                </div>
                              ) : t.createdAt ? (
                                <span className="whitespace-nowrap flex items-center justify-center">
                                  {new Date(t.createdAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </span>
                              ) : (
                                '-'
                              )}
                            </td>



                        <td className="py-3 px-3">
                          <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                            <TrashIcon
                              className="w-5 h-5 cursor-pointer hover:text-red-600"
                              onClick={() => onDelete?.(t)}
                            />
                            {allowEdit && (
                              <PencilSquareIcon
                                className="w-5 h-5 cursor-pointer hover:text-blue-600"
                                onClick={() => onEdit?.(t)} // ✏️ edit works
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}

                {/*date popp */}
                {showDateModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-2xl w-[90%] max-w-sm">
                      <h3 className="text-lg font-semibold mb-3 text-center">Select a date for this task</h3>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border p-2 rounded w-full mb-4 dark:bg-gray-800"
                      />
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setShowDateModal(false)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDateConfirm(selectedDate, selectedTask)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}

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
