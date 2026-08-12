import { apiFetch } from "../../shared/api/apiClient.ts";

const baseUrl = "/api/auth";

export const signUp = (userObject: {
  email: string;
  password: string;
  name: string;
}) => {
  return apiFetch(`${baseUrl}/sign-up`, {
    method: "POST",
    body: JSON.stringify(userObject),
  });
};

export const signIn = async (userObject: {
  email: string;
  password: string;
}) => {
  return apiFetch(`${baseUrl}/sign-in`, {
    method: "POST",
    body: JSON.stringify(userObject),
  });
};
