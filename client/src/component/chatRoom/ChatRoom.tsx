import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInputBox";

import { ChatProps } from "../../type/chat";

const RoomIdCopyButton = ({ chatRoomId }: { chatRoomId: string }) => {
  const copyRoomID = async () => {
    try {
      await window.navigator.clipboard.writeText(chatRoomId);
      alert("복사되었습니다.");
    } catch (error) {
      console.error("복사 중 오류 발생:", error);
    }
  };

  return (
    <h3
      className="mt-4 px-2 py-1 absolute rounded-lg bg-white cursor-pointer text-sm text-center"
      onClick={copyRoomID}
    >
      <span id="roomID">{chatRoomId}</span> 복사하기
    </h3>
  );
};

export default function ChatRoom({
  messages,
  sendMessage,
  chatRoomId,
}: ChatProps) {
  return (
    <div className="w-[300px] h-[400px] px-4 py-2 rounded-md fixed right-4 bottom-4 bg-slate-300 shadow-md">
      <RoomIdCopyButton chatRoomId={chatRoomId} />

      <ul id="messageList" className="h-[340px] overflow-y-scroll">
        {messages.map((e, idx) => (
          <ChatBubble key={e.name + "" + idx} text={`${e.name}: ${e.text}`} />
        ))}
      </ul>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
