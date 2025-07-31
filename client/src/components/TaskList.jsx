import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { showToast } from "../utils/toast";

const TaskList = ({
  nest,
  onTaskEdit,
  onTaskDelete,
  onCheckBoxChange,
  selectedNestId,
}) => {
  const [EditingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState("");

  const handleEditClick = (task) => {
    if (EditingTaskId === task._id) {
      setEditingTaskId(null); // Cancel editing
      setEditingTask("");
      showToast("Editing cancelled", "success");
    } else {
      setEditingTaskId(task._id);
      setEditingTask(task.title);
    }
  };
  return (
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
            <div className="flex items-center w-full">
              <span className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onCheckBoxChange(selectedNestId, task)} // use `onChange` instead of `onClick` for checkboxes
                  className="me-3 h-5 w-5 appearance-none bg-transparent border-4 border-gray-800 rounded-full checked:bg-gray-400 transition-all duration-200 cursor-pointer"
                />
              </span>
              <span
                className={`flex-1 font-roboto ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {task.title}
              </span>
            </div>
          )}
          <button
            onClick={() => onTaskDelete(selectedNestId, task._id)}
            className="group me-2 bg-red-600 hover:bg-red-200 active:bg-red-300 text-red-100 hover:text-red-700 p-2 rounded-lg shadow-md transition-all duration-200"
          >
            <FaTrash className="text-md group-hover:scale-110 transition-transform duration-200" />
          </button>
          <button
            onClick={() => handleEditClick(task)}
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
              onClick={() => {
                onTaskEdit(editingTask, selectedNestId, task._id);
                setEditingTaskId(null);
                setEditingTask("");
              }}
              className="ms-2 group bg-green-600 hover:bg-green-200 active:bg-green-300 text-green-100 hover:text-green-700 p-2 rounded-lg shadow-md transition-all duration-200"
            >
              <FaCheck className="text-md group-hover:scale-110 transition-transform duration-200" />
            </button>
          )}
        </li>
      ))}
      {nest.tasks.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 font-roboto">
          No tasks in this nest.
        </p>
      )}
    </ul>
  );
};

export default TaskList;
