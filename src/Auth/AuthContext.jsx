import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isToken, setIsToken] = useState(!!localStorage.getItem("token"));

  return (
    <AuthContext.Provider value={{ isToken, setIsToken }}>
      {children}
    </AuthContext.Provider>
  );
};

