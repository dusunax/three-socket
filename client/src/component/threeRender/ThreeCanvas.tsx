import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import UseGuiControl from "../../hook/useGuiControl";
import { UseChatRoomProps } from "@/type/chat";
import UseSocketRender from "../../hook/useSocketRender";

import Scene from "./Scene";
import Light from "./Light";

export default function ThreeCanvas({ ...props }: UseChatRoomProps) {
  const { myId, clientCubes } = UseSocketRender();
  const { ambientRef } = UseGuiControl();
  const { mode } = props;

  return (
    <div className="h-screen">
      <Canvas camera={{ position: [2, 2, 1.5] }}>
        <Light ambientRef={ambientRef} />
        <Scene clientCubes={clientCubes} mode={mode} myId={myId} />
        <OrbitControls />

        {/* helpers & utils */}
        <gridHelper args={[40, 40]} position={[0, -0.49, 0]} />
        <axesHelper args={[20]} />
        <Stats />
      </Canvas>
    </div>
  );
}
