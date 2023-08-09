import CenterYWrapper from "../wrapper/CenterYWrapper";
import Card from "../../component/element/Card";
import Input from "../../component/element/Input";
import InputRow from "../../component/element/InputRow";
import Label from "../../component/element/Label";
import Title from "../element/Title";
import GoBackButton from "../element/GoBackButton";

import UseChatRoom from "../../hook/useChatRoom";

export default function CreateRoom() {
  const { createRoom } = UseChatRoom();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const nicknameInput = form.elements.namedItem(
      "nickname"
    ) as HTMLInputElement;

    if (titleInput && nicknameInput) {
      createRoom(titleInput.value, nicknameInput.value);
    }
  };

  return (
    <CenterYWrapper>
      <Card>
        <div className="row flex mb-10">
          <GoBackButton />
        </div>

        <Title text="Create Room" />

        <h3 className="text-xl">
          submit a{" "}
          <strong className="text-bold text-blue-600">Room name</strong> to
          create
        </h3>

        <form
          onSubmit={(e) => onSubmit(e)}
          className="text-center mt-10 sm:mt-20"
        >
          <InputRow>
            <Label htmlFor="title">Room name</Label>
            <Input name="title" autoFocus={true} placeholder="방 이름" />
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

          <button className="px-10 py-2 rounded-full bg-slate-900 text-white">
            만들기
          </button>
        </form>
      </Card>
    </CenterYWrapper>
  );
}
