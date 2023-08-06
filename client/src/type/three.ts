import { UseSocketReturn } from "./chat";

export type GeoMode = "box" | "sphere" | "torus" | "dice";

export type GeometryNavigateProps = Pick<
  UseSocketReturn,
  "geoMode" | "setGeoMode"
>;

export type ThreeProps = Pick<
  UseSocketReturn,
  "clientCubes" | "geoMode" | "myId"
>;

export type MeshProps = { option: ClientGeometry };

export interface ClientGeometry {
  geometry: GeoMode;
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  visible: boolean;
  color: string;
}

export type ClientGeometryList = ClientGeometry[];
