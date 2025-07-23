import { useState } from "react";
import { FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [nests, setNests] = useState([
    {
      id: 1,
      name: "Work",
      tasks: [
        { id: 101, title: "Finish report", completed: false },
        { id: 102, title: "Send emails", completed: true },
      ],
    },
    {
      id: 2,
      name: "Personal",
      tasks: [
        { id: 201, title: "Buy groceries", completed: false },
        { id: 202, title: "Call Mom", completed: true },
      ],
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [selectedNestId, setSelectedNestId] = useState(nests[0].id);
  const [newNest, setNewNest] = useState("");

  const handleAddNest = () => {
    if (!newNest.trim()) return;

    const newNestObj = {
      id: Date.now(),
      name: newNest,
      tasks: [],
    };

    setNests([newNestObj, ...nests]);
    setSelectedNestId(newNestObj.id);
    setNewNest("");
  };

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const updatedNests = nests.map((nest) =>
      nest.id === selectedNestId
        ? {
            ...nest,
            tasks: [
              { id: Date.now(), title: newTask, completed: false },
              ...nest.tasks,
            ],
          }
        : nest
    );

    setNests(updatedNests);
    setNewTask("");
  };

  const toggleComplete = (nestId, taskId) => {
    const updatedNests = nests.map((nest) =>
      nest.id === nestId
        ? {
            ...nest,
            tasks: nest.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            ),
          }
        : nest
    );

    setNests(updatedNests);
  };

  const deleteTask = (nestId, taskId) => {
    const updatedNests = nests.map((nest) =>
      nest.id === nestId
        ? {
            ...nest,
            tasks: nest.tasks.filter((task) => task.id !== taskId),
          }
        : nest
    );

    setNests(updatedNests);
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Task Dashboard
        </h2>

        {/* 👇 Add Nest Section */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            value={newNest}
            onChange={(e) => setNewNest(e.target.value)}
            placeholder="Add new nest"
            className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          />
          <button
            onClick={handleAddNest}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Nest
          </button>
        </div>

        {/* 👇 Add Task Section */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4 items-center">
            <select
              value={selectedNestId}
              onChange={(e) => setSelectedNestId(Number(e.target.value))}
              
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded w-full"
            >
              {nests.map((nest) => (
                <option key={nest.id} value={nest.id}>
                  {nest.name}
                </option>
              ))}
            </select>
            <button className="group bg-red-100 hover:bg-red-200 active:bg-red-300 text-red-600 hover:text-red-700 p-3 rounded-lg shadow-md transition-all duration-200">
              <FaTrash className="text-md group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded w-full"
            />
            <button
              onClick={handleAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Task
            </button>
          </div>
        </div>

        {/* 👇 Tasks By Nest */}
        {nests.map((nest) => (
          <div key={nest.id} className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              {nest.name}
            </h3>
            <ul className="space-y-3">
              {nest.tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded"
                >
                  <span
                    onClick={() => toggleComplete(nest.id, task.id)}
                    className={`flex-1 cursor-pointer ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </span>
                  <button
                    onClick={() => deleteTask(nest.id, task.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Delete
                  </button>
                </li>
              ))}
              {nest.tasks.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">
                  No tasks in this nest.
                </p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
