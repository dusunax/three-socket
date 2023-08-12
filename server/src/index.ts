import { v4 as uuidv4 } from "uuid";
import express, { Application, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

interface Message {
  message: string;
  nickname: string;
  time: string;
  roomId: string;
}

interface Room {
  id: string;
  title: string;
  nickname: string;
}

interface ClientCube {
  geometry: string;
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  visible: boolean;
  color: string;
}

interface Client {
  id: string | undefined;
  name: string | undefined;
}

const PORT = 3001;
const messages: Message[] = [];
const rooms = new Map<string, Room>();
const existingIdSet = new Set<string>();

let clientCubes: ClientCube[] = [];
let client: Client = {
  id: undefined,
  name: undefined,
};
let colorCount = 0;
let orbitPosition = [2, 2, 1.5];

// 새로운 클라이언트가 접속했을 때
io.on("connection", (socket) => {
  client = {
    id: socket.id,
    name: DEFAULT_GEOMETRY + colorCount,
  };

  // ------------------------------
  // 새 3d Object 생성 & 업데이트
  socket.on("newCube", (newId) => {
    const cubeId = uuidv4();

    // 접속 id
    console.log("connect newCube: ", newId);

    existingIdSet.add(newId);
    const length = clientCubes.length;

    clientCubes.unshift({
      ...DEFAULT_OPTION,
      position: { ...DEFAULT_OPTION.position, y: length },
      rotation: { ...DEFAULT_OPTION.rotation, y: length % 2 },
      id: cubeId,
      name: DEFAULT_GEOMETRY,
      color: BOX_COLORS[colorCount % BOX_COLORS.length],
    });
    colorCount++;

    emitIdChangeEvent(clientCubes, orbitPosition);
  });

  // 클라이언트가 업데이트 이벤트를 보냈을 때
  socket.on("update", (data) => {
    const { id, geometry, position, rotation, myOrbitPosition } = data;

    console.log(myOrbitPosition);
    orbitPosition = myOrbitPosition;
    // 해당 클라이언트의 정보 업데이트
    const updatedClient = clientCubes.find((cube) => cube.id === id);

    if (updatedClient && geometry.name) {
      client.name = geometry.name;

      updatedClient.name = geometry.name;
      updatedClient.geometry = geometry;
      updatedClient.position = position;
      updatedClient.rotation = rotation;
    }

    // 모든 클라이언트에게 업데이트된 클라이언트 정보 브로드캐스팅
    emitIdChangeEvent(clientCubes, orbitPosition);
  });

  socket.on("orbitPositionChange", (orbitPosition) => {
    emitOrbitPositionChangeEvent(orbitPosition);
  });

  // ------------------------------
  // 메시지 전송 & 수신
  // 클라이언트가 메시지를 보냈을 때
  socket.on("message", (data) => {
    console.log("클라이언트가 메시지를 보냈습니다:", data);

    messages.push({ ...data, nickname: client.name });
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
    rooms.set(roomId, room);

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
      clients: Array.from(io.sockets.adapter.rooms.get(roomId) || []),
    };
    socket.emit("roomJoined", roomInfo);
  });

  // 클라이언트가 방에서 퇴장할 때
  // 여기에 작성

  // ------------------------------
  // 연결 종료
  // 클라이언트가 연결을 해제했을 때
  socket.on("disconnect", () => {
    client.id && existingIdSet.delete(client.id);
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

    emitIdChangeEvent(newClientCubes, orbitPosition);
  });
});

server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

/** ID로부터 해당 방의 타이틀 정보를 가져오는 함수 */
function getRoomTitle(roomId: string) {
  const room = Array.from(rooms.values()).find((room) => room.id === roomId);
  return room ? room.title : "제목 없음";
}

/** */
function emitIdChangeEvent(clientCubes: ClientCube[], orbitPosition: number[]) {
  io.emit("idChange", { clientCubes, orbitPosition });
}

/** */
function emitOrbitPositionChangeEvent(orbitPosition: number[]) {
  console.log("글로벌: ", orbitPosition);
  io.emit("orbitPositionChange", orbitPosition);
}
