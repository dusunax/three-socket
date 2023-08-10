import { useRef, useMemo } from "react";
import { Mesh, TextureLoader } from "three";

import { MeshProps } from "@/type/three";

export default function Dice({ option }: MeshProps) {
  const { position, rotation, color } = option;
  const meshRef = useRef<Mesh | null>(null);

  // TextureLoader를 사용하여 주사위 이미지를 로드합니다.
  const textureLoader = useMemo(() => new TextureLoader(), []); // 메모이제이션 적용
  const diceTexture = useMemo(
    () => textureLoader.load("/model/die02/diff2.png"),
    [textureLoader] // 메모이제이션 적용
  );
  const diceTexture2 = useMemo(
    () => textureLoader.load("/model/die02/normal2.png"),
    [textureLoader] // 메모이제이션 적용
  );

  // diceTexture.wrapS = RepeatWrapping;
  // diceTexture.wrapT = RepeatWrapping;
  // diceTexture.repeat.set(10, 10);
  // diceTexture.offset.set(0.5, 0.5);

  // diceTexture2.wrapS = RepeatWrapping;
  // diceTexture2.wrapT = RepeatWrapping;
  // diceTexture2.repeat.set(0.5, 0.5);
  // diceTexture2.offset.set(0.5, 0.5);

  return (
    <mesh
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color={color}
        map={diceTexture}
        normalMap={diceTexture2}
        roughness={0}
        reflectivity={1}
        metalness={0.1}
      />
    </mesh>
  );
}
