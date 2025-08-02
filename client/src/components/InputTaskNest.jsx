import { MdOutlineClear } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { showToast } from "../utils/toast";
const InputTaskNest = ({
  inputValue,
  onTaskChange,
  taskAddHandler,
  selectedNest,
  inputFor,
}) => {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onTaskChange(e.target.value)}
        placeholder={
          inputFor == "task"
            ? "Add a new task"
            : inputFor == "nest" && "Add a new nest"
        }
        className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white w-full outline-none"
      />
      <button
        onClick={() => taskAddHandler(inputValue, selectedNest)}
        className="bg-green-700 hover:bg-green-600 transition-colors duration-300 text-white px-4 py-2"
      >
        {inputFor == "task" && <IoMdAdd className="text-xl" />}
        {inputFor == "nest" && <IoMdAdd className="text-xl" />}
      </button>
      <button
        onClick={() => {
          if (!inputValue.trim()) {
            showToast("Input is empty", "error");
            return;
          }
          onTaskChange("");
          showToast("Input cleared", "success");
        }}
        className={`bg-gray-950 hover:bg-gray-900 transition-colors duration-300 text-white px-4 py-2`}
      >
        <MdOutlineClear className="font-semibold text-xl" />
      </button>
    </div>
  );
};

export default InputTaskNest;
