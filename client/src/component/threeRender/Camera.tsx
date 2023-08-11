import { useFrame } from "@react-three/fiber";

import {
  checkTwo3DCoordinateEqual,
  roundCoordinate,
} from "../../util/checkTwoVecter3";
import { GlobalControl } from "@/type/three";

export default function Camera({
  saveOrbitPosition: setMyOrbitPosition,
  savedOrbitPosition,
  isChanging,
  isMyControl,
  globalControl,
}: {
  saveOrbitPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  savedOrbitPosition: [number, number, number];
  isChanging: boolean;
  isMyControl: boolean;
  globalControl: GlobalControl | undefined;
}) {
  useFrame(({ camera }) => {
    const newMyPosition = camera.position.toArray();

    if (!isMyControl && globalControl?.orbitPosition) {
      // console.log("다른 사람이 호스트");
      const isGlobalSinc = checkTwo3DCoordinateEqual(
        newMyPosition,
        globalControl.orbitPosition
      );

      !isGlobalSinc && camera.position.set(...globalControl.orbitPosition);
    }

    const isViewStill = checkTwo3DCoordinateEqual(
      newMyPosition,
      savedOrbitPosition
    );
    !isViewStill && setMyOrbitPosition(roundCoordinate(newMyPosition));
    // console.log("나야나", isMyControl, "카메라", globalControl?.orbitPosition);
  });

  return null;
}
