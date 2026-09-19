import { getCurrentUser, loginUser, registerUser } from "../utils/api";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "./AuthContext";

const TOKEN_KEY = "shoporaToken";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_KEY)),
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    getCurrentUser(token)
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const register = async (userData) => {
    return registerUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
