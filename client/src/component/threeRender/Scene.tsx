import { useRef } from "react";
import { Mesh, Scene as ThreeScene } from "three";

const Box = () => {
  const meshRef = useRef<Mesh | null>(null);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

export default function Scene() {
  const sceneRef = useRef<ThreeScene>(null);

  return (
    <scene ref={sceneRef}>
      <ambientLight intensity={0.2} />
      <directionalLight color="#ffffff" intensity={10} position={[0, 5, 1]} />
      <gridHelper args={[40, 40]} position={[0, -0.49, 0]} />
      <axesHelper args={[20]} />
      <Box />
    </scene>
  );
}
