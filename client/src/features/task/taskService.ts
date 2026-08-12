import { apiFetch } from "../../shared/api/apiClient.ts";

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

export const updateTask = (taskId: string, payload: { columnId?: string, order?: number }) => {
  return apiFetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  })
}
