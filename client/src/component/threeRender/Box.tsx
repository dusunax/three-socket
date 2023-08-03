import { useRef } from "react";
import { Mesh } from "three";

type BoxProps = {
  color?: string;
};

export default function Box({ color = "yellow" }: BoxProps) {
  const meshRef = useRef<Mesh | null>(null);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
