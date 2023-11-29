import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import Post from "@/components/Post";
import TopAppBar from "@/components/TopAppBar";
import { useRouter } from "next/router";
import { MdSend } from "react-icons/md";
import { UserContext } from "@/services/userContext";

const Home = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email);

      const fetchTweets = async () => {
        try {
          setLoading(true);
          const response = await fetch("/api/tweet");

          if (response.ok) {
            const data = await response.json();
            setPosts(data.data.tweets);
            setLoading(false);
          } else {
            console.error("Failed to fetch tweets");
          }
        } catch (error) {
          console.error("Error fetching tweets:", error);
        }
      };

      fetchTweets();
    }
  }, [user]);

  const addPost = async () => {
    if (newPost.trim() !== "") {
      const newPostObject = {
        tweet: newPost,
        name: user.name,
        email: email,
      };

      try {
        const response = await fetch("/api/tweet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPostObject),
        });

        if (response.ok) {
          const data = await response.json();
          setPosts([...posts, data.data.tweet]);
          setNewPost("");
        } else {
          // Handle error
          console.error("Failed to create tweet");
        }
      } catch (error) {
        console.error("Error creating tweet:", error);
      }
    }
  };

  return (
    <>
      <TopAppBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
          height: "80vh",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginBottom: "20px",
            marginTop: "2rem",
            padding: "2rem 0",
            overflow: "auto",
          }}
        >
          {loading ? (
            <Typography
              style={{
                width: "100%",
                textAlign: "center",
                color: "#fff",
                fontSize: "20px",
                marginTop: "20px",
                fontWeight: "bold",
              }}
            >
              Loading...
            </Typography>
          ) : (
            posts.map((post, index) => (
              <Post
                key={index}
                text={post.tweet}
                username={post.name}
                timestamp={post.timeStamp}
              />
            ))
          )}
        </Box>

        <AppBar
          position="fixed"
          color="primary"
          sx={{
            backgroundColor: "black",
            width: "100%",
            top: "auto",
            bottom: 0,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <img
                src="/images/main.jpg"
                alt="pain hub logo"
                style={{
                  height: "50px",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ width: "90%", padding: "10px" }}>
                <TextField
                  fullWidth
                  placeholder="What's happening?"
                  variant="outlined"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  sx={{
                    color: "white",
                    background: "#333",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#555",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#555",
                    },
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                      placeholder: "white",
                    },
                  }}
                />
              </div>
              <div
                style={{
                  width: "10%",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <IconButton variant="contained" onClick={addPost}>
                  <MdSend color="#fff" size={30} />
                </IconButton>
              </div>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Home;
