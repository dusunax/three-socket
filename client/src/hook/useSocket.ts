import { useEffect, useState, useRef } from "react";

import { GeoMode } from "../type/three";
import { GEOMETRIES } from "../constant/three";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

export type UseSocketReturn = {
  messages: string[];
  sendMessage(e: React.FormEvent<HTMLFormElement>): void;

  existingIds: string[];
  geoMode: GeoMode;
  setGeoMode: React.Dispatch<React.SetStateAction<GeoMode>>;
};

export default function UseSocket() {
  const [messages, setMessages] = useState<string[]>([]);
  const [existingIds, setExistingIds] = useState<string[]>([]);

  const [geoMode, setGeoMode] = useState<GeoMode>("dice");

  let myId = useRef<string | null>(null);

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
          setGeoMode(e);
          console.log(geoMode, message);
        }
      });
    }
  }

  useEffect(() => {
    socket.on("connect", () => {
      myId.current = socket.id;
      console.log("Connected to server: ", myId);
      socket.emit("id", myId);
    });

    socket.on("message", (messages: string[]) => {
      setMessages(messages);
    });

    socket.on("idsChange", (existingIds) => {
      console.log("hi", existingIds);
      setExistingIds(existingIds);

      setInterval(() => {
        socket.emit("update", {});
        // socket.emit("update", {
        //   t: Date.now(),
        //   p: myObject3D.position,
        //   r: myObject3D.rotation,
        // });
      }, 50);
    });
  }, []);

  return { messages, sendMessage, existingIds, geoMode, setGeoMode };
}
