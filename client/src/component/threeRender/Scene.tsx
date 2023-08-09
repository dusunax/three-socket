import { Fragment } from "react";

import Sphere from "./mesh/Sphere";
import Torus from "./mesh/Torus";
import Box from "./mesh/Box";
import Dice from "./mesh/Dice";

import { ThreeProps } from "@/type/three";

export default function Scene({ clientCubes, geoMode, myId }: ThreeProps) {
  return (
    <scene>
      {clientCubes.map((currentMesh, idx) => {
        const { id } = currentMesh;
        const isMyMesh = id === myId;

        switch (isMyMesh ? geoMode : currentMesh.geometry) {
          case "box":
            return <Box key={id + idx} option={currentMesh} />;
          case "dice":
            return <Dice key={id + idx} option={currentMesh} />;
          case "sphere":
            return <Sphere key={id + idx} option={currentMesh} />;
          case "torus":
            return <Torus key={id + idx} option={currentMesh} />;
          default:
            return <Fragment key={id + idx} />;
        }
      })}
    </scene>
  );
}
