import { apiFetch } from "../../shared/api/apiClient.ts";

export const getAllColumns = (boardId: string) => {
  return apiFetch(`/api/boards/${boardId}/columns`, {
    method: "GET",
  });
};

export const createColumn = (boardId: string, payload: { title: string }) => {
  return apiFetch(`/api/boards/${boardId}/columns`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
