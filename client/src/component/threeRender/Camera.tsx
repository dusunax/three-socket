import { useFrame } from "@react-three/fiber";

export default function Camera({
  setMyOrbitPosition,
  globalOrbitPosition,
  isChanging,
  setGlobalOrbitPosition,
}: {
  setMyOrbitPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  globalOrbitPosition: [number, number, number];
  isChanging: boolean;
  setGlobalOrbitPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
}) {
  useFrame(({ camera }) => {
    const newMyPosition = camera.position.toArray();
    // setGlobalOrbitPosition(newMyPosition);
    setMyOrbitPosition(newMyPosition);

    // 클라이언트의 myOrbitPositio 값이 변경될 때 서버로 전송
    const [x, y, z] = newMyPosition;
    const [gx, gy, gz] = globalOrbitPosition;
    const positions: {
      my: [number, number, number];
      global: [number, number, number];
    } = {
      my: [+x.toFixed(0), +y.toFixed(0), +z.toFixed(0)],
      global: [+gx.toFixed(0), +gy.toFixed(0), +gz.toFixed(0)],
    };
    if (isChanging) return console.log("변경중");

    if (
      positions.my[0] !== positions.global[0] ||
      positions.my[1] !== positions.global[1] ||
      positions.my[2] !== positions.global[2]
    ) {
      // camera.position.set(...positions.global);
      // console.log(isChanging, positions);
      // console.log(camera.position);
    } else {
    }
  });

  return null;
}
