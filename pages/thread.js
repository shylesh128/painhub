import Margin from "@/components/Margin";
import Post from "@/components/Post";
import ModalStyle from "@/components/modals/ModalStyle";
import { UserContext } from "@/services/userContext";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useContext, useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { PageLayout } from "../components/PageLayout";

export default function Chat() {
  const {
    user,
    users,
    createNewPain,
    getPains,
    addThreadMessage,
    getThreadsById,
  } = useContext(UserContext);
  const messagesRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [pains, setPains] = useState([]);
  const [createPainModal, setCreatePainModal] = useState(false);
  const [painName, setPainName] = useState("");
  const [painDescription, setPainDescription] = useState("");
  const [activePain, setActivePain] = useState(null);
  const [tweets, setTweets] = useState([]);

  const handleCreatePain = async () => {
    const data = await createNewPain({
      name: painName,
      description: painDescription,
    });
    fetchPains();
    handleCloseNewModal();
  };

  const fetchPains = async () => {
    const arr = await getPains();
    setPains(arr);
    setActivePain(arr[0]);
  };

  useEffect(() => {
    fetchPains();
  }, []);

  const getUsername = (userID) => {
    const currentUser = users.find((user) => user._id === userID);
    return currentUser.name;
  };

  const fetchThreads = async () => {
    const arr = await getThreadsById(activePain._id);
    // console.log(arr);
    const updatedArr = arr.map((item) => {
      return {
        tweet: item.thread,
        name: getUsername(item.user),
        timeStamp: item.timeStamp,
      };
    });
    console.log(updatedArr);
    setTweets(updatedArr);
  };

  useEffect(() => {
    if (activePain) {
      fetchThreads();
    }
  }, [activePain]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Add this option to include AM/PM
    });
  };

  const handleCloseNewModal = () => {
    setCreatePainModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const message = messageInput.value.trim();

    if (message.length > 0) {
      const newPainObject = {
        thread: message,
        painId: activePain._id,
      };
      console.log(newPainObject);
      const res = await addThreadMessage(newPainObject);
      fetchThreads();

      messageInput.value = "";
    }
  };

  const handleSelectPain = (pain) => {
    setActivePain(pain);
  };

  return (
    <div>
      <Head>
        <title>PainHub | Threads</title>
      </Head>
      <Grid container>
        <Box
          id="side-app"
          sx={{
            height: "90vh",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <Typography
                style={{
                  color: "#9c9c9c",
                  fontSize: "1.5em",
                  fontWeight: "600",
                }}
              >
                Create Pain
              </Typography>
            </div>

            <IconButton onClick={() => setCreatePainModal(true)}>
              <MdAdd color="white" size={30} />
            </IconButton>
          </div>

          <PageLayout
            pains={pains}
            handleSelectPain={handleSelectPain}
          ></PageLayout>
        </Box>
        <div id="chat-section">
          <Typography>{activePain?.name}</Typography>
          {/* <Typography>{activePain?.description}</Typography> */}

          <div id="messages">
            {tweets?.map((tweet, index) => (
              <Post
                key={index}
                text={tweet.tweet}
                username={tweet.name}
                timestamp={tweet.timeStamp}
              />
            ))}
          </div>

          <form id="form" onSubmit={handleSubmit}>
            <TextField
              id="m"
              autoComplete="off"
              placeholder="Type your message..."
              name="message"
              fullWidth
              sx={{
                boxShadow: "0 0.125rem 0.25rem 0 #00000040",
                borderRadius: "6.25rem",
                marginTop: "0",

                "& .MuiOutlinedInput-root": {
                  borderColor: "transparent",
                  borderRadius: "6.25rem",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
            />
          </form>
        </div>
      </Grid>
      <ModalStyle
        open={createPainModal}
        onClose={handleCloseNewModal}
        title={"Create New Pain Issue"}
      >
        <Margin />
        <TextField
          placeholder="Name"
          value={painName}
          onChange={(e) => setPainName(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            boxShadow: "0 0.125rem 0.25rem 0 #00000040",
            borderRadius: "0.25rem",
            marginTop: "0",
            backgroundColor: "#292929",

            "& .MuiOutlinedInput-root": {
              borderColor: "transparent",
              borderRadius: "6.25rem",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
        />
        <Margin />

        <TextField
          placeholder="Description"
          value={painDescription}
          onChange={(e) => setPainDescription(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          sx={{
            boxShadow: "0 0.125rem 0.25rem 0 #00000040",
            borderRadius: "0.25rem",
            marginTop: "0",
            backgroundColor: "#292929",

            "& .MuiOutlinedInput-root": {
              borderColor: "transparent",
              borderRadius: "6.25rem",
              color: "white",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "transparent",
              },
            },
          }}
        />

        <Margin />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#333",
              ":hover": {
                backgroundColor: "#333",
              },
            }}
            onClick={handleCreatePain}
          >
            Create
          </Button>
        </div>
      </ModalStyle>
    </div>
  );
}
