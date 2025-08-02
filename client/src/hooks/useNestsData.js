import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../store/AuthContext";
import { showToast } from "../utils/toast";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export function useNestsData() {
  const { token, user } = useAuth();
  const userId = user?.id || user?._id || "me";
  const qc = useQueryClient();
  const key = ["nests", userId];
  const headers = { Authorization: `Bearer ${token}` };

  // ---- Load nests (array with tasks) ----
  const {
    data: nests = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: key,
    queryFn: async () => {
      const res = await axios.get(`${baseURL}/api/nests`, { headers });
      return res.data ?? [];
    },
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });

  // Select first nest by default
  const [selectedNestId, setSelectedNestId] = useState(null);
  useEffect(() => {
    if (selectedNestId == null && nests.length > 0) {
      setSelectedNestId(nests[0]._id);
    }
  }, [selectedNestId, nests]);

  // ---- Mutations (just refetch after success) ----
  const addNest = useMutation({
    mutationFn: (name) =>
      axios.post(`${baseURL}/api/nests`, { name }, { headers }),
    onSuccess: () => {
      showToast("Nest created", "success");
      qc.invalidateQueries({ queryKey: key });
    },
  });

  const updateNest = useMutation({
    mutationFn: ({ nestId, name }) =>
      axios.patch(`${baseURL}/api/nests/${nestId}`, { name }, { headers }),
    onSuccess: () => {
      showToast("Nest updated", "success");
      qc.invalidateQueries({ queryKey: key });
    },
  });

  const deleteNest = useMutation({
    onMutate: async (nestId) => {
      const current = qc.getQueryData(key) || [];
      if (selectedNestId === nestId) {
        const next = current.find((n) => n._id !== nestId);
        setSelectedNestId(next?._id ?? null);
      }
    },
    mutationFn: (nestId) =>
      axios.delete(`${baseURL}/api/nests/${nestId}`, { headers }),
    onSuccess: () => {
      showToast("Nest deleted", "success");
      qc.invalidateQueries({ queryKey: key });
    },
  });

  const addTask = useMutation({
    mutationFn: ({ nestId, title }) =>
      axios.post(
        `${baseURL}/api/nests/${nestId}/tasks`,
        { title },
        { headers }
      ),
    onSuccess: () => {
      showToast("Task added", "success");
      qc.invalidateQueries({ queryKey: key });
    },
  });

  const updateTask = useMutation({
    mutationFn: ({ nestId, taskId, title }) =>
      axios.patch(
        `${baseURL}/api/nests/${nestId}/${taskId}`,
        { title },
        { headers }
      ),
    onSuccess: () => {
      showToast("Task updated", "success");
      qc.invalidateQueries({ queryKey: key });
    },
  });

  const deleteTask = useMutation({
    mutationFn: ({ nestId, taskId }) =>
      axios.delete(`${baseURL}/api/nests/${nestId}/${taskId}`, { headers }),
    onSuccess: () => {
      showToast("Task deleted", "success");
      qc.invalidateQueries({ queryKey: key });
    },
  });

  const toggleTask = useMutation({
    mutationFn: ({ nestId, taskId, nextCompleted }) =>
      axios.patch(
        `${baseURL}/api/nests/${nestId}/${taskId}`,
        { completed: nextCompleted },
        { headers }
      ),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: key });
    },
  });

  // Expose simple functions that match your child props
  return {
    nests,
    isLoading,
    isError,
    selectedNestId,
    setSelectedNestId,

    addNest: (name) => {
      if (!name?.trim()) return showToast("Nest name is required", "error");
      addNest.mutate(name);
    },

    updateNest: (nestId, name) => {
      if (!nestId || !name?.trim()) {
        return showToast("Nest ID and name are required", "error");
      }
      updateNest.mutate({ nestId, name });
    },

    deleteNest: (nestId) => {
      if (!nestId) return showToast("Nest ID is required", "error");
      deleteNest.mutate(nestId);
    },

    addTask: (nestId, title) => {
      if (!nestId || !title?.trim()) {
        return showToast("Nest ID and task title are required", "error");
      }
      addTask.mutate({ nestId, title });
    },

    updateTask: (nestId, taskId, title) => {
      if (!nestId || !taskId || !title?.trim()) {
        return showToast("Nest ID, task ID, and title are required", "error");
      }
      updateTask.mutate({ nestId, taskId, title });
    },

    deleteTask: (nestId, taskId) => {
      if (!nestId || !taskId) {
        return showToast("Nest ID and task ID are required", "error");
      }
      deleteTask.mutate({ nestId, taskId });
    },

    toggleTask: (nestId, task) => {
      if (!nestId || !task?._id) {
        return showToast("Nest ID and valid task are required", "error");
      }
      toggleTask.mutate({
        nestId,
        taskId: task._id,
        nextCompleted: !task.completed,
      });
    },
  };
}
