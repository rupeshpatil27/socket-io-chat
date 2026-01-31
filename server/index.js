import { createServer } from "node:http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const ROOM = "group";

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("joinRoom", async (userName) => {
    console.log(`${userName} is joining the group.`);
    await socket.join(ROOM);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>hello</h1>");
});

server.listen(5000, () => {
  console.log("server running at http://localhost:5000");
});
