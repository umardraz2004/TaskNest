import { FaRegTrashAlt, FaEdit, FaCheck } from "react-icons/fa";
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
            className="group me-3 text-red-500 cursor-pointer rounded-lg shadow-md transition-all duration-200"
          >
            <FaRegTrashAlt className="text-sm group-hover:scale-110 transition-transform duration-200" />
          </button>
          <button
            onClick={() => handleEditClick(task)}
            className={`group rounded-md shadow transition-all duration-200 cursor-pointer ${
              EditingTaskId === task._id
                ? "text-red-400"
                : "text-green-400"
            }`}
          >
            {EditingTaskId === task._id ? (
              <MdOutlineCancel className="text-lg group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <FaEdit className="text-sm group-hover:scale-110 transition-transform duration-200" />
            )}
          </button>
          {EditingTaskId === task._id && (
            <button
              onClick={() => {
                onTaskEdit(editingTask, selectedNestId, task._id);
                setEditingTaskId(null);
                setEditingTask("");
              }}
              className="ms-2 group text-green-500 transition-all duration-200"
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
