import { MdChat } from "react-icons/md";

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
      className={`w-10 h-10 fixed right-10 bottom-10 bg-slate-600 rounded-full cursor-pointer ${
        isChatRoom ? "right-2 bottom-[400px] z-10" : "w-16 h-16 transition-all"
      }`}
    >
      <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <MdChat color="#fff" size={isChatRoom ? 20 : 30} />
      </span>
    </div>
  );
}
