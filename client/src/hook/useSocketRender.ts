import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import * as THREE from "three";

import { ClientGeometry } from "../type/three";

import io from "socket.io-client";
const socket = io("http://localhost:3001");

/**
 * 실시간 3D 랜더링에 관련된 로직을 처리하는 커스텀 훅
 * - geometry 변경
 * - clientCubes 업데이트
 */
export default function UseSocketRender() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [clientCubes, setClientCubes] = useState<ClientGeometry[]>([]);
  const [isChanging, setIsChanging] = useState(false);

  const DEFAULT_POSITION: [number, number, number] = [2, 2, 1.5];
  const [myOrbitPosition, setMyOrbitPosition] =
    useState<[number, number, number]>(DEFAULT_POSITION);
  const [globalOrbitPosition, setGlobalOrbitPosition] =
    useState<[number, number, number]>(DEFAULT_POSITION);
  // const globalOrbitPosition = useRef<[number, number, number]>([2, 2, 1.5]);

  let myMesh = useRef<ClientGeometry | null>(null);

  // object intialization
  function initializeCube(id: string) {
    socket.emit("newCube", id);
  }

  useEffect(() => {
    initializeCube(socket.id);

    if (!socket.id) return;

    socket.on("idChange", (data) => {
      const { orbitPosition, clientCubes } = data;

      setGlobalOrbitPosition(orbitPosition);
      setClientCubes(clientCubes);

      myMesh.current = clientCubes.find(
        (cube: ClientGeometry) => cube.id === socket.id
      );
    });

    socket.on("orbitPositionChange", (serverOrbitPosition) => {
      // console.log("글로벌 변경 감지:", serverOrbitPosition);
      setIsChanging(true);
      setGlobalOrbitPosition(serverOrbitPosition);
    });
  }, []);

  useEffect(() => {
    let updateInterval: NodeJS.Timeout;

    const mode = params.get("mode") || "dice";

    function updateCurrentClientObject() {
      if (myMesh.current) {
        socket.emit("update", {
          id: socket.id,
          geometry: mode,
          position: myMesh.current.position,
          rotation: myMesh.current.rotation,
          myOrbitPosition: myOrbitPosition,
        });
      }
    }

    function resetUpdateInterval() {
      clearInterval(updateInterval);
      updateInterval = setInterval(() => {
        updateCurrentClientObject();
      }, 500);
    }

    resetUpdateInterval();

    return () => {
      clearInterval(updateInterval);
    };
  }, [location.search, myOrbitPosition, params]);

  useEffect(() => {
    // 클라이언트의 myOrbitPositio 값이 변경될 때 서버로 전송
    const [x, y, z] = myOrbitPosition;
    const [gx, gy, gz] = globalOrbitPosition;
    const positions = {
      my: [+x.toFixed(1), +y.toFixed(1), +z.toFixed(1)],
      global: [+gx.toFixed(1), +gy.toFixed(1), +gz.toFixed(1)],
    };

    if (
      positions.my[0] !== positions.global[0] ||
      positions.my[1] !== positions.global[1] ||
      positions.my[2] !== positions.global[2]
    ) {
      console.log("업데이트", positions.my, positions.global);

      socket.emit("orbitPositionChange", positions.my);
    } else {
      setIsChanging(false);
    }
  }, [myOrbitPosition, globalOrbitPosition]);

  return {
    myId: socket.id,
    clientCubes,
    isChanging,

    initializeCube,
    myOrbitPosition,
    setMyOrbitPosition,
    globalOrbitPosition,
    setGlobalOrbitPosition,
  };
}
