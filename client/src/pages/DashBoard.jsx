import { useEffect, useState } from "react";
import NestSelector from "../components/NestSelector";
import InputTaskNest from "../components/InputTaskNest";
import NestHeader from "../components/NestHeader";
import TaskList from "../components/TaskList";
import api from "../utils/api";
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
      const token = localStorage.getItem("token");
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

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white font-pop">
          TaskNest Dashboard
        </h2>

        {/* 👇 Nest Selector & Add Task & Nest */}
        <div className="mb-6">
          <NestSelector
            selectedNest={selectedNestId}
            currentNests={nests}
            onChangeSelect={setSelectedNestId}
            handleNestDelete={api.handleDeleteNest}
          />

          <InputTaskNest
            inputFor="task"
            inputValue={newTask}
            onTaskChange={setNewTask}
            taskAddHandler={api.handleAddTask}
            selectedNest={selectedNestId}
          />

          <InputTaskNest
            inputFor="nest"
            inputValue={newNest}
            onTaskChange={setNewNest}
            taskAddHandler={api.handleAddNest}
            selectedNest={selectedNestId}
          />
        </div>

        {/* 👇 Tasks in Each Nest */}
        {nests.map((nest) => (
          <div key={nest._id} className="mb-6">
            <NestHeader nest={nest} onEditNest={api.handleUpdateNest} />
            <TaskList
              nest={nest}
              onTaskEdit={api.handleUpdateTask}
              onTaskDelete={api.handleDeleteTask}
              selectedNestId={selectedNestId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
