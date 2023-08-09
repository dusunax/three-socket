import { UseChatRoomProps } from "@/type/chat";

export default function ChatInput({
  sendMessage,
}: Pick<UseChatRoomProps, "sendMessage">) {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageInput = e.currentTarget[0] as HTMLInputElement;
    sendMessage(messageInput.value);
  };

  return (
    <form className="flex" onSubmit={(e) => onSubmit(e)}>
      <input
        type="text"
        name="message"
        id="messageInput"
        className="flex-1 p-2 outline-none rounded-lg"
        placeholder="메시지를 입력하세요"
        autoFocus
        autoComplete="off"
      />
      <button className="p-2 bg-slate-600 text-white rounded-r">보내기</button>
    </form>
  );
}
