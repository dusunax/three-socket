import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import UseGuiControl from "../../hook/useGuiControl";
import UseSocketRender from "../../hook/useSocketRender";
import { UseChatRoomProps } from "@/type/chat";

import Scene from "./Scene";
import Light from "./Light";
import Camera from "./Camera";

export default function ThreeCanvas({ ...props }: UseChatRoomProps) {
  const {
    myId,
    clientCubes,
    isChanging,
    globalOrbitPosition,
    saveOrbitPosition,
    setGlobalOrbitPosition,
    savedOrbitPosition,
    globalControlOBJ,
    isMyControl,
  } = UseSocketRender();
  const { ambientRef, orbitControlOptions } = UseGuiControl();
  const { mode } = props;
  return (
    <div className="h-screen">
      <Canvas camera={{ position: globalOrbitPosition }}>
        <Light ambientRef={ambientRef} />
        <Camera
          savedOrbitPosition={savedOrbitPosition}
          saveOrbitPosition={saveOrbitPosition}
          globalOrbitPosition={globalOrbitPosition}
          setGlobalOrbitPosition={setGlobalOrbitPosition}
          isChanging={isChanging}
          globalControlOBJ={globalControlOBJ}
          isMyControl={isMyControl}
        />
        <Scene clientCubes={clientCubes} mode={mode} myId={myId} />

        {/* helpers & utils */}
        <OrbitControls {...orbitControlOptions} />
        <gridHelper args={[40, 40]} position={[0, -0.49, 0]} />
        <axesHelper args={[20]} />
        <Stats />
      </Canvas>
    </div>
  );
}
