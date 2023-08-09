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
      className="sm:w-full sm:mx-auto px-5 py-2 mt-2 rounded-lg bg-white cursor-pointer text-xs text-center"
      onClick={copyRoomID}
    >
      <span id="roomID">{currentRoomId}</span> 복사하기
    </h3>
  );
};

export default function ChatRoom({ ...props }: UseChatRoomProps) {
  const { messages, sendMessage, currentRoomId } = props;
  const title = localStorage.getItem("title");

  const mobileCSS = `w-full h-full right-0 bottom-10 pb-6 pt-[100px] rounded-none `;

  return (
    <div
      className={`${mobileCSS} sm:w-[40%] sm:h-[500px] px-6 sm:py-4 sm:rounded-md fixed flex flex-col sm:right-4 sm:bottom-4 bg-slate-300 shadow-md`}
    >
      <h3 className="text-xl ">{title}</h3>
      <RoomIdCopyButton currentRoomId={currentRoomId} />

      <ul
        id="messageList"
        className="flex-1 mt-2 overflow-y-scroll scroll-mb-2"
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
