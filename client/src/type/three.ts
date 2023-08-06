import { UseSocketReturn } from "@/hook/useSocket";

export type GeoMode = "box" | "sphere" | "torus" | "dice";

export type GeometryNavigateProps = Pick<
  UseSocketReturn,
  "geoMode" | "setGeoMode"
>;

export type ThreeProps = Pick<UseSocketReturn, "existingIds" | "geoMode">;

export interface ClientGeometry {
  geomtry: GeoMode;
  id: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

export type ClientGeometryList = ClientGeometry[];
