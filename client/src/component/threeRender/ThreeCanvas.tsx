import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";

import Scene from "./Scene";
import { ThreeProps } from "@/type/three";

export default function ThreeCanvas({ existingIds, geoMode }: ThreeProps) {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [2, 2, 1.5] }}>
        <Scene existingIds={existingIds} geoMode={geoMode} />
        <OrbitControls />
        <Stats />
      </Canvas>
    </div>
  );
}
