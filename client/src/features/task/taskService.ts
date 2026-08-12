import { apiFetch } from "./apiClient";

export const getAllTasks = (columnId: string) => {
  return apiFetch(`/api/columns/${columnId}/tasks`);
};

export const createTask = (
  columnId: string,
  payload: { title: string; description: string },
) => {
  return apiFetch(`/api/columns/${columnId}/tasks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
