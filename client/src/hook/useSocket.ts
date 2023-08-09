import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ClientGeometry, GeoMode } from "../type/three";
import { UseSocketReturn } from "@/type/chat";
import { GEOMETRIES } from "../constant/three";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

export default function UseSocket() {
  const [messages, setMessages] = useState<UseSocketReturn["messages"]>([]);
  const [clientCubes, setClientCubes] = useState<ClientGeometry[]>([]);
  const [geoMode, setGeoMode] = useState<GeoMode>("dice");

  let myId = useRef<string | null>(null);
  let myMesh = useRef<ClientGeometry | null>(null);

  const naviagte = useNavigate();

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
          setGeoMode(e);
          console.log(geoMode, message);
        }
      });
    }
  }

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

    // naviagte(`/room/${socket.id}`);
  }

  function initializeCube(id: string) {
    socket.emit("newCube", id);
  }

  useEffect(() => {
    if (!socket.id) {
      socket.on("connect", () => {
        myId.current = socket.id;

        console.log("Connected to server: ", socket.id);
      });
    }

    socket.on("message", (messages: UseSocketReturn["messages"]) => {
      setMessages(messages);
    });

    socket.on("idChange", (clientCubes) => {
      setClientCubes(clientCubes);
      myMesh.current = clientCubes.find(
        (cube: ClientGeometry) => cube.id === myId.current
      );
    });

    socket.on("roomCreated", (id: string) => {
      console.log("roomCreated", id);
    });
  }, []);

  useEffect(() => {
    function updateCurrentClientGeoMode() {
      console.log("인터벌", geoMode);

      if (myMesh.current) {
        socket.emit("update", {
          id: myId.current,
          geometry: geoMode,
          position: myMesh.current.position,
          rotation: myMesh.current.rotation,
        });
      }
    }

    const updateInterval = setInterval(() => {
      updateCurrentClientGeoMode();
    }, 500);

    return () => {
      clearInterval(updateInterval);
    };
  }, [geoMode]);

  return {
    myId,
    messages,
    clientCubes,

    // geometry mode 변경
    geoMode,
    setGeoMode,

    // form event 핸들러
    createRoom,
    sendMessage,
    initializeCube,

    socket,
  };
}
