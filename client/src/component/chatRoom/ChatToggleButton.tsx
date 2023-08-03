type ChatToggleButtonProps = {
  setIsChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
  isChatRoom: boolean;
};

export default function ChatToggleButton({
  setIsChatRoom,
  isChatRoom,
}: ChatToggleButtonProps) {
  return (
    <div
      onClick={() => setIsChatRoom((prev) => !prev)}
      className={`w-10 h-10 fixed right-10 bottom-10 bg-cyan-300 rounded-full ${
        isChatRoom ? "right-2 bottom-[400px] z-10" : ""
      }`}
    >
      채팅
    </div>
  );
}
