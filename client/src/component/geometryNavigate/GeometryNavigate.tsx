import { GeometryNavigateProps } from "@/type/three";
import { GEMETRIES } from "../../constant/three";

import ButtonItem from "./ButtonItem";

export default function GeometryNavigate({ geoMode }: GeometryNavigateProps) {
  return (
    <ol className="max-w-[240px] flex flex-wrap gap-2 fixed bottom-[430px] right-[300px] translate-y-full translate-x-full z-10">
      {GEMETRIES.map((item) => (
        <ButtonItem text={item} isActive={item === geoMode} />
      ))}
    </ol>
  );
}
