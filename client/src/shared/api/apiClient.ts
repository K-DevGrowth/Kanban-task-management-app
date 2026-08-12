import { getToken } from "../../features/auth/tokenStorage.ts";

export const apiFetch = async (path: string, options: RequestInit = {}) => {
  const token = getToken();

  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body.message || `Request failed with status ${res.status}`);
  }

  return body.data;
};
