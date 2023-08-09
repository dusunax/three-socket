import ThreeCanvas from "../component/threeRender/ThreeCanvas";
import Chat from "../component/chatRoom/Chat";

import GeometryNavigate from "../component/geometryNavigate/GeometryNavigate";
import UseChatRoom from "../hook/useChatRoom";
import UseSocketRender from "../hook/useSocketRender";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RoomPage() {
  const { clientCubes, myId } = UseSocketRender();
  const {
    messages,
    sendMessage,
    isChatRoom,
    setIsChatRoom,
    mode: geoMode,
    setMode: setGeoMode,
    chatRoomId,
  } = UseChatRoom();
  const { id } = useParams();

  return (
    <>
      <ThreeCanvas clientCubes={clientCubes} geoMode={geoMode} myId={myId} />
      {isChatRoom && (
        <GeometryNavigate geoMode={geoMode} setGeoMode={setGeoMode} />
      )}
      <Chat
        chatRoomId={chatRoomId}
        messages={messages}
        sendMessage={sendMessage}
        isChatRoom={isChatRoom}
        setIsChatRoom={setIsChatRoom}
      />
    </>
  );
}
