import ChatRoom from "./ChatRoom";
import ChatToggleButton from "./ChatToggleButton";

import { UseChatRoomProps } from "@/type/chat";

export default function Chat({ ...props }: UseChatRoomProps) {
  const { isChatRoom, setIsChatRoom } = props;

  return (
    <>
      <ChatToggleButton setIsChatRoom={setIsChatRoom} isChatRoom={isChatRoom} />

      {isChatRoom && <ChatRoom {...props} />}
    </>
  );
}
