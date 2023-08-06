import { MutableRefObject } from "react";
import { ClientGeometry, GeoMode } from "./three";

export type UseSocketReturn = {
  messages: { name: Text; text: string }[];
  sendMessage(e: React.FormEvent<HTMLFormElement>): void;

  existingIds: string[];
  clientCubes: ClientGeometry[];
  geoMode: GeoMode;
  setGeoMode: React.Dispatch<React.SetStateAction<GeoMode>>;
  myId: MutableRefObject<string | null>;
};

export type ChatProps = Pick<UseSocketReturn, "messages" | "sendMessage">;
