const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const http = require("http");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const port = 3001;
const messages = [];
const existingIds = new Set(); // Use a Set to store existing ids

// 새로운 클라이언트가 접속했을 때
io.on("connection", (socket) => {
  socket.on("id", (newId) => {
    console.log("connect: ", newId);
    existingIds.add(newId);

    io.emit("idsChange", Array.from(existingIds));
  });

  // 클라이언트가 메시지를 보냈을 때
  socket.on("message", (data) => {
    console.log("클라이언트가 메시지를 보냈습니다:", data);
    messages.push(data);

    // 모든 클라이언트에게 메시지 전송
    io.emit("message", messages);
  });

  socket.on("disconnect", () => {
    existingIds.delete(socket.id);
    console.log(
      "클라이언트가 연결을 해제했습니다. ID:",
      socket.id,
      existingIds
    );

    io.emit("idsChange", Array.from(existingIds));
  });
});

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
