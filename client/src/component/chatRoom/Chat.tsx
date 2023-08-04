import { useState } from "react";

import ChatRoom from "./ChatRoom";
import ChatToggleButton from "./ChatToggleButton";

import { useSocketReturn } from "../../hook/useSocket";

export default function Chat({ messages, sendMessage }: useSocketReturn) {
  const [isChatRoom, setIsChatRoom] = useState(false);

  return (
    <>
      <ChatToggleButton setIsChatRoom={setIsChatRoom} isChatRoom={isChatRoom} />

      {isChatRoom && <ChatRoom messages={messages} sendMessage={sendMessage} />}
    </>
  );
}
