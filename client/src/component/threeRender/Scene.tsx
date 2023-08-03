import { useRef } from "react";
import { Scene as ThreeScene } from "three";

import Box from "./Box";

export default function Scene() {
  const sceneRef = useRef<ThreeScene>(null);

  return (
    <scene ref={sceneRef}>
      <ambientLight intensity={0.2} />
      <directionalLight color="#ffffff" intensity={10} position={[0, 5, 1]} />
      <gridHelper args={[40, 40]} position={[0, -0.49, 0]} />
      <axesHelper args={[20]} />
      <Box />
    </scene>
  );
}
