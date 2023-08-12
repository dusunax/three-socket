interface Message {
  message: string;
  nickname: string;
  time: string;
  roomId: string;
}

interface Room {
  id: string;
  title: string;
  nickname: string;
}

interface ClientCube {
  geometry: string;
  id: string;
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  visible: boolean;
  color: string;
}

interface Client {
  id: string | undefined;
  name: string | undefined;
}

interface GlobalControl {
  orbitPosition: number[];
  hostId: string;
  isChanging: boolean;
}
