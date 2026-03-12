import { alert } from "@/assets/svgs";
import { Button } from "./ui/button";
import useAuthFlow from "@/lib/stores/authFlowStore";

interface UnauthenticatedUiProps {
  //   title: string;
  description: string;
}

const UnauthenticatedUi = ({ description }: UnauthenticatedUiProps) => {
  const { openAuth } = useAuthFlow();
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="rounded-2xl pb-6.5">
        <img src={alert.src} alt="alert icon" />
      </div>
      <div className="mt-6">
        <h3 className="text-lg text-neutral-600 leading-6 text-center">
          Sign In Required
        </h3>
        <p className="text-base leading-5 text-neutral-500 max-w-[324px] mt-3 text-center">
          {description}
        </p>
      </div>
      <Button onClick={() => openAuth()} className="h-11 w-[135px] mt-6">
        Sign In
      </Button>
    </div>
  );
};

export default UnauthenticatedUi;
