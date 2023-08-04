import Three from "../component/threeRender/Three";
import Chat from "../component/chatRoom/Chat";

import useSocket from "../hook/useSocket";

export default function MainPage() {
  const { messages, sendMessage, existingIds } = useSocket();

  return (
    <>
      <Three existingIds={existingIds} />
      <Chat messages={messages} sendMessage={sendMessage} />
    </>
  );
}
