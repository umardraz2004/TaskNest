import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [nests, setNests] = useState([]);
  const [selectedNestId, setSelectedNestId] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [newNest, setNewNest] = useState("");

  // Fetch nests and tasks
  const fetchNests = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT from login
      const res = await axios.get(`${baseURL}/api/nests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNests(res.data); // adjust if response is { nests: [...] }
    } catch (error) {
      console.error("Failed to fetch nests", error);
    }
  };

  useEffect(() => {
    fetchNests();
  }, []);

  useEffect(() => {
    if (nests.length > 0) {
      setSelectedNestId(nests[0]._id);
    }
  }, [nests]);

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Task Dashboard
        </h2>

        {/* 👇 Nest Selector & Add Task */}
        <div className="mb-6">
          <div className="flex gap-4 mb-4 items-center">
            <select
              value={selectedNestId || ""}
              onChange={(e) => setSelectedNestId(e.target.value)}
              className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded w-full"
            >
              {nests.map((nest) => (
                <option key={nest._id} value={nest._id}>
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
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Add Task
            </button>
          </div>
        </div>

        {/* 👇 Add Nest */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            value={newNest}
            onChange={(e) => setNewNest(e.target.value)}
            placeholder="Add new nest"
            className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Add Nest
          </button>
        </div>

        {/* 👇 Tasks in Each Nest */}
        {nests.map((nest) => (
          <div key={nest._id} className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              {nest.name}
            </h3>
            <ul className="space-y-3">
              {(nest.tasks || []).map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded"
                >
                  <span
                    className={`flex-1 ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {task.title}
                  </span>
                  <button className="text-red-500 hover:text-red-700 ml-4">
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
