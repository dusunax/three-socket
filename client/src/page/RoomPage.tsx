import ThreeCanvas from "../component/threeRender/ThreeCanvas";
import GeometryNavigate from "../component/geometryNavigate/GeometryNavigate";
import Chat from "../component/chatRoom/Chat";

import UseChatRoom from "../hook/useChatRoom";

export default function RoomPage() {
  const props = { ...UseChatRoom() };
  const { isChatRoom, mode, setMode } = props;
  return (
    <>
      <ThreeCanvas {...props} />

      {isChatRoom && <GeometryNavigate mode={mode} setMode={setMode} />}

      <Chat {...props} />
    </>
  );
}
