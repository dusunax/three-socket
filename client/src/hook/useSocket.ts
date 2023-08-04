import { useEffect, useState } from "react";
import io from "socket.io-client";

export type useSocketReturn = {
  messages: string[];
  sendMessage(e: React.FormEvent<HTMLFormElement>): void;
};

export default function useSocket() {
  const socket = io("http://localhost:3001");
  const [messages, setMessages] = useState<string[]>([]);

  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const messageInput = form.elements.namedItem("message") as HTMLInputElement;
    const message = messageInput.value || "";

    if (message) {
      socket.emit("message", message);
      messageInput.value = "";
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (messages: string[]) => {
      setMessages(messages);
      console.log(messages);
    });
  }, []);

  return { messages, sendMessage };
}
