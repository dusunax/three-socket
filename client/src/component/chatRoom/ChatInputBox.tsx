type ChatInputProps = {
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ChatInput({ sendMessage }: ChatInputProps) {
  return (
    <form onSubmit={(e) => sendMessage(e)}>
      <input
        type="text"
        name="message"
        id="messageInput"
        className="p-2 outline-none rounded-l"
        placeholder="메시지를 입력하세요"
        autoFocus
        autoComplete="off"
      />
      <button className="p-2 bg-slate-600 text-white rounded-r">보내기</button>
    </form>
  );
}
