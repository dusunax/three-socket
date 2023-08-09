import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { GEOMETRIES } from "../constant/three";
import { UseSocketReturn } from "@/type/chat";
import { GeoMode } from "@/type/three";

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
  const naviagte = useNavigate();

  const [isChatRoom, setIsChatRoom] = useState(false);
  const [mode, setMode] = useState<GeoMode>("dice");
  const [messages, setMessages] = useState<UseSocketReturn["messages"]>([]);
  let chatRoomId = location.pathname.split("/")[2]?.split("?")[0] || "";

  /** emit createRoom with fields: nickname, title */
  function createRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const title = titleInput.value || "";
    const nicknameInput = form.elements.namedItem(
      "nickname"
    ) as HTMLInputElement;
    const nickname = nicknameInput.value || "";

    if (title && nickname) {
      socket.emit("createRoom", { title, nickname });
    }

    naviagte(`/room/${socket.id}`);
  }

  /** emit message with field: message */
  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const messageInput = form.elements.namedItem("message") as HTMLInputElement;
    const message = messageInput.value || "";

    if (message) {
      socket.emit("message", message);
      messageInput.value = "";

      GEOMETRIES.forEach((e) => {
        if (message.toLowerCase().includes(e)) {
          setMode(e);
          console.log(mode, message);
        }
      });
    }
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

  useEffect(() => {
    location.pathname.includes("room") && setParams({ mode });
  }, [mode]);

  // socket 코드 시작
  useEffect(() => {
    socket.on("message", (messages: UseSocketReturn["messages"]) => {
      setMessages(messages);
    });

    // keydown 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    chatRoomId,
    messages,
    isChatRoom,
    setIsChatRoom,
    mode,
    setMode,

    sendMessage,
    createRoom,
  };
}
