import { Loader2 } from "lucide-react";

const Loader = ({ size }: { size?: number }) => {
  const style = `size-${
    size ? size : "6"
  } animate-spin duration-300 text-primary`;
  console.log(style);
  return (
    <Loader2
      className={` ${style}
        animate-spin duration-300 text-primary`}
    />
  );
};

export default Loader;
