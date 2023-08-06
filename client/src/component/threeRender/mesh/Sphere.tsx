import { MeshProps } from "@/type/three";
import { Environment } from "@react-three/drei";

export default function Sphere({ option }: MeshProps) {
  const { position, rotation, color } = option;

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color} // 흰색으로 유리 색상 설정
        opacity={0.8} // 투명도 설정
        transparent={true} // 투명한 재질로 설정
        emissive={1}
        roughness={0.1} // 표면 거칠기 설정
        metalness={0} // 비금속적인 재질로 설정
      />
      <Environment preset="night" />
    </mesh>
  );
}
