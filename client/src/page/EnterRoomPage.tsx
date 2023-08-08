import { FormEvent } from "react";

import Card from "../component/element/Card";
import Input from "../component/element/Input";
import InputRow from "../component/element/InputRow";
import Label from "../component/element/Label";

export default function Login() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Card>
      <form onSubmit={(e) => onSubmit(e)} className="text-center">
        <InputRow>
          <Label htmlFor="room">방 이름</Label>
          <Input name="room" autoFocus={true} placeholder="방 이름" />
        </InputRow>

        <InputRow>
          <Label htmlFor="name">닉네임</Label>
          <Input
            name="name"
            autoFocus={false}
            placeholder="닉네임"
            value="익명"
          />
        </InputRow>

        <button className="px-10 py-2 rounded-full bg-slate-900 text-white">
          입장
        </button>
      </form>
    </Card>
  );
}
