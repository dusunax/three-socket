import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInputBox";

type ChatRoomProps = {
  messages: string[];
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ChatRoom({ messages, sendMessage }: ChatRoomProps) {
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
