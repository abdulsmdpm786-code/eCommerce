import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isToken, setIsToken] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (e) {
        console.error("Failed to decode token", e);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [isToken]);

  return (
    <AuthContext.Provider value={{ isToken, setIsToken, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

