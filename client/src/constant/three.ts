import { ClientGeometry, GeometryMode } from "@/type/three";

export const GEOMETRIES: GeometryMode[] = ["box", "sphere", "torus", "dice"];
export const BOX_COLORS = ["red", "green", "blue"];

export const DEFAULT_GEOMETRY: ClientGeometry = {
  geometry: "box",
  id: "",
  name: "",
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  visible: true,
  color: "",
};
