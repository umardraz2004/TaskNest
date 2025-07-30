import { useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const NestHeader = ({ nest, onEditNest }) => {
  const [EditingNestId, setEditingNestId] = useState(null);
  const [editingNest, setEditingNest] = useState("");

  const handleEditClick = () => {
    if (EditingNestId === nest._id) {
      setEditingNestId(null); // Cancel editing
    } else {
      setEditingNestId(nest._id);
      setEditingNest(nest.name);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      {EditingNestId === nest._id ? (
        <input
          value={editingNest}
          onChange={(e) => setEditingNest(e.target.value)}
          type="text"
          className="w-full me-5 text-white font-semibold text-xl outline-4 outline-gray-700 rounded-lg p-2"
        />
      ) : (
        <h3 className="py-2 text-xl font-semibold text-gray-700 dark:text-gray-200">
          {nest.name}
        </h3>
      )}
      <button
        onClick={handleEditClick}
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
          onClick={() => onEditNest(editingNest, nest._id)}
          className="ms-2 group bg-green-600 hover:bg-green-200 active:bg-green-300 text-green-100 hover:text-green-700 p-2 rounded-lg shadow-md transition-all duration-200"
        >
          <FaCheck className="text-md group-hover:scale-110 transition-transform duration-200" />
        </button>
      )}
    </div>
  );
};

export default NestHeader;
