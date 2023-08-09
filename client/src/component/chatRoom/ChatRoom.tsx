import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInputBox";

import { UseChatRoomProps } from "../../type/chat";

const RoomIdCopyButton = ({ currentRoomId }: { currentRoomId: string }) => {
  const copyRoomID = async () => {
    try {
      await window.navigator.clipboard.writeText(currentRoomId);
      alert("복사되었습니다.");
    } catch (error) {
      console.error("복사 중 오류 발생:", error);
    }
  };

  return (
    <h3
      className="w-[80%] mt-12 px-2 py-1 absolute rounded-lg bg-white cursor-pointer text-sm text-center"
      onClick={copyRoomID}
    >
      <span id="roomID">{currentRoomId}</span> 복사하기
    </h3>
  );
};

export default function ChatRoom({ ...props }: UseChatRoomProps) {
  const { messages, sendMessage, currentRoomId } = props;
  const title = localStorage.getItem("title");

  return (
    <div className="w-[40%] h-[500px] px-6 py-4 rounded-md fixed flex flex-col right-4 bottom-4 bg-slate-300 shadow-md">
      <RoomIdCopyButton currentRoomId={currentRoomId} />

      <h3 className="text-xl translate-y-2">{title}</h3>

      <ul
        id="messageList"
        className="flex-1 mt-20 overflow-y-scroll scroll-mb-2"
      >
        {messages.map((e, idx) => {
          const isMyChat = true;
          return (
            <ChatBubble
              key={e.nickname + "" + idx}
              text={`${e.nickname}: ${e.message}`}
              isMyChat={isMyChat}
            />
          );
        })}
      </ul>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
