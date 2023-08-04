import { useState } from "react";

import ChatRoom from "./ChatRoom";
import ChatToggleButton from "./ChatToggleButton";

import { ChatProps } from "@/type/chat";

export default function Chat({ messages, sendMessage }: ChatProps) {
  const [isChatRoom, setIsChatRoom] = useState(false);

  return (
    <>
      <ChatToggleButton setIsChatRoom={setIsChatRoom} isChatRoom={isChatRoom} />

      {isChatRoom && <ChatRoom messages={messages} sendMessage={sendMessage} />}
    </>
  );
}
