import { getToken } from "./tokenStorage";

export const getAll = async (columnId: string) => {
  const res = await fetch(`/api/tasks?columnId=${columnId}`);
  if (!res.ok) throw new Error("Failed to get tasks");
  return res.json();
};

export const create = async (payload: {
  title: string;
  description: string;
}) => {
  const token = getToken();

  const res = await fetch(`/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
