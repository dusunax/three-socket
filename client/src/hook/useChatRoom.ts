import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { GEOMETRIES } from "../constant/three";
import { RoomInfo, UseChatRoomProps } from "@/type/chat";
import { GeometryMode } from "@/type/three";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

/**
 * 채팅방에 관련된 로직을 처리하는 커스텀 훅
 * - 채팅방 만들기
 * - 채팅방 입장
 * - 채팅방 나가기
 * - 채팅 메시지 처리
 */
export default function UseChatRoom() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [isChatRoom, setIsChatRoom] = useState(false);
  const [mode, setMode] = useState<GeometryMode>("dice");
  const [messages, setMessages] = useState<UseChatRoomProps["messages"]>([]);

  let currentRoomId = location.pathname.split("/")[2]?.split("?")[0] || "";

  // --------------------------------------------------------
  // 채팅방 관련 로직
  // --------------------------------------------------------
  /** emit createRoom with fields: nickname, title */
  function createRoom(title: string, nickname: string) {
    if (title && nickname) {
      socket.emit("createRoom", { title, nickname });
    }
  }

  // emit joinRoom with fields: roomId, nickname
  function joinRoom(roomId: string, nickname: string) {
    console.log("jo");

    socket.emit("joinRoom", { roomId, nickname });
    navigate(`/room/${roomId}`);
  }

  /** emit message with field: message */
  function sendMessage(message: string) {
    socket.emit("message", { message, roomId: currentRoomId });

    GEOMETRIES.forEach((e) => {
      if (message.toLowerCase().includes(e)) {
        setMode(e);
        console.log(mode, message);
      }
    });
  }

  /** keydown event 핸들러
   * 1. esc 키가 눌렸을 때 isChatRoom 값을 토글
   */
  function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case "Escape":
        setIsChatRoom((prevIsChatRoom) => !prevIsChatRoom);
    }
  }

  /** */
  function updateRoomInfo(roomInfo: RoomInfo) {
    document.title = roomInfo.title;
    console.log(roomInfo);

    localStorage.setItem("title", roomInfo.title);
  }

  useEffect(() => {
    location.pathname.includes("room") && setParams({ mode });
  }, [mode]);

  // --------------------------------------------------------
  // socket 관련 로직
  // --------------------------------------------------------
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server: ", socket.id);
    });

    socket.on("message", (messages: UseChatRoomProps["messages"]) => {
      console.log("message", messages);

      setMessages(messages);
    });

    socket.on("roomCreated", (info) => {
      const { id } = info;
      updateRoomInfo(info);

      // console.log("roomCreated", info);

      setTimeout(() => {
        navigate(`/room/${id}`);
      }, 100);
    });

    // 방에 입장 응답 받기
    socket.on("roomJoined", (info) => {
      console.log("방에 입장했습니다. 방 정보:", info);

      updateRoomInfo(info);
    });

    // --------------------------------------------------------
    // keydown 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    currentRoomId,
    messages,
    isChatRoom,
    setIsChatRoom,
    mode,
    setMode,

    sendMessage,
    createRoom,
    joinRoom,
  };
}
