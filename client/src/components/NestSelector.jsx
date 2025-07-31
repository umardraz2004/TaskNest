import { FaTrash } from "react-icons/fa";

const NestSelector = ({
  selectedNest,
  currentNests,
  onChangeSelect,
  handleNestDelete,
}) => {
  return (
    <div className="flex gap-4 mb-4 items-center">
      <select
        value={selectedNest || "No nest to select, please add one"}
        onChange={(e) => onChangeSelect(e.target.value)}
        className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded w-full font-pop outline-none"
      >
        {currentNests.map((nest) => (
          <option key={nest._id} value={nest._id}>
            {nest.name}
          </option>
        ))}
      </select>
      <button
        onClick={() => handleNestDelete(selectedNest)}
        className="group bg-red-600 hover:bg-red-200 active:bg-red-300 text-red-100 hover:text-red-700 p-3 rounded-lg shadow-md transition-all duration-200"
      >
        <FaTrash className="text-md group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default NestSelector;
