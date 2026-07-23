const baseUrl = "/api/boards";

export const getAll = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to get boards");
  }
  return res.json();
};

export const getOne = async (id: string) => {
  const res = await fetch(`${baseUrl}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to get board");
  }

  return res.json();
};

export const create = async (payload, token: string) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create board");
  }

  return res.json();
};
