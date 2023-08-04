import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const ObjLoaderMesh = () => {
  // OBJ 파일의 경로
  const objPath = "/model/obj/die02.obj";

  // OBJLoader를 이용하여 OBJ 파일 로드
  const obj = useLoader(OBJLoader, objPath);

  // 로드된 obj를 useMemo를 사용하여 캐싱
  const objModel = useMemo(() => obj, [obj]);
  console.log(objModel);

  return <primitive object={objModel} />;
};

export default ObjLoaderMesh;
