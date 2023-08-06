import { Fragment } from "react";

import Sphere from "./mesh/Sphere";
import Torus from "./mesh/Torus";
import Box from "./mesh/Box";
import Dice from "./mesh/Dice";

import { ThreeProps } from "@/type/three";
import UseGuiControl from "../../hook/useGuiControl";

export default function Scene({ clientCubes, geoMode, myId }: ThreeProps) {
  // const { guiMesh } = UseGuiControl();

  return (
    <scene>
      {clientCubes.map((mesh) => {
        const isMyMesh = mesh.id === myId.current;
        console.log(mesh.id, myId.current, isMyMesh, mesh.color);

        const currentMesh = mesh;
        // const currentMesh = isMyMesh ? mesh : { ...mesh, ...guiMesh };
        // const currentMesh = isMyMesh
        //   ? mesh
        //   : { ...mesh, position: currentPosition, rotation: currentRotation };

        switch (isMyMesh ? geoMode : mesh.geometry) {
          case "box":
            return <Box key={mesh.id} option={currentMesh} />;
          case "dice":
            return <Dice key={mesh.id} option={currentMesh} />;
          case "sphere":
            return <Sphere key={mesh.id} option={currentMesh} />;
          case "torus":
            return <Torus key={mesh.id} option={currentMesh} />;
          default:
            return <Fragment key={mesh.id} />;
        }
      })}
    </scene>
  );
}
