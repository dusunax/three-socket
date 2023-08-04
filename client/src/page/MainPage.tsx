import ThreeCanvas from "../component/threeRender/ThreeCanvas";
import Chat from "../component/chatRoom/Chat";

import useSocket from "../hook/useSocket";

export default function MainPage() {
  const { messages, sendMessage, existingIds, geoMode } = useSocket();

  return (
    <>
      <ThreeCanvas existingIds={existingIds} geoMode={geoMode} />
      <Chat messages={messages} sendMessage={sendMessage} />
    </>
  );
}
