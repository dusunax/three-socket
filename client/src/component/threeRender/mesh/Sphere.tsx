type MeshProps = {
  color?: string;
  positionY?: number;
};

export default function Sphere({ color = "yellow", positionY = 0 }: MeshProps) {
  return (
    <mesh position={[0, positionY, 0]} rotation={[0, positionY % 2, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
