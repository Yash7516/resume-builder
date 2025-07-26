import axios from "axios";
import React, { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error("User not authorized:", error);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const updateUser = async (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };
  return (
    <UserContext.Provider value={{ user, loading, clearUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
