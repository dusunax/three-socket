import { useEffect, useState } from "react";

export default function UseChatRoom() {
  const [isChatRoom, setIsChatRoom] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // esc 키가 눌렸을 때 isChatRoom 값을 토글
      if (event.keyCode === 27) {
        setIsChatRoom((prevIsChatRoom) => !prevIsChatRoom);
      }
    }

    // 이벤트 리스너 등록
    document.addEventListener("keydown", handleKeyDown);

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return { isChatRoom, setIsChatRoom };
}
