import CenterYWrapper from "../wrapper/CenterYWrapper";
import Card from "../../component/element/Card";
import Input from "../../component/element/Input";
import InputRow from "../../component/element/InputRow";
import Label from "../../component/element/Label";
import Button from "../element/Button";
import Title from "../element/Title";
import GoBackButton from "../element/GoBackButton";

import UseChatRoom from "../../hook/useChatRoom";

export default function EnterRoom() {
  const { joinRoom } = UseChatRoom();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const roomIdInput = form.elements.namedItem("room-id") as HTMLInputElement;
    const nicknameInput = form.elements.namedItem(
      "nickname"
    ) as HTMLInputElement;

    if (roomIdInput && nicknameInput) {
      joinRoom(roomIdInput.value, nicknameInput.value);
    }
  };

  return (
    <CenterYWrapper>
      <Card>
        <GoBackButton />
        <Title text="Enter Room" />

        <h3 className="text-xl">
          please enter a{" "}
          <strong className="text-bold text-blue-600">Room ID code</strong>
        </h3>

        <form onSubmit={(e) => onSubmit(e)} className="text-center mt-20">
          <InputRow>
            <Label htmlFor="room-id">Room ID Code</Label>
            <Input name="room-id" autoFocus={true} placeholder="방 ID 코드" />
          </InputRow>

          <InputRow>
            <Label htmlFor="nickname">nickname</Label>
            <Input
              name="nickname"
              autoFocus={false}
              placeholder="닉네임"
              value="익명"
            />
          </InputRow>

          <Button buttonText="입장" />
        </form>
      </Card>
    </CenterYWrapper>
  );
}
