import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
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
          console.log(response.data.user);
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

  const createNewPain = async (newPainObject) => {
    try {
      const response = await axios.post("/api/createPain", newPainObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      console.log("data", data);
    } catch (error) {
      console.error("Error creating tweet:", error);
    }
  };

  const getPains = async () => {
    const response = await axios.get("/api/pain", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("response", response.data.data);
    return response.data.data;
  };

  const addThreadMessage = async (threadMessageObject) => {
    try {
      const response = await axios.post("/api/thread", threadMessageObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("response", response.data.users);
      setUsers(response.data.users);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getThreadsById = async (threadId) => {
    try {
      const response = await axios.get(`/api/thread/${threadId}`);
      console.log("response:", response.data.data.threads);
      return response.data.data.threads;
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getUsers();
  }, [token]);

  const contextValue = {
    user,
    users,
    login,
    logout,
    loading,
    fetchUsers,
    fetchTweets,
    addPost,
    createNewPain,
    getPains,
    addThreadMessage,
    getThreadsById,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
