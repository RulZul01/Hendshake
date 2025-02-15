"use client";

import { useEffect, useState } from "react";
import localforage from "localforage";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    localforage.getItem("tasks").then((data: any) => {
      if (data) setTasks(data);
    });
  }, []);

  useEffect(() => {
    localforage.setItem("tasks", tasks);
  }, [tasks]);

  const addTask = (task: any) => {
    setTasks([...tasks, task]);
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">To-Do List</h1>

      {/* Summary Section */}
<div className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[var(--border-color)]">
  <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Task Overview</h2>
  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
    {tasks.length} {tasks.length === 1 ? "task" : "tasks"} in the list
  </span>
</div>


      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onRemoveTask={removeTask} />
    </div>
  );
}

