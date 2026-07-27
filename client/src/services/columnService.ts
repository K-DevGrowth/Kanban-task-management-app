import { getToken } from "./tokenStorage";

export const getAll = async (boardId: string) => {
  const res = await fetch(`/api/boards/${boardId}/columns`);
  if (!res.ok) throw new Error("Failed to get columns");
  return res.json();
};

export const create = async (boardId: string, payload: { title: string }) => {
  const token = getToken();

  const res = await fetch(`/api/boards/${boardId}/columns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
