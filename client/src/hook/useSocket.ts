import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001");

export type UseSocketReturn = {
  messages: string[];
  sendMessage(e: React.FormEvent<HTMLFormElement>): void;

  existingIds: string[];
};

export default function useSocket() {
  const [messages, setMessages] = useState<string[]>([]);
  const [existingIds, setExistingIds] = useState<string[]>([]);

  let myId;

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
      myId = socket.id;
      console.log("Connected to server: ", myId);
      socket.emit("id", myId);
    });

    socket.on("message", (messages: string[]) => {
      setMessages(messages);
    });

    socket.on("idsChange", (existingIds) => {
      console.log("hi", existingIds);
      setExistingIds(existingIds);

      // setInterval(() => {
      //   socket.emit("update", {
      //     t: Date.now(),
      //     p: myObject3D.position,
      //     r: myObject3D.rotation,
      //   });
      // }, 50);
    });
  }, []);

  return { messages, sendMessage, existingIds };
}
