import { useRef } from "react";
import { Mesh } from "three";

type BoxProps = {
  color?: string;
  positionY?: number;
};

export default function Box({ color = "yellow", positionY = 0 }: BoxProps) {
  const meshRef = useRef<Mesh | null>(null);

  return (
    <mesh
      ref={meshRef}
      position={[0, positionY, 0]}
      rotation={[0, positionY % 2, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
