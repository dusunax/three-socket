import { ClientGeometry, GeoMode } from "@/type/three";

export const GEMETRIES: GeoMode[] = ["box", "sphere", "torus", "dice"];
export const BOX_COLORS = ["red", "green", "blue"];

export const DEFAULT_GEOMETRY: ClientGeometry = {
  geomtry: "box",
  id: "",
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
};
