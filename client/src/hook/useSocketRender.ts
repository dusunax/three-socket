import { useEffect, useState, useRef, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import * as THREE from "three";

import { ClientGeometry, GlobalControl } from "../type/three";
import { checkTwo3DCoordinateEqual } from "../util/checkTwoVecter3";

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
  const [globalOrbitPosition, setGlobalOrbitPosition] =
    useState<[number, number, number]>(DEFAULT_POSITION);
  let globalControlOBJ: GlobalControl = {
    orbitPosition: [2, 2, 1.5],
    hostId: "",
    isChanging: false,
  };

  let myMesh = useRef<ClientGeometry | null>(null);

  // object intialization
  function initializeCube(id: string) {
    socket.emit("newCube", id);
  }

  useEffect(() => {
    initializeCube(socket.id);

    if (!socket.id) return;

    socket.on("cubeChange", (data) => {
      const { clientCubes } = data;
      setClientCubes(clientCubes);

      myMesh.current = clientCubes.find(
        (cube: ClientGeometry) => cube.id === socket.id
      );
    });

    socket.on("globalOrbitChange", (globalControl) => {
      // console.log(
      //   "글로벌 변경 감지:",
      //   globalControl
      // );
      globalControlOBJ = globalControl;

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
        socket.emit("cubeUpdate", {
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
      }, 500);
    }

    resetUpdateInterval();

    return () => {
      clearInterval(updateInterval);
    };
  }, [location.search, params]);

  useEffect(() => {
    // 클라이언트의 myOrbitPositio 값이 변경될 때 서버로 전송
    const isSamePosition = checkTwo3DCoordinateEqual(
      savedOrbitPosition,
      globalControlOBJ.orbitPosition
    );
    if (isSamePosition) return console.log("같은 값이라 전송 안함");

    let myControl = {
      orbitPosition: savedOrbitPosition,
      hostId: socket.id,
      isChanging: true,
    };

    console.log(myControl);

    socket.emit("orbitPositionChange", myControl);
  }, [savedOrbitPosition]);

  return {
    myId: socket.id,
    clientCubes,
    isChanging,

    initializeCube,
    savedOrbitPosition,
    saveOrbitPosition,
    globalOrbitPosition,
    setGlobalOrbitPosition,
    globalControlOBJ,
    isMyControl,
  };
}
