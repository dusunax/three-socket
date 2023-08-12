import { Vector3 } from "three";

/** 두 3D 벡터가 같은지 확인하는 함수 */
export const checkTwoVector3Equal = (v1: Vector3, v2: Vector3): boolean => {
  return (
    v1.x.toFixed(1) === v2.x.toFixed(1) ||
    v1.y.toFixed(1) === v2.y.toFixed(1) ||
    v1.z.toFixed(1) === v2.z.toFixed(1)
  );
};

/** 두 3D 좌표값이 같은지 확인하는 함수 */
export const checkTwo3DCoordinateEqual = (
  c1: [number, number, number],
  c2: [number, number, number]
): boolean => {
  return (
    c1[0].toFixed(1) === c2[0].toFixed(1) ||
    c1[1].toFixed(1) === c2[1].toFixed(1) ||
    c1[2].toFixed(1) === c2[2].toFixed(1)
  );
};

/** 좌표값 배열을 소숫점 1자리까지만 저장 */
export const roundCoordinate = (coordinate: [number, number, number]) => {
  return coordinate.map((c) => Number(c.toFixed(1))) as [
    number,
    number,
    number
  ];
};
