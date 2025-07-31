import { useState, useEffect, useRef } from "react";
import NestSelector from "../components/NestSelector";
import InputTaskNest from "../components/InputTaskNest";
import NestHeader from "../components/NestHeader";
import TaskList from "../components/TaskList";
import { useNestsData } from "../hooks/useNestsData";
import { FaArrowUp } from "react-icons/fa";

const Dashboard = () => {
  const [newTask, setNewTask] = useState("");
  const [newNest, setNewNest] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100);
      setShowScrollButton(scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        Failed to load nests.
      </div>
    );

  const handleNestDelete = (nestId) => deleteNest(nestId);
  const handleAddTask = (title, nestId) => addTask(nestId, title);
  const handleAddNest = (name) => addNest(name);
  const handleUpdateNest = (editingNest, nestId) =>
    updateNest(nestId, editingNest);
  const handleUpdateTask = (editingTask, nestId, taskId) =>
    updateTask(nestId, taskId, editingTask);
  const handleCheckboxChange = (nestId, task) => toggleTask(nestId, task);
  console.log("Nests data:", nests);
  return (
    <div className="relative">
      <div className="mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <aside
          className={`bg-white dark:bg-gray-800 px-6 pt-6 pb-5 rounded-xl shadow-lg space-y-6 h-fit transition-all duration-300 ${
            isSticky ? "sticky top-4" : ""
          }`}
        >
          <h2 className="text-2xl font-bold text-center font-pop text-white">
            TaskNest
          </h2>

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
        </aside>
        {/* Main Panel */}
        <main className="lg:col-span-2 space-y-6">
          {!Array.isArray(nests) ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No nests data available.
            </div>
          ) : nests.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No nests found. Add a nest to get started.
            </div>
          ) : (
            nests.map((nest) => (
              <div
                key={nest._id}
                className={`rounded-xl p-5 shadow-md bg-white dark:bg-gray-800 border-l-4 ${
                  selectedNestId === nest._id
                    ? "border-blue-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <NestHeader nest={nest} onEditNest={handleUpdateNest} />

                <TaskList
                  nest={nest}
                  onTaskEdit={handleUpdateTask}
                  onTaskDelete={(nestId, taskId) => deleteTask(nestId, taskId)}
                  onCheckBoxChange={handleCheckboxChange}
                  selectedNestId={selectedNestId}
                />
              </div>
            ))
          )}
        </main>
      </div>

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 p-4 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none z-50 animate-bounce-slow"
          title="Scroll to Top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Dashboard;
