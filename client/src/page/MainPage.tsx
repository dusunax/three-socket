import { Link } from "react-router-dom";

import CenterYWrapper from "../component/wrapper/CenterYWrapper";
import Button from "../component/element/Button";
import Card from "../component/element/Card";

export default function MainPage() {
  return (
    <CenterYWrapper>
      <Card>
        <h1 className="text-2xl mb-4">Welcome to the Chat Room</h1>
        <h3 className="text-xl">Choose your action</h3>

        <div className="flex flex-col gap-4 justify-center mt-10 mb-10">
          <Link to={"/create"}>
            <Button buttonText="Create Room" />
          </Link>
          <Link to={"/enter"}>
            <Button buttonText="Enter Room" />
          </Link>
        </div>
      </Card>
    </CenterYWrapper>
  );
}
