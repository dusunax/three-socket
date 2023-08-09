import ThreeCanvas from "../component/threeRender/ThreeCanvas";
import Chat from "../component/chatRoom/Chat";

import UseSocket from "../hook/useSocket";
import GeometryNavigate from "../component/geometryNavigate/GeometryNavigate";
import UseChatRoom from "../hook/useChatRoom";

export default function RoomPage() {
  const { messages, sendMessage, clientCubes, geoMode, setGeoMode, myId } =
    UseSocket();
  const { isChatRoom, setIsChatRoom } = UseChatRoom();

  return (
    <>
      <ThreeCanvas clientCubes={clientCubes} geoMode={geoMode} myId={myId} />
      {isChatRoom && (
        <GeometryNavigate geoMode={geoMode} setGeoMode={setGeoMode} />
      )}
      <Chat
        messages={messages}
        sendMessage={sendMessage}
        isChatRoom={isChatRoom}
        setIsChatRoom={setIsChatRoom}
      />
    </>
  );
}
