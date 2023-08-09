import { FormEvent } from "react";

import CenterYWrapper from "../wrapper/CenterYWrapper";
import Card from "../../component/element/Card";
import Input from "../../component/element/Input";
import InputRow from "../../component/element/InputRow";
import Label from "../../component/element/Label";
import Button from "../element/Button";
import Title from "../element/Title";
import GoBackButton from "../element/GoBackButton";

export default function EnterRoom() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <Label htmlFor="room">Room ID Code</Label>
            <Input name="room" autoFocus={true} placeholder="방 ID 코드" />
          </InputRow>

          <InputRow>
            <Label htmlFor="name">nickname</Label>
            <Input
              name="name"
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
