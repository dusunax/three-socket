import { useMemo, useRef } from "react";
import * as THREE from "three";
import { AmbientLight } from "three";
import { useControls } from "leva";

export interface UseGuiControlType {
  ambientRef: React.RefObject<AmbientLight>;
  // guiMesh: MeshOption;
}

interface MeshOption {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  visible: boolean;
  color: string;
}

export default function UseGuiControl(): UseGuiControlType {
  const ambientRef = useRef<AmbientLight | null>(null);
  // const meshOptions = useMemo(() => {
  //   return {
  //     position: {
  //       x: 0,
  //       y: 0,
  //       z: 0,
  //     },
  //     rotation: {
  //       x: 0,
  //       y: 0,
  //       z: 0,
  //     },
  //     visible: true,
  //     color: { value: "lime" },
  //     "🎨 geometry": {
  //       value: "box",
  //     },
  //   };
  // }, []);

  // const guiMesh = useControls(" My Mesh rotate", meshOptions);

  useControls("Ambient Light", {
    "💡 visible": {
      value: true,
      onChange: (v) => {
        if (ambientRef.current) ambientRef.current.visible = v;
      },
    },
    "🎨 color": {
      value: "white",
      onChange: (v) => {
        if (ambientRef.current) ambientRef.current.color = new THREE.Color(v);
      },
    },
  });

  return { ambientRef };
}
