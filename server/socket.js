const socketIo = require("socket.io");
const cookie = require("cookie");
const User = require("./models/userModel");
const jwt = require("jsonwebtoken");
const Message = require("./models/messageModel");
const connectionModel = require("./models/connectionModel");
const secretKey =
  "746d3de964867c223d8a97948f22987e66566d7b73e65f0b23221ac8174b986e";

module.exports = (httpServer) => {
  const io = socketIo(httpServer);

  const activePairs = [];
  const activeUsers = new Map();
  const marvelCharacters = [];

  io.of("/api/chat").on("connection", async (socket) => {
    try {
      const cookies = socket.handshake.headers.cookie;
      const parsedCookies = cookies ? cookie.parse(cookies) : {};
      const userCookie = parsedCookies.pain;

      if (!userCookie) {
        console.log("User disconnected because username is undefined");
        socket.disconnect(true);
        return;
      }

      const decoded = jwt.verify(userCookie, secretKey);
      const user = await User.findById(decoded.userId);

      let userId = user.name;
      let socketId = socket.id;

      // Disconnect the old socket if the user is already connected
      if (isUserAlreadyConnected(userId)) {
        console.log(
          `User ${userId} is already connected. Disconnecting old connection.`
        );
        const existingSocketId = getExistingSocketId(userId);

        // Check if the socket with the existingSocketId exists before disconnecting
        const existingSocket = io.of("/api/chat").sockets.get(existingSocketId);
        if (existingSocket) {
          existingSocket.disconnect(true);
        } else {
          console.log(`Socket with id ${existingSocketId} not found.`);
        }
      }

      // Create or add to a pair based on the current state
      if (
        activePairs.length === 0 ||
        activePairs[activePairs.length - 1].length === 2
      ) {
        activePairs.push([socketId]);
      } else {
        activePairs[activePairs.length - 1].push(socketId);
      }

      let currentPair = activePairs[activePairs.length - 1];

      socket.on("get active users", (callback) => {
        callback(Array.from(activeUsers.values()));
      });

      activeUsers.set(socketId, userId);
      console.log(`${userId} connected to chat in pair ${activePairs.length}`);

      const newConnection = await connectionModel.create({
        username: userId,
        timeStamp: new Date().toISOString(),
        text: "Connected to chat",
        pair: activePairs.length,
      });

      io.of("/api/chat").emit("update users", Array.from(activeUsers.values()));

      socket.on("disconnect", () => {
        console.log(`${userId} disconnected from chat`);

        // Check if the user is in the activeUsers map before deleting
        if (activeUsers.has(socketId)) {
          activeUsers.delete(socketId);
        }

        // Remove the user from the current pair
        const index = currentPair.indexOf(socketId);
        if (index !== -1) {
          currentPair.splice(index, 1);
        }

        marvelCharacters.push(userId);
        io.of("/api/chat").emit(
          "update users",
          Array.from(activeUsers.values())
        );
      });

      socket.on("chat message", async (data) => {
        const timestamp = new Date().toISOString();

        // Save the message to the database
        const message = new Message({
          username: data.userId,
          timeStamp: timestamp,
          text: data.msg,
          pair: activePairs.length,
          to: getReceiverUsername(currentPair, socketId),
        });

        try {
          await message.save();
        } catch (error) {
          console.error("Error saving message to the database:", error.message);
        }

        // Broadcast the message to all members of the current pair
        currentPair.forEach((memberSocketId) => {
          io.of("/api/chat").to(memberSocketId).emit("chat message", {
            userId: data.userId,
            msg: data.msg,
            timestamp,
          });
        });
      });
    } catch (error) {
      console.error("Error during socket connection:", error.message);
      // Handle the error as needed
    }
  });

  function getReceiverUsername(pair, senderSocketId) {
    const receiverSocketId = pair.find(
      (socketId) => socketId !== senderSocketId
    );
    return activeUsers.get(receiverSocketId) || "Unknown";
  }

  function isUserAlreadyConnected(username) {
    return Array.from(activeUsers.values()).includes(username);
  }

  function getExistingSocketId(username) {
    for (const [existingSocketId, existingUsername] of activeUsers) {
      if (existingUsername === username) {
        return existingSocketId;
      }
    }
    return null;
  }

  return io;
};
