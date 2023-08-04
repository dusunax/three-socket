import Three from "../component/threeRender/Three";
import Chat from "../component/chatRoom/Chat";

import useSocket from "../hook/useSocket";

export default function MainPage() {
  const { messages, sendMessage } = useSocket();

  return (
    <>
      <Three />
      <Chat messages={messages} sendMessage={sendMessage} />
    </>
  );
}
