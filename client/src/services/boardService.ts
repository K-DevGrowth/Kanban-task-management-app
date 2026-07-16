const baseUrl = "/api/boards";

export const getAll = async () => {
  const res = await fetch(baseUrl);

  if (!res.ok) {
    throw new Error("Failed to get boards");
  }

  return res.json();
};
