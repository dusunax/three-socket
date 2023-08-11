import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import UseGuiControl from "../../hook/useGuiControl";
import UseSocketRender from "../../hook/useSocketRender";
import { UseChatRoomProps } from "@/type/chat";

import Scene from "./Scene";
import Light from "./Light";
import Camera from "./Camera";
import ToolMenu from "../ToolMenu/ToolMenu";

export default function ThreeCanvas({ ...props }: UseChatRoomProps) {
  const {
    myId,
    clientCubes,
    isChanging,
    globalControl,
    saveOrbitPosition,
    savedOrbitPosition,
    isMyControl,
  } = UseSocketRender();
  const { ambientRef } = UseGuiControl();
  const { mode } = props;

  const DEFAULT_TOOLS_VALUE = {
    enableRotate: true,
    enablePan: true,
    enableZoom: true,
    autoRotate: false,
  };
  const [tools, setTools] = useState(DEFAULT_TOOLS_VALUE);

  return (
    <>
      <div className="h-screen flex">
        <ToolMenu value={tools} setValue={setTools} />
        {globalControl?.isChanging && (
          <div
            className={`z-10 w-full fixed h-screen border-4 pointer-events-none  select-none border-teal-300 animate-pulse`}
          >
            <p className="w-full absolute bottom-[100px] text-center text-2xl text-teal-400">
              {isMyControl ? "나" : "다른 사람"}
            </p>
          </div>
        )}

        <Canvas>
          <Light ambientRef={ambientRef} />
          <Camera
            savedOrbitPosition={savedOrbitPosition}
            saveOrbitPosition={saveOrbitPosition}
            globalControl={globalControl}
            isChanging={isChanging}
            isMyControl={isMyControl}
          />
          <Scene clientCubes={clientCubes} mode={mode} myId={myId} />

          {/* helpers & utils */}
          <OrbitControls {...tools} />
          <gridHelper args={[40, 40]} position={[0, -0.49, 0]} />
          <axesHelper args={[20]} />
          <Stats />
        </Canvas>
      </div>
    </>
  );
}
