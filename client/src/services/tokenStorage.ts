export const saveToken = (token: string, remember: boolean) => {
  return remember
    ? localStorage.setItem("token", token)
    : sessionStorage.setItem("token", token);
};

export const getToken = (): string | null => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
