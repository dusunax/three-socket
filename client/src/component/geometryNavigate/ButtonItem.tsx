import { UseSocketReturn } from "@/hook/useSocket";
import { GeoMode } from "../../type/three";

export default function ButtonItem({
  meshType,
  isActive,
  setGeoMode,
}: {
  meshType: GeoMode;
  isActive: boolean;
  setGeoMode: UseSocketReturn["setGeoMode"];
}) {
  return (
    <li
      className={`px-2 py-1 text-xs text-white rounded-full cursor-pointer ${
        isActive ? "bg-lime-600" : "bg-slate-500"
      }`}
      onClick={() => setGeoMode(meshType)}
    >
      #{meshType}
    </li>
  );
}
