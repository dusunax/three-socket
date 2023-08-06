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

let clientCubes = [];
let clientId;
let clientName;
let colorCount = 0;

const BOX_COLORS = ["red", "green", "blue"];
const DEFAULT_GEOMETRY = "dice";
const DEFAULT_OPTION = {
  geometry: DEFAULT_GEOMETRY,
  id: "",
  name: "",
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  visible: true,
  color: "",
};

// 새로운 클라이언트가 접속했을 때
io.on("connection", (socket) => {
  socket.on("id", (newId) => {
    clientId = newId.current;
    clientName = newId.name;
    console.log("connect: ", clientId);

    // if (!existingIds.has(clientId)) {
    existingIds.add(clientId);
    const length = clientCubes.length;
    console.log(length, clientCubes);

    clientCubes.unshift({
      ...DEFAULT_OPTION,
      position: { ...DEFAULT_OPTION.position, y: length },
      rotation: { ...DEFAULT_OPTION.rotation, y: length % 2 },
      id: clientId,
      name: DEFAULT_GEOMETRY + colorCount,
      color: BOX_COLORS[colorCount % BOX_COLORS.length],
    });
    colorCount++;
    // }

    io.emit("idChange", clientCubes);
  });

  // 클라이언트가 메시지를 보냈을 때
  socket.on("message", (data) => {
    console.log("클라이언트가 메시지를 보냈습니다:", data);
    messages.push({ name: clientName || clientId.slice(0, 4), text: data });

    // 모든 클라이언트에게 메시지 전송
    io.emit("message", messages);
  });

  socket.on("disconnect", () => {
    existingIds.delete(clientId);
    const newClientCubes = clientCubes
      .filter((cube) => cube.id !== socket.id)
      .reverse()
      .map((cube, idx) => ({
        ...cube,
        position: { ...cube.position, y: idx },
      }));

    console.log(
      "클라이언트가 연결을 해제했습니다. ID:",
      socket.id,
      "\n현재 ids",
      newClientCubes
    );

    clientCubes = newClientCubes;
    io.emit("idChange", newClientCubes);
  });
});

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
