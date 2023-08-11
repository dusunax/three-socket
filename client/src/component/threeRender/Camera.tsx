import { useFrame } from "@react-three/fiber";

import {
  checkTwo3DCoordinateEqual,
  roundCoordinate,
} from "../../util/checkTwoVecter3";
import { GlobalControl } from "@/type/three";

export default function Camera({
  saveOrbitPosition: setMyOrbitPosition,
  globalOrbitPosition,
  isChanging,
  setGlobalOrbitPosition,
  globalControlOBJ,
  savedOrbitPosition,
  isMyControl,
}: {
  saveOrbitPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  globalOrbitPosition: [number, number, number];
  isChanging: boolean;
  setGlobalOrbitPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
  savedOrbitPosition: [number, number, number];
  globalControlOBJ: GlobalControl;
  isMyControl: boolean;
}) {
  useFrame(({ camera }) => {
    const newMyPosition = camera.position.toArray();

    if (!isMyControl) {
      console.log("다른 사람이 호스트");
      // const isGlobalSinc = checkTwo3DCoordinateEqual(
      //   newMyPosition,
      //   globalControlOBJ.orbitPosition
      // );

      // camera.position.set(...globalControlOBJ.orbitPosition);
    }

    // setMyOrbitPosition(newMyPosition);

    // console.log(isMyControl, isGlobalSinc);
    // if (!isMyControl && !isGlobalSinc) {
    //   console.log(isGlobalSinc);

    //   // setTimeout(() => {
    //   //   camera.position.set(...globalControlOBJ.orbitPosition);
    //   // }, 100);
    // } else {
    //   // console.log("my control");
    // }
    const isViewStill = checkTwo3DCoordinateEqual(
      newMyPosition,
      savedOrbitPosition
    );
    !isViewStill && setMyOrbitPosition(roundCoordinate(newMyPosition));
    // console.log("나야나", isViewStill);
  });

  return null;
}
