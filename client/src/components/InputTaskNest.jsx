const InputTaskNest = ({
  inputValue,
  onTaskChange,
  taskAddHandler,
  selectedNest,
  inputFor,
}) => {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onTaskChange(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded w-full"
      />
      <button
        onClick={() => taskAddHandler(inputValue, selectedNest)}
        className={`${inputFor == "task" && "bg-blue-600 hover:bg-blue-700"} ${
          inputFor == "nest" && "bg-green-600 hover:bg-green-700"
        } text-white px-4 py-2 rounded`}
      >
        {inputFor == "task" && "Add Task"}
        {inputFor == "nest" && "Add Nest"}
      </button>
    </div>
  );
};

export default InputTaskNest;
