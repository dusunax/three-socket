import { useEffect, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { ClientGeometry } from "../type/three";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

/**
 * 실시간 3D 랜더링에 관련된 로직을 처리하는 커스텀 훅
 *
 */
export default function UseSocketRender() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [clientCubes, setClientCubes] = useState<ClientGeometry[]>([]);

  let myMesh = useRef<ClientGeometry | null>(null);

  function initializeCube(id: string) {
    socket.emit("newCube", id);
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server: ", socket.id);
    });

    initializeCube(socket.id);

    socket.on("idChange", (clientCubes) => {
      setClientCubes(clientCubes);
      const myCube = clientCubes.find(
        (cube: ClientGeometry) => cube.id === socket.id
      );

      myMesh.current = clientCubes.find(
        (cube: ClientGeometry) => cube.id === socket.id
      );
    });

    socket.on("roomCreated", (id: string) => {
      console.log("roomCreated", id);
    });
  }, [socket.id]);

  useEffect(() => {
    let updateInterval: NodeJS.Timeout;
    const mode = params.get("mode") || "dice";

    function updateCurrentClientGeoMode() {
      if (myMesh.current) {
        socket.emit("update", {
          id: socket.id,
          geometry: mode,
          position: myMesh.current.position,
          rotation: myMesh.current.rotation,
        });
      }
    }

    function resetUpdateInterval() {
      clearInterval(updateInterval);
      updateInterval = setInterval(() => {
        updateCurrentClientGeoMode();
      }, 500);
    }

    resetUpdateInterval();

    return () => {
      clearInterval(updateInterval);
    };
  }, [location.search]);

  return {
    myId: socket.id,
    clientCubes,

    initializeCube,
  };
}
