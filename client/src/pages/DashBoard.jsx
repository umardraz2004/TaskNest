import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [nests, setNests] = useState([]);
  const [selectedNestId, setSelectedNestId] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [newNest, setNewNest] = useState("");
  const [EditingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState("");
  const [EditingNestId, setEditingNestId] = useState(null);
  const [editingNest, setEditingNest] = useState("");

  // Fetch nests and tasks
  const fetchNests = async () => {
    try {
      const token = localStorage.getItem("token"); // JWT from login
      const res = await axios.get(`${baseURL}/api/nests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNests(res.data);
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

  const handleAddNest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseURL}/api/nests`,
        { name: newNest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        console.log("Nest created successfully");
        window.location.reload(); // Reload to fetch updated nests
      }
    } catch (err) {
      console.error("Error creating nest:", err.response?.data || err.message);
    }
  };

  const handleUpdateNest = async (nestId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${baseURL}/api/nests/${nestId}`,
        { name: editingNest },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("Nest updated successfully");
        window.location.reload(); // Reload to fetch updated nests
      }
    } catch (err) {
      console.error("Error creating nest:", err.response?.data || err.message);
    }
  };

  const handleDeleteNest = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${baseURL}/api/nests/${selectedNestId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log("Nest deleted successfully");
        window.location.reload(); // Reload to fetch updated nests
      }
    } catch (err) {
      console.error("Error creating nest:", err.response?.data || err.message);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${baseURL}/api/nests/${selectedNestId}/tasks`,
        { title: newTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        console.log("Task added successfully");
      }
      window.location.reload(); // Reload to fetch updated tasks
    } catch (err) {
      console.error("Error creating nest:", err.response?.data || err.message);
    }
  };

  const handleUpdateTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${baseURL}/api/nests/${selectedNestId}/${taskId}`,
        { title: editingTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 201) {
        console.log("Task updated successfully");
      }
      window.location.reload(); // Reload to fetch updated tasks
    } catch (err) {
      console.error("Error creating nest:", err.response?.data || err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `${baseURL}/api/nests/${selectedNestId}/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("Task deleted successfully");
      }
      window.location.reload(); // Reload to fetch updated tasks
    } catch (err) {
      console.error("Error creating nest:", err.response?.data || err.message);
    }
  };

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
            <button
              onClick={handleDeleteNest}
              className="group bg-red-600 hover:bg-red-200 active:bg-red-300 text-red-100 hover:text-red-700 p-3 rounded-lg shadow-md transition-all duration-200"
            >
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

        {/* 👇 Add Nest */}
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

        {/* 👇 Tasks in Each Nest */}
        {nests.map((nest) => (
          <div key={nest._id} className="mb-6">
            <div className="flex justify-between items-center mb-4">
              {EditingNestId === nest._id ? (
                <input
                  value={editingNest}
                  onChange={(e) => setEditingNest(e.target.value)}
                  type="text"
                  className="w-full me-5 text-white font-semibold text-xl outline-4 outline-gray-700 rounded-lg p-2"
                />
              ) : (
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 p-2">
                  {nest.name}
                </h3>
              )}
              <button
                onClick={() => {
                  if (EditingNestId === nest._id) {
                    setEditingNestId(null); // Cancel editing
                  } else {
                    setEditingNestId(nest._id);
                    setEditingNest(nest.name);
                  }
                }}
                className={`group p-2 rounded-lg shadow transition-all duration-200 ${
                  EditingNestId === nest._id
                    ? "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-500 active:bg-green-700 text-white"
                }`}
              >
                {EditingNestId === nest._id ? (
                  <MdOutlineCancel className="text-md group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <FaEdit className="text-md group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>
              {EditingNestId === nest._id && (
                <button
                  onClick={() => handleUpdateNest(nest._id)}
                  className="ms-2 group bg-green-600 hover:bg-green-200 active:bg-green-300 text-green-100 hover:text-green-700 p-2 rounded-lg shadow-md transition-all duration-200"
                >
                  <FaCheck className="text-md group-hover:scale-110 transition-transform duration-200" />
                </button>
              )}
            </div>
            <ul className="space-y-3">
              {(nest.tasks || []).map((task) => (
                <li
                  key={task._id}
                  className={`flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded ${
                    EditingTaskId === task._id && "outline-4 outline-gray-600"
                  }`}
                >
                  {EditingTaskId === task._id ? (
                    <input
                      value={editingTask}
                      onChange={(e) => setEditingTask(e.target.value)}
                      type="text"
                      className="w-full me-5 text-white outline-none"
                    />
                  ) : (
                    <span
                      className={`flex-1 ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {task.title}
                    </span>
                  )}
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="group me-2 bg-red-600 hover:bg-red-200 active:bg-red-300 text-red-100 hover:text-red-700 p-2 rounded-lg shadow-md transition-all duration-200"
                  >
                    <FaTrash className="text-md group-hover:scale-110 transition-transform duration-200" />
                  </button>
                  <button
                    onClick={() => {
                      if (EditingTaskId === task._id) {
                        setEditingTaskId(null); // Cancel editing
                      } else {
                        setEditingTaskId(task._id);
                        setEditingTask(task.title);
                      }
                    }}
                    className={`group p-2 rounded-lg shadow transition-all duration-200 ${
                      EditingTaskId === task._id
                        ? "bg-red-600 hover:bg-red-500 active:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-500 active:bg-green-700 text-white"
                    }`}
                  >
                    {EditingTaskId === task._id ? (
                      <MdOutlineCancel className="text-md group-hover:scale-110 transition-transform duration-200" />
                    ) : (
                      <FaEdit className="text-md group-hover:scale-110 transition-transform duration-200" />
                    )}
                  </button>
                  {EditingTaskId === task._id && (
                    <button
                      onClick={() => handleUpdateTask(task._id)}
                      className="ms-2 group bg-green-600 hover:bg-green-200 active:bg-green-300 text-green-100 hover:text-green-700 p-2 rounded-lg shadow-md transition-all duration-200"
                    >
                      <FaCheck className="text-md group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  )}
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
