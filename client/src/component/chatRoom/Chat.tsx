import { useState } from "react";

import ChatRoom from "./ChatRoom";
import ChatToggleButton from "./ChatToggleButton";

import useSocket from "../../hook/useSocket";

export default function Chat() {
  const [isChatRoom, setIsChatRoom] = useState(false);
  const { messages, sendMessage } = useSocket();

  return (
    <>
      <ChatToggleButton setIsChatRoom={setIsChatRoom} isChatRoom={isChatRoom} />

      {isChatRoom && <ChatRoom messages={messages} sendMessage={sendMessage} />}
    </>
  );
}
