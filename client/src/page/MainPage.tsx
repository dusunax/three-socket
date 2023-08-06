import { useState } from "react";

import ThreeCanvas from "../component/threeRender/ThreeCanvas";
import Chat from "../component/chatRoom/Chat";

import UseSocket from "../hook/useSocket";
import GeometryNavigate from "../component/geometryNavigate/GeometryNavigate";
import UseChatRoom from "../hook/useChatRoom";

export default function MainPage() {
  const { messages, sendMessage, existingIds, geoMode } = UseSocket();
  const { isChatRoom, setIsChatRoom } = UseChatRoom();

  return (
    <>
      <ThreeCanvas existingIds={existingIds} geoMode={geoMode} />
      {isChatRoom && <GeometryNavigate geoMode={geoMode} />}
      <Chat
        messages={messages}
        sendMessage={sendMessage}
        isChatRoom={isChatRoom}
        setIsChatRoom={setIsChatRoom}
      />
    </>
  );
}
