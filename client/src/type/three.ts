import { UseChatRoomProps, UseSocketProps } from "./chat";

export type GeometryMode = "box" | "sphere" | "torus" | "dice";

export type GeometryNavigateProps = Pick<UseChatRoomProps, "mode" | "setMode">;

export type ThreeProps = Pick<UseChatRoomProps, "mode"> &
  Pick<UseSocketProps, "clientCubes" | "myId">;

export type MeshProps = { option: ClientGeometry };

export interface ClientGeometry {
  geometry: GeometryMode;
  id: string;
  name: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  visible: boolean;
  color: string;
}

export type ClientGeometryList = ClientGeometry[];

export interface GlobalControl {
  orbitPosition: [number, number, number];
  hostId: string;
  isChanging: boolean;
  // orbitTarget: [number, number, number];
  // zoom: number;
}
