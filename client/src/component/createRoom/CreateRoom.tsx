import { FormEvent } from "react";

import CenterYWrapper from "../wrapper/CenterYWrapper";
import Card from "../../component/element/Card";
import Input from "../../component/element/Input";
import InputRow from "../../component/element/InputRow";
import Label from "../../component/element/Label";
import Title from "../element/Title";
import GoBackButton from "../element/GoBackButton";

import UseSocket from "../../hook/useSocket";
import UseChatRoom from "../../hook/useChatRoom";

export default function CreateRoom() {
  const { createRoom } = UseSocket();
  const { isChatRoom } = UseChatRoom();

  return (
    <CenterYWrapper>
      <Card>
        <GoBackButton />
        <Title text="Create Room" />

        <h3 className="text-xl">
          submit a{" "}
          <strong className="text-bold text-blue-600">Room name</strong> to
          create
        </h3>

        <form onSubmit={(e) => createRoom(e)} className="text-center mt-20">
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
