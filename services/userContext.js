import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [token, setToken] = useState(cookies.pain);
  const router = useRouter();

  const isLoggedIn = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/isLoggedIn",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
          setUser(response.data.user);
          setCookie("pain", response.data.token);
          setToken(response.data.token);
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
    setToken(null);
    removeCookie("pain");
    router.push("/login");
  };

  const fetchTweets = async (page) => {
    try {
      const response = await axios.get(`/api/tweet?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      return [...data.data.tweets];
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  const addPost = async (newPostObject) => {
    try {
      const response = await axios.post("/api/tweet", newPostObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      return data.data.tweet;
    } catch (error) {
      console.error("Error creating tweet:", error);
    }
  };

  const contextValue = {
    user,
    login,
    logout,
    loading,
    fetchUsers,
    fetchTweets,
    addPost,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
