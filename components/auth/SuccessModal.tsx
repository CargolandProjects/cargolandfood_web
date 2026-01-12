import ModalTransition from "./ModalTransition";
import useAuthFlow from "@/lib/stores/authFlowStore";
import successGif from "@/assets/gifs/success.gif";
import { Button } from "../ui/button";

const SuccessModal = () => {
  const goTo = useAuthFlow((s) => s.goToStep);

  const handleProceed = () => {
    goTo("signin");
  };

  return (
    <ModalTransition>
      <div className="flex flex-col items-center justify-center sm:max-w-[312px] mx-auto">
        <div className="h-[142px] w-[180px]">
          <img
            src={successGif.src}
            alt="success_gif"
            className="size-full object-cover"
          />
        </div>
        <div className="mt-2 space-y-2 text-center">
          <h3 className="font-bold">Sign Up Successful</h3>
          <p className="text-neutral-600">You’re all set, find great restaurants and enjoy <br className="hidden xs:block" />seamless food delivery anytime you want. </p>
        </div>
        <Button
          onClick={handleProceed}
          className="mt-10 sm:mb-[5px] sm:py-3.5 submit-btn"
        >
          Proceed To Login
        </Button>
      </div>
    </ModalTransition>
  );
};

export default SuccessModal;
