import { MdChat } from "react-icons/md";

type ChatToggleButtonProps = {
  setIsChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
  isChatRoom: boolean;
};

export default function ChatToggleButton({
  setIsChatRoom,
  isChatRoom,
}: ChatToggleButtonProps) {
  const mobileCSS = `w-full right-0 bottom-0 rounded-t-xl`;
  const mobileIsChatRoomCSS = `h-10 right-0 bottom-0`;

  return (
    <div
      onClick={() => setIsChatRoom((prev) => !prev)}
      className={`${mobileCSS} sm:w-12 sm:h-12 fixed sm:right-10 sm:bottom-10 bg-slate-600 sm:rounded-full cursor-pointer  ${
        isChatRoom
          ? `${mobileIsChatRoomCSS} sm:right-2 sm:bottom-[500px] z-10`
          : "w-16 h-16 transition-all"
      }`}
    >
      <span className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ">
        <MdChat color="#fff" size={isChatRoom ? 20 : 30} />
      </span>
    </div>
  );
}
