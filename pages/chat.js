import MessageBubble from "@/components/MessageBubble";
import { UserContext } from "@/services/userContext";
import { Typography, Container, Grid } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";

const headingStyle = {
  color: "#9c9c9c",
  fontSize: "2em",
  marginBottom: "10px",
};

const listItemStyle = {
  listStyle: "none",
  fontSize: "1.2em",
  padding: "8px",
  margin: "4px 0",
  background: "#3b3b3b",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  transition: "background 0.3s ease",
  cursor: "pointer",
};

export default function Chat() {
  const { user } = useContext(UserContext);
  const messagesRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (connected) {
      const newSocket = io("/api/chat", {
        withCredentials: true,
      });
      setSocket(newSocket);

      newSocket.on("update users", (users) => {
        setActiveUsers(users);
      });

      newSocket.on("chat message", (data) => {
        const { userId, msg, timestamp } = data;
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            userId,
            msg,
            timestamp,
          },
        ]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [connected]);

  const handleConnect = () => {
    setConnected(true);
  };

  const handleDisconnect = () => {
    setConnected(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value.trim();
    if (message.length > 0) {
      socket.emit("chat message", {
        msg: message,
        userId: user.name,
      });
      e.target.elements.message.value = "";
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

  return (
    <div>
      {!connected ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <div>
            <h1>Chat</h1>
            <button onClick={handleConnect}>Connect</button>
          </div>
        </div>
      ) : (
        <Grid container>
          <div id="side-app">
            <button
              onClick={handleDisconnect}
              style={{
                marginLeft: "10px",
              }}
            >
              Disconnect
            </button>
            <h2 style={headingStyle}>Active Users</h2>
            <ul>
              {activeUsers.map((user, index) => (
                <li key={index} style={listItemStyle}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        background: "#2ecc71",
                      }}
                    ></div>
                    <Typography>{user}</Typography>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div id="chat-section">
            <ul id="messages" ref={messagesRef}>
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={
                    message.userId === user.name
                      ? "currentUserMessage"
                      : "otherUserMessage"
                  }
                >
                  <div className="message-container">
                    {message.userId !== user.name && (
                      <div className="message-wrapper">
                        <span className="username">{message.userId}</span>
                      </div>
                    )}
                    <MessageBubble
                      sender={message.userId === user.name}
                      message={message.msg}
                      timestamp={formatTimestamp(message.timestamp)}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <form id="form" onSubmit={handleSubmit}>
              <input
                id="m"
                autoComplete="off"
                placeholder="Type your message..."
                name="message"
              />
            </form>
          </div>
        </Grid>
      )}
    </div>
  );
}
