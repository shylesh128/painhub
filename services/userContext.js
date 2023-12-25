import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const router = useRouter();

  const isLoggedIn = async () => {
    setLoading(true);
    const storedToken = cookies.pain;
    console.log(storedToken);
    try {
      const response = await axios.post(
        "/api/isLoggedIn",
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUser(response.data.user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Login failed:", error);
      router.push("/login");
      setLoading(false);
    }
  };

  const login = async (email) => {
    if (email) {
      try {
        const response = await axios.post("/api/login", {
          email: email,
        });
        if (response.status === 200) {
          console.log(response.data);
          setUser(response.data.user);
          setCookie("pain", response.data.token);
          router.push("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      console.log(response.data.data.users);
      return response.data.data.users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const logout = () => {
    setUser(null);
    removeCookie("pain");
    router.push("/login");
  };

  const contextValue = {
    user,
    login,
    logout,
    loading,
    fetchUsers,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
