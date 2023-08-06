import { GeometryNavigateProps } from "@/type/three";
import { GEOMETRIES } from "../../constant/three";

import ButtonItem from "./ButtonItem";

export default function GeometryNavigate({
  geoMode,
  setGeoMode,
}: GeometryNavigateProps) {
  return (
    <ol className="max-w-[240px] flex flex-wrap gap-2 fixed bottom-[430px] right-[300px] translate-y-full translate-x-full z-10">
      {GEOMETRIES.map((geometry) => (
        <ButtonItem
          meshType={geometry}
          isActive={geometry === geoMode}
          setGeoMode={setGeoMode}
        />
      ))}
    </ol>
  );
}
