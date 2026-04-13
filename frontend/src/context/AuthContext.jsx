import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api, setAuthToken } from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("authUser");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user?.token) {
      setAuthToken(user.token);
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      setAuthToken(null);
      localStorage.removeItem("authUser");
    }
  }, [user]);

  const signup = async (payload) => {
    const { data } = await api.post("/users/signup", payload);
    setUser(data);
    return data;
  };

  const login = async (payload) => {
    const { data } = await api.post("/users/login", payload);
    setUser(data);
    return data;
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      isAdmin: user?.role === "admin",
      signup,
      login,
      logout
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }
  return context;
};
