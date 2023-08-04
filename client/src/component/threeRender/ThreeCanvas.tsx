import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Scene from "./Scene";
import { UseSocketReturn } from "@/hook/useSocket";

export default function ThreeCanvas({
  existingIds,
}: Pick<UseSocketReturn, "existingIds">) {
  return (
    <Canvas>
      <Scene existingIds={existingIds} />
      <OrbitControls />
    </Canvas>
  );
}
