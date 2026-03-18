"use client";

import { emptyBox } from "@/assets/svgs";
import { Button } from "./ui/button";
import { RiArrowLeftLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  title: string;
  description: string;
}

const NotFound = ({
  title = "  Page not found",
  description = " Sorry, the page you are looking for doesn't exist. Here are some helpful links:",
}: NotFoundProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <section className="flex flex-col items-center justify-center mt-25 sm:mt-[107px] bg-amber-10">
      <div className="size-40 sm:size-50">
        <img
          src={emptyBox.src}
          alt="empty box"
          className="size-full object-cover"
        />
      </div>

      <div className="flex flex-col items-center mt-4 sm:mt-6">
        <p className="text-base font-medium leading-6 text-primary">
          404 error
        </p>
        <h1 className="text-[32px] sm:text-[56px] font-bold leading-10 sm:leading-16 mt-3">
          {title}
        </h1>
        <p className="mt-4 sm:mt-6 sm:text-xl leading-5 sm:leading-7 text-neutral-700 max-w-[343px] sm:max-w-[458px] text-center">
          {description}
        </p>

        <div className="flex gap-3 mt-8 sm:mt-10">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="submit-btn h-11! -[123px]! flex-1 hover:bg-gray-50 text-neutral-800 border-neutral-400 normal-case!"
          >
            <RiArrowLeftLine className="size-5 text-neutral-800" />
            Go back
          </Button>

          <Button
            onClick={handleGoHome}
            className="submit-btn h-11! w-[135px]! flex-1 normal-case!"
          >
            Take me home
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
