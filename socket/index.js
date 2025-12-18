import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const app = express();
const server = http.createServer(app);
// FIXED SOCKET.IO CORS
const io = new Server(server, {
  cors: {
    origin: "https://multivendor-eshop.vercel.app",
    credentials: true,
  },
});

//cors config
// const corsOptions = {
//   origin: ["http://localhost:5173", "https://your-frontend-domain.com"],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// };

// FIXED EXPRESS CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://multivendor-eshop.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Everything is ok");
});

let users = [];
const addUser = (userId, socketId) => {
  //If the user does not exist(using some method to check if exist or not), then push them into the array.
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

//Define a message object with a seen property
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

// server.js (socket part)
io.on("connection", (socket) => {
  console.log("a user is connected", socket.id);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // broadcast updated online list
    io.emit("getUsers", users);
  });

  // store messages temporarily per receiver (optional)
  const messages = {};

  // IMPORTANT: expect conversationId from client and include it when emitting
  socket.on("sendMessage", ({ senderId, receiverId, text, conversationId, images }) => {
    const message = {
      senderId,
      receiverId,
      text,
      images: images || [],
      conversationId: conversationId || null,
      createdAt: Date.now(),
      // you can add an id from DB if you saved the message before emitting
    };

    // store in in-memory object (optional)
    if (receiverId) {
      if (!messages[receiverId]) messages[receiverId] = [];
      messages[receiverId].push(message);
    }

    // emit to the receiver (if online)
    const receiverUser = getUser(receiverId);
    if (receiverUser?.socketId) {
      io.to(receiverUser.socketId).emit("getMessage", message);
    }

    // also emit to the sender socket (so sender gets the message instantly too)
    // this helps multi-tab / instant UI update even before DB responds
    io.to(socket.id).emit("getMessage", message);
  });

  // update last message broadcast
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId, conversationId }) => {
    io.emit("emitLastMessage", { lastMessage, lastMessageId, conversationId });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected!", socket.id);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});


server.listen(process.env.PORT || 4000, () => {
  console.log(`The server is running on port ${process.env.PORT || 4000}`);
});
