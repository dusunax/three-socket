import { useRef } from "react";
import { AmbientLight } from "three";

import { useControls } from "leva";

export interface UseGuiControlType {
  ambientRef: React.RefObject<AmbientLight>;
  orbitControlOptions: {
    enableRotate: boolean;
    enablePan: boolean;
    enableZoom: boolean;
    autoRotate: boolean;
  };
  cameraRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export default function UseGuiControl(): UseGuiControlType {
  const ambientRef = useRef<AmbientLight | null>(null);
  const cameraRef = useRef<HTMLCanvasElement | null>(null);

  const orbitControlOptions = useControls({
    enableRotate: true,
    enablePan: true,
    enableZoom: true,
    autoRotate: false,
  });

  return { ambientRef, orbitControlOptions, cameraRef };
}
