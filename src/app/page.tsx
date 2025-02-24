"use client";

import { useEffect, useState } from "react";
import { createTask, deleteTask, getTasks } from "./actions";

export default function Home() {
  const [tasks, setTasks] = useState<{ id: number; title: string; description: string }[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks();
      setTasks(data);
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    await createTask(title, description);
    setTasks([...tasks, { id: tasks.length + 1, title, description }]);
    setTitle("");
    setDescription("");
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Tasks</h1>
      <div>
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2 mr-2"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="border p-2 mt-2 flex justify-between">
            <div>
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <button className="bg-red-500 text-white p-1" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
