import { apiFetch } from "./apiClient";

export const getAllTasks = (columnId: string) => {
  return apiFetch(`/api/tasks?columnId=${columnId}`);
};

export const createTask = (payload: {
  title: string;
  description: string;
}) => {
  return apiFetch(`/api/tasks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
