import { useState } from "react";
import NestSelector from "../components/NestSelector";
import InputTaskNest from "../components/InputTaskNest";
import NestHeader from "../components/NestHeader";
import TaskList from "../components/TaskList";
import { useNestsData } from "../hooks/useNestsData";

const Dashboard = () => {
  const [newTask, setNewTask] = useState("");
  const [newNest, setNewNest] = useState("");

  const {
    nests,
    isLoading,
    isError,
    selectedNestId,
    setSelectedNestId,
    addNest,
    updateNest,
    deleteNest,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useNestsData();

  if (isLoading) return <div className="p-6">Loading…</div>;
  if (isError)
    return <div className="p-6 text-red-500">Failed to load nests.</div>;

  // Keep child props/signatures the same:
  const handleNestDelete = (nestId) => deleteNest(nestId);
  const handleAddTask = (title, nestId) => addTask(nestId, title);
  const handleAddNest = (name) => addNest(name);
  const handleUpdateNest = (editingNest, nestId) =>
    updateNest(nestId, editingNest);
  const handleUpdateTask = (editingTask, nestId, taskId) =>
    updateTask(nestId, taskId, editingTask);
  const handleCheckboxChange = (nestId, task) => toggleTask(nestId, task);

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white font-pop">
          TaskNest Dashboard
        </h2>

        <div className="mb-6">
          <NestSelector
            selectedNest={selectedNestId}
            currentNests={nests}
            onChangeSelect={setSelectedNestId}
            handleNestDelete={handleNestDelete}
          />

          <InputTaskNest
            inputFor="task"
            inputValue={newTask}
            onTaskChange={setNewTask}
            taskAddHandler={handleAddTask}
            selectedNest={selectedNestId}
          />

          <InputTaskNest
            inputFor="nest"
            inputValue={newNest}
            onTaskChange={setNewNest}
            taskAddHandler={handleAddNest}
            selectedNest={selectedNestId}
          />
        </div>

        {nests.map((nest) => (
          <div key={nest._id} className="mb-6">
            <NestHeader nest={nest} onEditNest={handleUpdateNest} />
            <TaskList
              nest={nest}
              onTaskEdit={handleUpdateTask}
              onTaskDelete={(nestId, taskId) => deleteTask(nestId, taskId)}
              onCheckBoxChange={handleCheckboxChange}
              selectedNestId={selectedNestId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
