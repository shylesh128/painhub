import React, { useState, useEffect, useContext, useRef } from "react";
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
import { useRouter } from "next/router";
import { MdSend } from "react-icons/md";
import { UserContext } from "@/services/userContext";

const Tweet = () => {
  const { user, fetchTweets, addPost } = useContext(UserContext);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [tweets, setTweets] = useState([]);
  const [email, setEmail] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const fetchNewTweets = async () => {
    const res = await fetchTweets(page);
    setTweets([...tweets, ...res]);
  };

  const addNewTweet = async () => {
    if (newPost.trim() !== "") {
      const newPostObject = {
        tweet: newPost,
        name: user.name,
        email: email,
      };

      try {
        const response = await addPost(newPostObject);
        setTweets([response, ...tweets]);
        setNewPost("");
      } catch (error) {
        console.error("Error creating tweet:", error);
      }
    }
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      fetchNewTweets();
    }
  }, [user, page]);

  useEffect(() => {
    scrollToBottom();
  }, [tweets]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
          maxWidth: "600px",
          margin: "auto",
        }}
        ref={chatContainerRef}
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
            <div>
              {tweets.map((tweet, index) => (
                <Post
                  key={index}
                  text={tweet.tweet}
                  username={tweet.name}
                  timestamp={tweet.timeStamp}
                />
              ))}
            </div>
          )}
          <Box>
            <Button onClick={loadMore}>Load More</Button>
          </Box>
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
                <IconButton variant="contained" onClick={addNewTweet}>
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

export default Tweet;
