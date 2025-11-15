import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserApi } from "../apis/userApi";

// Create the context
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user from API
  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUserApi();
      const data = response.data;
      if (response.status === 200) {
        setUser(data);
      } else if (response.status === 401) {
      } else {
        console.log(response.status);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
