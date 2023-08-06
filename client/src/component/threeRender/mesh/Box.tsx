import { MeshProps } from "@/type/three";

export default function Box({ option }: MeshProps) {
  const { position, rotation, color } = option;

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color={color} />
    </mesh>
  );
}
