import { useRef } from "react";
import { Scene as ThreeScene } from "three";

import { ThreeProps } from "@/type/three";
import { BOX_COLORS } from "../../constant/three";

import Light from "./Light";
import Sphere from "./mesh/Sphere";
import Torus from "./mesh/Torus";
import ObjLoaderMesh from "./loader/ObjLoaderMesh";
import Box from "./mesh/Box";
import Dice from "./mesh/Dice";

export default function Scene({ existingIds, geoMode }: ThreeProps) {
  const sceneRef = useRef<ThreeScene>(null);

  return (
    <scene ref={sceneRef}>
      <ObjLoaderMesh />

      <Light />
      <gridHelper args={[40, 40]} position={[0, -0.49, 0]} />
      <axesHelper args={[20]} />

      {existingIds.map((id, idx) => {
        if (geoMode === "box")
          return <Box key={id} positionY={idx} color={BOX_COLORS[idx % 3]} />;
        if (geoMode === "dice")
          return <Dice key={id} positionY={idx} color={BOX_COLORS[idx % 3]} />;
        if (geoMode === "sphere")
          return (
            <Sphere key={id} positionY={idx} color={BOX_COLORS[idx % 3]} />
          );
        if (geoMode === "torus")
          return <Torus key={id} positionY={idx} color={BOX_COLORS[idx % 3]} />;
        return <></>;
      })}
    </scene>
  );
}
