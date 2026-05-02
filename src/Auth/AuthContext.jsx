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

// import { createContext, useState } from "react";

// // 1. MUST have the parentheses () at the end here!
// export const AuthContext = createContext(); 

// export const AuthProvider = ({ children }) => {
//   const [isToken, setIsToken] = useState(!!localStorage.getItem("token"));

//   return (
//     // 2. MUST have a capital 'P' in Provider here!
//     <AuthContext.Provider value={{ isToken, setIsToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };