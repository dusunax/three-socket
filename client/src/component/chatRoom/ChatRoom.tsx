import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInputBox";

import useSocket from "../../hook/useSocket";

export default function Chat() {
  const { messages, sendMessage } = useSocket();

  return (
    <div className="w-[300px] h-[400px] px-4 py-2 rounded-md fixed right-4 bottom-4 bg-slate-300 shadow-md">
      <ul id="messageList" className="h-[340px] overflow-y-scroll">
        {messages.map((e) => (
          <ChatBubble key={e} text={e} />
        ))}
      </ul>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
