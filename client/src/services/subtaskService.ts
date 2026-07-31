import { getToken } from "./tokenStorage";

export const getAllSubtasks = async (taskId: string) => {
  const res = await fetch(`/api/tasks/${taskId}/subtasks`);

  const subtasks = await res.json();
  return subtasks;
};

export const createSubtask = async (
  taskId: string,
  payload: { title: string; isDone: boolean },
) => {
  const token = getToken();

  const res = await fetch(`/api/tasks/${taskId}/subtasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const newSubtask = await res.json();
  return newSubtask;
};
