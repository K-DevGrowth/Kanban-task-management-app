import { useState } from "react";
import { createContext, useContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, serUser] = useState([]);

  const handleSignIn = async () => {
    
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useLoggedUser = () => useContext(UserContext);
