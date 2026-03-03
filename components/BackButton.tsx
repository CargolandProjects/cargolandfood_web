import { RiArrowGoBackLine } from "react-icons/ri";
import { MenuScreen } from "./header/Header";

const BackButton = ({
  changeTarget,
  title,
  target,
}: {
  changeTarget: (target: MenuScreen) => void;
  title: string;
  target: MenuScreen;
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        changeTarget(target);
      }}
      className="flex items-center gap-2 p-2 text-sm w-full"
    >
      <RiArrowGoBackLine className="size-5" /> {title}
    </button>
  );
};

export default BackButton;
