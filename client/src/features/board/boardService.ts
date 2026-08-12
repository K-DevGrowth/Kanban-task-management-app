import { apiFetch } from "../../shared/api/apiClient.ts";

const baseUrl = "/api/boards";

export const getAllBoards = () => {
  return apiFetch(baseUrl, {
    method: "GET",
  });
};

export const getOneBoard = (id: string) => {
  return apiFetch(`${baseUrl}/${id}`, {
    method: "GET",
  });
};

export const createBoard = (payload: { title: string }) => {
  return apiFetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const updateBoard = (id: string, payload: { title: string }) => {
  return apiFetch(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
};
