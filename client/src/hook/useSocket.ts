import { useState } from "react";
import io from "socket.io-client";

export default function useSocket() {
  const socket = io("http://localhost:3001");
  const [messages, setMessages] = useState<string[]>([]);

  function sendMessage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const messageInput = e.currentTarget.parentElement?.querySelector(
      "input"
    ) as HTMLInputElement;
    const message = messageInput.value || "";

    socket.emit("message", message);
    messageInput.value = "";
  }

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("message", (data: string) => {
    setMessages([...messages, data]);
  });

  return { messages, sendMessage };
}
