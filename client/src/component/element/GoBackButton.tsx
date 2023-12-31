import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(-1)}
      className="cursor-pointer hover:-translate-y-2 transition-transform p-2 pl-3"
    >
      <MdArrowBackIos width={20} />
    </div>
  );
}
