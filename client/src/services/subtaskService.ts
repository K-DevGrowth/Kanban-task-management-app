import { apiFetch } from "./apiClient";

export const getAllSubtasks = (taskId: string) => {
  return apiFetch(`/api/tasks/${taskId}/subtasks`);
};

export const createSubtask = (
  taskId: string,
  payload: { title: string; isDone: boolean },
) => {
  return apiFetch(`/api/tasks/${taskId}/subtasks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateSubtask = (subtaskId: string, payload: { isDone: boolean }) => {
  return apiFetch(`/api/subtasks/${subtaskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
