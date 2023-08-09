import { Dispatch } from "react";

import ChatRoom from "./ChatRoom";
import ChatToggleButton from "./ChatToggleButton";

import { ChatProps } from "@/type/chat";

type ChatPropsWithState = ChatProps & {
  chatRoomId: string;
  isChatRoom: boolean;
  setIsChatRoom: Dispatch<React.SetStateAction<boolean>>;
};

export default function Chat({
  messages,
  sendMessage,
  isChatRoom,
  setIsChatRoom,
  chatRoomId,
}: ChatPropsWithState) {
  return (
    <>
      <ChatToggleButton setIsChatRoom={setIsChatRoom} isChatRoom={isChatRoom} />

      {isChatRoom && (
        <ChatRoom
          messages={messages}
          sendMessage={sendMessage}
          chatRoomId={chatRoomId}
        />
      )}
    </>
  );
}
