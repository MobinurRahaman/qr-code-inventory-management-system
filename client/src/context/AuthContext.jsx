import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axiosInstance from "../config/axiosConfig";

export const AuthContext = createContext();

/**
 * Provider component for managing authentication state.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element} AuthProvider component.
 */
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  // Auto login on app startup if token is available
  useEffect(() => {
    if (!isLoggedIn) {
      // Get token from local storage
      const token = localStorage.getItem("token");

      axiosInstance
        .post("/auth/verify", { token })
        .then((res) => {
          setLogin(res.data);
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Sets user login state and stores token and userId in localStorage.
   * @param {object} data - Data containing token and userId.
   */
  const setLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user_id);
    setToken(data.token);
    setUserId(data.user_id);
    setIsLoggedIn(true);
  };

  /**
   * Logs out the user and clears localStorage.
   */
  const setLogout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("userId", null);
    setToken("");
    setUserId("");
    setIsLoggedIn(false);
  };

  const authContextValue = {
    isLoggedIn,
    setLogin,
    token,
    userId,
    setLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * Custom hook for accessing the authentication context.
 * @returns {object} Authentication context.
 */
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
