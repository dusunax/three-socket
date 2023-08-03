import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Scene from "./Scene";

export default function ThreeCanvas() {
  return (
    <Canvas>
      <Scene />
      <OrbitControls />
    </Canvas>
  );
}
