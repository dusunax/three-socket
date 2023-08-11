import { useRef } from "react";
import { AmbientLight } from "three";

export interface UseGuiControlType {
  ambientRef: React.RefObject<AmbientLight>;
  cameraRef: React.MutableRefObject<HTMLCanvasElement | null>;
}

export default function UseGuiControl(): UseGuiControlType {
  const ambientRef = useRef<AmbientLight | null>(null);
  const cameraRef = useRef<HTMLCanvasElement | null>(null);

  return { ambientRef, cameraRef };
}
