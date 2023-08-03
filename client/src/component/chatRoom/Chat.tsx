import { useState } from "react";

import ChatRoom from "./ChatRoom";
import ChatToggleButton from "./ChatToggleButton";

import useSocket from "../../hook/useSocket";

export default function Chat() {
  const { messages, sendMessage } = useSocket();
  const [isChatRoom, setIsChatRoom] = useState(false);

  return (
    <>
      <ChatToggleButton setIsChatRoom={setIsChatRoom} isChatRoom={isChatRoom} />

      {isChatRoom && <ChatRoom messages={messages} sendMessage={sendMessage} />}
    </>
  );
}
