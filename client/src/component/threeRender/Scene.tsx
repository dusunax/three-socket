import { useRef } from "react";
import { Scene as ThreeScene } from "three";

import Box from "./geometry/Box";

import { boxColors } from "../../constant/boxColors";
import { ThreeProps } from "@/type/three";
import Sphere from "./geometry/Sphere";
import Torus from "./geometry/Torus";

export default function Scene({ existingIds, geoMode }: ThreeProps) {
  const sceneRef = useRef<ThreeScene>(null);
  console.log(existingIds);

  return (
    <scene ref={sceneRef}>
      <ambientLight intensity={0.2} />
      <directionalLight color="#ffffff" intensity={10} position={[0, 5, 1]} />
      <gridHelper args={[40, 40]} position={[0, -0.49, 0]} />
      <axesHelper args={[20]} />

      {existingIds.map((id, idx) => {
        if (geoMode === "box")
          return <Box key={id} positionY={idx} color={boxColors[idx % 3]} />;
        if (geoMode === "sphere")
          return <Sphere key={id} positionY={idx} color={boxColors[idx % 3]} />;
        if (geoMode === "torus")
          return <Torus key={id} positionY={idx} color={boxColors[idx % 3]} />;
      })}
    </scene>
  );
}
