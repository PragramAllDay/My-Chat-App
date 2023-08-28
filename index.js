const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();
app.use(cors());

const server = http.createServer(app);
const port = process.env.PORT;

const io = new Server(server, {
  cors: {
    origin: "https://ibrahims-chat-app.netlify.app",
    methods: ["GET", "POST"],
  },
});
app.get("/", function (req, res) {
  res.send("Hello from the root application URL");
});
io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User joined in room", data);
  });
  socket.on("send_message", (data) => {
    socket.to(data.RoomId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
app.get("/https://my-chat-app-production.up.railway.app/", function (req, res) {
  res.send("Hello from the root application URL");
});

server.listen(port, () => {
  console.log("Consol Running at", port);
});
