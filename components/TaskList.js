import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import TaskItem from "./TaskItem";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const snapshot = await getDocs(collection(db, "tasks"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(list);
    }

    fetchTasks();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet.</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}
