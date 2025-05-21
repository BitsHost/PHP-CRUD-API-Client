import React, { createContext, useState, useContext } from "react";
import { setAuthToken, setBasicAuth } from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authType, setAuthType] = useState(null);

  const login = ({ token, username, password, type }) => {
    setUser({ username });
    setAuthType(type);
    if (type === "jwt") setAuthToken(token);
    if (type === "basic") setBasicAuth(username, password);
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    setBasicAuth(null, null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authType }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}