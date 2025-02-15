import React, { useState, useEffect } from "react";

function App() {
  // Load tasks from local storage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Form state
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("education");
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  // Save tasks to local storage on change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle form submission
  const addTask = (e) => {
    e.preventDefault();
    if (!activity || !price) return;

    const newTask = {
      id: Date.now(),
      activity,
      price: parseFloat(price),
      type,
      bookingRequired,
      accessibility: parseFloat(accessibility),
    };

    setTasks([...tasks, newTask]);
    setActivity("");
    setPrice("");
    setType("education");
    setBookingRequired(false);
    setAccessibility(0.5);
  };

  // Remove task
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1>To-Do List ({tasks.length} items)</h1>

      {/* Form */}
      <form onSubmit={addTask}>
        <input type="text" placeholder="Activity" value={activity} onChange={(e) => setActivity(e.target.value)} required />

        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="education">Education</option>
          <option value="recreational">Recreational</option>
          <option value="social">Social</option>
          <option value="diy">DIY</option>
          <option value="charity">Charity</option>
          <option value="cooking">Cooking</option>
          <option value="relaxation">Relaxation</option>
          <option value="music">Music</option>
          <option value="busywork">Busywork</option>
        </select>

        <label>
          <input type="checkbox" checked={bookingRequired} onChange={() => setBookingRequired(!bookingRequired)} />
          Booking Required
        </label>

        <input type="range" min="0" max="1" step="0.1" value={accessibility} onChange={(e) => setAccessibility(e.target.value)} />

        <button
  type="submit"
  className="border border-gray-600 dark:border-gray-400 px-6 py-2 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all shadow-sm"
>
  + Add Task
</button>

      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.activity} - RM{task.price} ({task.type})
            <button 
  onClick={() => removeTask(task.id)} 
  className="danger border border-[var(--danger)] text-[var(--danger)] 
             bg-transparent hover:bg-[var(--danger)] hover:text-white 
             px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-sm"
>
  Delete
</button>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
