import { GeometryNavigateProps } from "@/type/three";
import { GEOMETRIES } from "../../constant/three";

import ButtonItem from "./ButtonItem";

export default function GeometryNavigate({
  mode,
  setMode,
}: GeometryNavigateProps) {
  const mobileCSS = `w-full px-10 top-[60px] z-10 justify-end`;

  return (
    <ol
      className={`${mobileCSS} sm:w-auto sm:max-w-[240px] sm:px-0 flex flex-wrap gap-2 fixed sm:top-auto sm:bottom-[530px] sm:right-[300px] sm:translate-y-full sm:translate-x-full sm:z-10`}
    >
      {GEOMETRIES.map((geometry) => (
        <ButtonItem
          key={geometry}
          meshType={geometry}
          isActive={geometry === mode}
          setMode={setMode}
        />
      ))}
    </ol>
  );
}
