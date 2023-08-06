import { MeshProps } from "@/type/three";

export default function Torus({ option }: MeshProps) {
  const { position, rotation, color } = option;

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <torusGeometry args={[0.5, 0.2, 16, 100]} />
      <meshPhysicalMaterial color={color} />
    </mesh>
  );
}
