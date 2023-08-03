type ChatInputProps = {
  sendMessage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function ChatInput({ sendMessage }: ChatInputProps) {
  return (
    <div>
      <input
        type="text"
        id="messageInput"
        className="p-2 outline-none rounded-l"
        placeholder="메시지를 입력하세요"
      />
      <button
        className="p-2 bg-slate-600 text-white rounded-r"
        onClick={(e) => sendMessage(e)}
      >
        보내기
      </button>
    </div>
  );
}
