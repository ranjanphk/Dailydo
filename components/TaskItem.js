export default function TaskItem({ task }) {
  return (
    <li className="p-3 border rounded flex justify-between items-center">
      <span>{task.title}</span>
      <span className={`text-sm ${task.completed ? 'text-green-600' : 'text-red-500'}`}>
        {task.completed ? 'Done' : 'Pending'}
      </span>
    </li>
  );
}
