import { ClientGeometry, GeoMode } from "./three";

export type UseSocketReturn = {
  messages: { name: Text; text: string }[];
  sendMessage(e: React.FormEvent<HTMLFormElement>): void;

  existingIds: string[];
  clientCubes: ClientGeometry[];
  geoMode: GeoMode;
  setGeoMode: React.Dispatch<React.SetStateAction<GeoMode>>;
  myId: string;
  chatRoomId: string;
};

export type ChatProps = Pick<
  UseSocketReturn,
  "messages" | "sendMessage" | "chatRoomId"
>;
