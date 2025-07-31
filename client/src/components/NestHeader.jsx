import { useState } from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { showToast } from "../utils/toast";

const NestHeader = ({ nest, onEditNest }) => {
  const [EditingNestId, setEditingNestId] = useState(null);
  const [editingNest, setEditingNest] = useState("");

  const handleEditClick = () => {
    if (EditingNestId === nest._id) {
      setEditingNestId(null); // Cancel editing
      showToast("Editing cancelled", "success");
      setEditingNest("");
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
        <h3 className="py-2 text-xl font-semibold font-pop text-gray-700 dark:text-gray-200">
          {nest.name}
        </h3>
      )}
      <button
        onClick={handleEditClick}
        className={`group rounded-lg shadow transition-all duration-200 cursor-pointer ${
          EditingNestId === nest._id ? "text-red-400" : "text-green-400"
        }`}
      >
        {EditingNestId === nest._id ? (
          <MdOutlineCancel className="text-md group-hover:scale-110 transition-transform duration-200" />
        ) : (
          <FaEdit className="text-md me-3 group-hover:scale-110 transition-transform duration-200" />
        )}
      </button>
      {EditingNestId === nest._id && (
        <button
          onClick={() => {
            onEditNest(editingNest, nest._id);
            setEditingNestId(null);
            setEditingNest("");
          }}
          className="mx-3 group text-green-500 transition-all duration-200 cursor-pointer"
        >
          <FaCheck className="text-md group-hover:scale-110 transition-transform duration-200" />
        </button>
      )}
    </div>
  );
};

export default NestHeader;
