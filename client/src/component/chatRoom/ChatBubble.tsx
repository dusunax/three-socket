export default function ChatBubble({ text }: { text: string }) {
  return (
    <li className="px-4 py-2 mx-2 my-4 bg-yellow-100 rounded-xl rounded-bl-none">
      {text}
    </li>
  );
}
