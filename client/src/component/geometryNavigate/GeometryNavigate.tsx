import { GeometryNavigateProps } from "@/type/three";
import { GEOMETRIES } from "../../constant/three";

import ButtonItem from "./ButtonItem";

export default function GeometryNavigate({
  mode,
  setMode,
}: GeometryNavigateProps) {
  return (
    <ol className="max-w-[240px] flex flex-wrap gap-2 fixed bottom-[530px] right-[300px] translate-y-full translate-x-full z-10">
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
