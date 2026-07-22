const baseUrl = "/api/boards";

export const getAll = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to get boards");
  }

  return res.json();
};

export const create = async (payload) => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to create board");
  }

  return res.json();
};
