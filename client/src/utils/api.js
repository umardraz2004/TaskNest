// import axios from "axios";
// import { showToast } from '../utils/toast'
// const baseURL = import.meta.env.VITE_API_BASE_URL;

// const handleAddNest = async (newNest) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.post(
//       `${baseURL}/api/nests`,
//       { name: newNest },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (res.status === 201) {
//       console.log("Nest created successfully");
//       showToast("Nest created successfully", "success");
//       window.location.reload(); // Reload to fetch updated nests
//     }
//   } catch (err) {
//     console.error("Error creating nest:", err.response?.data || err.message);
//   }
// };

// const handleUpdateNest = async (editingNest, nestId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.patch(
//       `${baseURL}/api/nests/${nestId}`,
//       { name: editingNest },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (res.status === 200) {
//       console.log("Nest updated successfully");
//       showToast("Nest updated successfully", "success");
//       window.location.reload(); // Reload to fetch updated nests
//     }
//   } catch (err) {
//     console.error("Error creating nest:", err.response?.data || err.message);
//   }
// };

// const handleDeleteNest = async (selectedNestId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.delete(`${baseURL}/api/nests/${selectedNestId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (res.status === 200) {
//       console.log("Nest deleted successfully");
//       showToast("Nest deleted successfully", "success");
//       window.location.reload(); // Reload to fetch updated nests
//     }
//   } catch (err) {
//     console.error("Error creating nest:", err.response?.data || err.message);
//   }
// };

// const handleAddTask = async (newTask, selectedNestId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.post(
//       `${baseURL}/api/nests/${selectedNestId}/tasks`,
//       { title: newTask },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (res.status === 201) {
//       showToast("Task added successfully", "success");
//       console.log("Task added successfully");
//       window.location.reload();
//     }
//   } catch (err) {
//     console.error("Error creating nest:", err.response?.data || err.message);
//   }
// };

// const handleUpdateTask = async (editingTask ,selectedNestId ,taskId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.patch(
//       `${baseURL}/api/nests/${selectedNestId}/${taskId}`,
//       { title: editingTask },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (res.status === 201) {
//       console.log("Task updated successfully");
//       showToast("Task updated successfully", "success");
//       window.location.reload();
//     }
//   } catch (err) {
//     console.error("Error creating nest:", err.response?.data || err.message);
//   }
// };

// const handleDeleteTask = async (selectedNestId, taskId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.delete(
//       `${baseURL}/api/nests/${selectedNestId}/${taskId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (res.status === 200) {
//       console.log("Task deleted successfully");
//       showToast("Task deleted successfully", "success");
//       window.location.reload(); 
//     }
//   } catch (err) {
//     console.error("Error creating nest:", err.response?.data || err.message);
//   }
// };

// const handleCheckboxChange = async (selectedNestId, task) => {
//   try {
//     const token = localStorage.getItem("token");
//     await axios.patch(
//       `${baseURL}/api/nests/${selectedNestId}/${task._id}`,
//       { completed: !task.completed },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     window.location.reload();
//   } catch (err) {
//     console.error(
//       "Error updating task completion:",
//       err.response?.data || err.message
//     );
//   }
// };

// const api = {
//   handleAddNest,
//   handleUpdateNest,
//   handleDeleteNest,
//   handleAddTask,
//   handleUpdateTask,
//   handleDeleteTask,
//   handleCheckboxChange,
// };

// export default api;
