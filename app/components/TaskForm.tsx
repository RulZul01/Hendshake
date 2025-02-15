"use client";

import { useState } from "react";

interface TaskFormProps {
  onAddTask: (task: {
    id: number;
    activity: string;
    price: number;
    type: string;
    bookingRequired: boolean;
    accessibility: number;
  }) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Education");
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim() || !price) return;

    onAddTask({
      id: Date.now(),
      activity,
      price: Number(price),
      type,
      bookingRequired,
      accessibility,
    });

    setActivity("");
    setPrice("");
    setType("Education");
    setBookingRequired(false);
    setAccessibility(0.5);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Add New Task</h2>
      
      <div className="space-y-3">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Activity Name"
          className="w-full"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (RM)"
          className="w-full"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full"
        >
          {["Education", "Recreational", "Social", "DIY", "Charity", "Cooking", "Relaxation", "Music", "Busywork"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={bookingRequired} onChange={(e) => setBookingRequired(e.target.checked)} />
          <span>Booking Required</span>
        </label>

        <label className="block">
          <span>Accessibility: {accessibility.toFixed(1)}</span>
          <input type="range" min="0" max="1" step="0.1" value={accessibility} onChange={(e) => setAccessibility(parseFloat(e.target.value))} className="w-full" />
        </label>

        <button type="submit" className="primary w-full">Add Task</button>
      </div>
    </form>
  );
}
