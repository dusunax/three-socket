import { useState } from "react";

import ChatRoom from "./ChatRoom";
import ChatToggleButton from "./ChatToggleButton";

import { UseSocketReturn } from "../../hook/useSocket";

export default function Chat({
  messages,
  sendMessage,
}: Omit<UseSocketReturn, "existingIds">) {
  const [isChatRoom, setIsChatRoom] = useState(false);

  return (
    <>
      <ChatToggleButton setIsChatRoom={setIsChatRoom} isChatRoom={isChatRoom} />

      {isChatRoom && <ChatRoom messages={messages} sendMessage={sendMessage} />}
    </>
  );
}
