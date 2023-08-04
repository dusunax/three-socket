import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInputBox";

import { ChatProps } from "../../type/chat";

export default function ChatRoom({ messages, sendMessage }: ChatProps) {
  return (
    <div className="w-[300px] h-[400px] px-4 py-2 rounded-md fixed right-4 bottom-4 bg-slate-300 shadow-md">
      <ul id="messageList" className="h-[340px] overflow-y-scroll">
        {messages.map((e, idx) => (
          <ChatBubble key={e + idx} text={e} />
        ))}
      </ul>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
