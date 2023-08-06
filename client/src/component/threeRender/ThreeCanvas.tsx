import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import { ThreeProps } from "@/type/three";
import UseGuiControl from "../../hook/useGuiControl";

import Scene from "./Scene";
import Light from "./Light";

export default function ThreeCanvas({
  clientCubes,
  geoMode,
  myId,
}: ThreeProps) {
  const { ambientRef } = UseGuiControl();

  return (
    <div className="h-screen">
      <Canvas camera={{ position: [2, 2, 1.5] }}>
        <Light ambientRef={ambientRef} />
        <Scene clientCubes={clientCubes} geoMode={geoMode} myId={myId} />
        <OrbitControls />

        {/* helpers & utils */}
        <gridHelper args={[40, 40]} position={[0, -0.49, 0]} />
        <axesHelper args={[20]} />
        <Stats />
      </Canvas>
    </div>
  );
}
