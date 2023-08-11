const { v4: uuidv4 } = require("uuid");

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
const rooms = [];
const existingIds = new Set();

let clientCubes = [];
let clientId;
let clientName;
let colorCount = 0;
let globalControl = {
  orbitPosition: [2, 2, 1.5],
  hostId: "",
  isChanging: false,
};

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
  // ------------------------------
  // 새 3d Object 생성 & 업데이트
  socket.on("newCube", (newId) => {
    clientId = newId;
    clientName = DEFAULT_GEOMETRY + colorCount;

    // 접속 id
    console.log("connect newCube: ", clientId);

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

    emitUpdateIntervalEvent(clientCubes, globalControl);
  });

  // 클라이언트가 업데이트 이벤트를 보냈을 때
  socket.on("updateInterval", (data) => {
    const { id, geometry, position, rotation } = data;
    // console.log("서버 업데이트 인터벌 >>>>>>>>>>", globalControl);
    globalControl.isChanging = false;

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
    emitUpdateIntervalEvent(clientCubes, globalControl);
  });

  socket.on("orbitPositionChange", (clientControl) => {
    console.log(globalControl.isChanging);
    if (globalControl.isChanging && clientControl.hostId !== clientId) return;

    clientControl.isChanging = true;
    globalControl = clientControl;

    console.log("글로벌: ", clientControl);
    emitOrbitPositionChangeEvent(clientControl);
  });

  // ------------------------------
  // 메시지 전송 & 수신
  // 클라이언트가 메시지를 보냈을 때
  socket.on("message", (data) => {
    console.log("클라이언트가 메시지를 보냈습니다:", data);

    messages.push({ ...data, nickname: clientName });
    console.log("메시지 목록:", messages);

    // 해당 방 클라이언트에게 메시지 전송
    // socket.to(data.id).emit("message", messages);
    io.emit("message", messages);
  });

  // ------------------------------
  // 방 생성 & 입장 & 퇴장
  // 클라이언트가 방에 입장할 때
  socket.on("createRoom", ({ title, nickname }) => {
    const roomId = uuidv4();
    socket.join(roomId);

    const room = {
      id: roomId,
      title: title,
      nickname: nickname,
    };
    rooms.push(room);

    console.log("새로운 방이 생성되었습니다. ID:", roomId);
    socket.emit("roomCreated", room);
  });

  // 클라이언트가 방에 입장할 때
  socket.on("joinRoom", ({ roomId, nickname }) => {
    socket.join(roomId);
    console.log(
      "클라이언트가 방에 입장했습니다. ID:",
      io.sockets.adapter.rooms.get(roomId)
    );
    io.emit("message", messages);

    // 클라이언트에게 입장한 방의 정보를 전달합니다.
    const roomInfo = {
      roomId,
      title: getRoomTitle(roomId), // 해당 방의 타이틀 정보를 가져옵니다.
      clients: Array.from(io.sockets.adapter.rooms.get(roomId)),
    };
    socket.emit("roomJoined", roomInfo);
  });

  // 클라이언트가 방에서 퇴장할 때
  // 여기에 작성

  // ------------------------------
  // 연결 종료
  // 클라이언트가 연결을 해제했을 때
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

    emitUpdateIntervalEvent(newClientCubes);
  });
});

server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

/** ID로부터 해당 방의 타이틀 정보를 가져오는 함수 */
function getRoomTitle(roomId) {
  const room = rooms.find((room) => room.id === roomId);
  return room ? room.title : "제목 없음";
}

// ------------------------------
// 이벤트 핸들러
// ------------------------------
/** 인터벌로 값 업데이트 */
function emitUpdateIntervalEvent(clientCubes, globalControl) {
  io.emit("updateServerData", { clientCubes, globalControl });
}

/** 카메라 위치 변화 */
function emitOrbitPositionChangeEvent(newControl) {
  io.emit("globalOrbitChange", newControl);
}

/** 두 3D 좌표값이 같은지 확인하는 함수 */
const checkTwo3DCoordinateEqual = (c1, c2) => {
  return (
    c1[0].toFixed(1) === c2[0].toFixed(1) ||
    c1[1].toFixed(1) === c2[1].toFixed(1) ||
    c1[2].toFixed(1) === c2[2].toFixed(1)
  );
};
