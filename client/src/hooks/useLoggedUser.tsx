import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "../services/tokenStorage";
import { getMe } from "../services/authService";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const token = getToken();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(token),
    enabled: !!token,
    retry: false,
  });

  const user = data?.data?.user ?? null;
  const loading = !!token && isLoading;

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useLoggedUser = () => useContext(UserContext);
