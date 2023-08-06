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
    clientName = DEFAULT_GEOMETRY + colorCount;

    // 접속 id
    console.log("connect: ", clientId);

    existingIds.add(clientId);
    const length = clientCubes.length;

    clientCubes.unshift({
      ...DEFAULT_OPTION,
      position: { ...DEFAULT_OPTION.position, y: length },
      rotation: { ...DEFAULT_OPTION.rotation, y: length % 2 },
      id: clientId,
      name: clientName,
      color: BOX_COLORS[colorCount % BOX_COLORS.length],
    });
    colorCount++;

    io.emit("idChange", clientCubes);
  });

  // 클라이언트가 메시지를 보냈을 때
  socket.on("message", (data) => {
    console.log("클라이언트가 메시지를 보냈습니다:", data);
    messages.push({ name: clientName || clientId.slice(0, 4), text: data });

    // 모든 클라이언트에게 메시지 전송
    io.emit("message", messages);
  });

  // 클라이언트가 업데이트 이벤트를 보냈을 때
  socket.on("update", (data) => {
    const { id, geometry, position, rotation } = data;

    // 해당 클라이언트의 정보 업데이트
    const updatedClient = clientCubes.find((cube) => cube.id === id);

    if (updatedClient) {
      clientName = geometry + colorCount;
      updatedClient.name = clientName;
      updatedClient.geometry = geometry;
      updatedClient.position = position;
      updatedClient.rotation = rotation;
    }

    // 모든 클라이언트에게 업데이트된 클라이언트 정보 브로드캐스팅
    io.emit("idChange", clientCubes);
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
