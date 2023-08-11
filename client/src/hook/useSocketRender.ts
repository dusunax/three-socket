import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { ClientGeometry, GlobalControl } from "../type/three";

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
  const [isMyControl, setIsMyControl] = useState(false);

  const DEFAULT_POSITION: [number, number, number] = [2, 2, 1.5];
  const [savedOrbitPosition, saveOrbitPosition] =
    useState<[number, number, number]>(DEFAULT_POSITION);
  const [globalControl, setGlobalControl] = useState<GlobalControl>();

  let myMesh = useRef<ClientGeometry | null>(null);

  // object intialization
  function initializeCube(id: string) {
    socket.emit("newCube", id);
  }

  useEffect(() => {
    initializeCube(socket.id);

    if (!socket.id) return;

    socket.on("updateServerData", (data) => {
      const { clientCubes, globalControl } = data;
      setClientCubes(clientCubes);
      setGlobalControl(globalControl);

      myMesh.current = clientCubes.find(
        (cube: ClientGeometry) => cube.id === socket.id
      );
    });

    socket.on("globalOrbitChange", (globalControl) => {
      console.log("글로벌 변경 감지:", globalControl);
      setGlobalControl(globalControl);

      const newIsMyControl = globalControl.hostId === socket.id;
      setIsMyControl(newIsMyControl);
    });
  }, []);

  useEffect(() => {
    let updateInterval: NodeJS.Timeout;

    const mode = params.get("mode") || "dice";
    console.log("updateInterval");

    function updateCurrentClientObject() {
      if (myMesh.current) {
        socket.emit("updateInterval", {
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
        updateCurrentClientObject();
      }, 300);
    }

    resetUpdateInterval();

    return () => {
      clearInterval(updateInterval);
    };
  }, [location.search, params, savedOrbitPosition]);

  useEffect(() => {
    let myControl = {
      orbitPosition: savedOrbitPosition,
      hostId: socket.id,
    };

    socket.emit("orbitPositionChange", myControl);
  }, [savedOrbitPosition]);

  return {
    myId: socket.id,
    clientCubes,
    isChanging,

    initializeCube,
    savedOrbitPosition,
    saveOrbitPosition,
    globalControl,
    isMyControl,
  };
}
