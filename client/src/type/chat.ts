import { ClientGeometry, GeometryMode } from "./three";

export interface RoomInfo {
  id: string;
  title: string;
  nickname: string;
}

export interface UseSocketProps {
  myId: string;
  clientCubes: ClientGeometry[];
  initializeCube: (id: string) => void;
}

export interface message {
  message: string;
  nickname: string;
  time: string;
  roomId: string;
}

export type UseChatRoomProps = {
  currentRoomId: string;
  messages: message[];

  mode: GeometryMode;
  setMode: React.Dispatch<React.SetStateAction<GeometryMode>>;
  isChatRoom: boolean;
  setIsChatRoom: React.Dispatch<React.SetStateAction<boolean>>;

  sendMessage: (message: string) => void;
  createRoom: (title: string, nickname: string) => void;
  joinRoom: (roomId: string, nickname: string) => void;
};

export type ChatProps = Pick<
  UseChatRoomProps,
  "messages" | "sendMessage" | "currentRoomId"
>;
