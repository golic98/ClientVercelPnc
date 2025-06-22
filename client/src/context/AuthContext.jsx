import { createContext, useState, useContext, useEffect } from "react";
import { 
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  getUsersAdmin,
  deleteUserAdmin,
  getOneProfileUser,
  updateOneProfile,
  addPayVigilanceFromUser,
  getAllUsersForUser,
  registerRequestByAdmin
} from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe estar dentro del provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [getAdminUsers, setGetAdminUsers] = useState([]);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pay, setPay] = useState(null);

  const persistToken = (token) => {
    Cookies.set("token", token, {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
    });
  };

  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      persistToken(res.data.token);
      setUser(res.data);
      setIsAuthenticate(true);
    } catch (error) {
      const data = error.response?.data;
      setErrors(Array.isArray(data) ? data : [data.message || data]);
    }
  };

  const signin = async (credentials) => {
    try {
      const res = await loginRequest(credentials);
      persistToken(res.data.token);
      setUser(res.data);
      setIsAuthenticate(true);
    } catch (error) {
      const data = error.response?.data;
      setErrors(Array.isArray(data) ? data : [data.message || data]);
    }
  };

  const createUser = async (userData) => {
    try {
      const res = await registerRequestByAdmin(userData);
      setUser(res.data);
      setIsAuthenticate(true);
    } catch (error) {
      setErrors(error.response?.data || [error.message]);
    }
  };

  const logout = () => {
    Cookies.remove("token", { path: "/" });
    setUser(null);
    setIsAuthenticate(false);
  };

  const getUsers = async () => {
    try {
      const res = await getUsersAdmin();
      setGetAdminUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await getAllUsersForUser();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await deleteUserAdmin(id);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const getOneProfile = async (id) => {
    try {
      const res = await getOneProfileUser(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProfile = async (id, profile) => {
    try {
      await updateOneProfile(id, profile);
    } catch (error) {
      console.error(error);
    }
  };

  const addPay = async (payData) => {
    try {
      const res = await addPayVigilanceFromUser(payData);
      setPay(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Limpiar errores automáticamente
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Verificar token al iniciar la app
  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("token");
      if (!token) {
        setIsAuthenticate(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(token);
        if (res.data) {
          setUser(res.data);
          setIsAuthenticate(true);
        } else {
          setUser(null);
          setIsAuthenticate(false);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
        setIsAuthenticate(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        createUser,
        logout,
        getUsers,
        getAllUsers,
        deleteUser,
        getOneProfile,
        updateProfile,
        addPay,
        user,
        users,
        getAdminUsers,
        isAuthenticate,
        loading,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
