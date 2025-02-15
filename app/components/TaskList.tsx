"use client";

interface Task {
  id: number;
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
}

interface TaskListProps {
  tasks: Task[];
  onRemoveTask: (id: number) => void;
}

export default function TaskList({ tasks, onRemoveTask }: TaskListProps) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Task List</h2>
      
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks added yet.</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white dark:bg-gray-900 p-4 rounded-md shadow border border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{task.activity} - RM{task.price}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {task.type} | Accessibility: {task.accessibility.toFixed(1)}
                </p>

                 {/* Show if booking is required */}
            {task.bookingRequired && (
              <p className="text-sm font-medium text-red-500">Booking Required</p>
            )}
              </div>
              <button 
  onClick={() => onRemoveTask(task.id)} 
  className="danger border border-[var(--danger)] text-[var(--danger)] 
             bg-transparent hover:bg-[var(--danger)] hover:text-white 
             px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-sm"
>
  Delete
</button>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
