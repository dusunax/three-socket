import { useEffect, useState, useRef } from "react";

import { ClientGeometry, GeoMode } from "../type/three";
import { GEOMETRIES } from "../constant/three";

import io from "socket.io-client";
import { UseSocketReturn } from "@/type/chat";
const socket = io("http://localhost:3001");

export default function UseSocket() {
  const [messages, setMessages] = useState<UseSocketReturn["messages"]>([]);
  const [clientCubes, setClientCubes] = useState<ClientGeometry[]>([]);
  const [geoMode, setGeoMode] = useState<GeoMode>("dice");

  let myId = useRef<string | null>(null);
  let myMesh = useRef<ClientGeometry | null>(null);

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

      console.log("Connected to server: ", socket.id);
      socket.emit("id", myId);
    });

    socket.on("message", (messages: UseSocketReturn["messages"]) => {
      setMessages(messages);
    });

    socket.on("idChange", (clientCubes) => {
      setClientCubes(clientCubes);
      myMesh.current = clientCubes.find(
        (cube: ClientGeometry) => cube.id === myId.current
      );
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
    messages,
    sendMessage,
    clientCubes,
    geoMode,
    setGeoMode,
    myId,
  };
}
