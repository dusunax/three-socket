import { UseChatRoomProps } from "../../type/chat";
import { GeometryMode } from "../../type/three";

export default function ButtonItem({
  meshType,
  isActive,
  setMode,
}: {
  meshType: GeometryMode;
  isActive: boolean;
  setMode: UseChatRoomProps["setMode"];
}) {
  return (
    <li
      className={`px-2 py-1 text-xs text-white rounded-full cursor-pointer ${
        isActive ? "bg-lime-600" : "bg-slate-500"
      }`}
      onClick={() => setMode(meshType)}
    >
      #{meshType}
    </li>
  );
}
