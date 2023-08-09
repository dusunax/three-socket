export default function ChatBubble({
  text,
  isMyChat,
}: {
  text: string;
  isMyChat: boolean;
}) {
  return (
    <li
      className={`w-4/5 px-4 py-2 mx-2 my-4 bg-yellow-100 rounded-xl rounded-bl-none ${
        isMyChat && "ml-auto bg-blue-100 rounded-br-none rounded-bl-xl"
      }}`}
    >
      {text}
    </li>
  );
}
