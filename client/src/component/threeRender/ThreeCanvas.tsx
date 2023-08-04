import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Scene from "./Scene";
import { ThreeProps } from "@/type/three";

export default function ThreeCanvas({ existingIds, geoMode }: ThreeProps) {
  return (
    <div className="h-screen">
      <Canvas>
        <Scene existingIds={existingIds} geoMode={geoMode} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
