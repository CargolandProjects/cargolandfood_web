"use client";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useState } from "react";
import { RiFileCopyLine } from "react-icons/ri";

const CopyButton = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      // optional: show toast here
    } catch {
      console.error("Failed to copy");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={handleCopy}
          variant="ghost"
          className="size-fit p-0! hover:bg-transparent "
          aria-label="Copy"
        >
          <RiFileCopyLine className="size-4 text-neutral-400" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        className="w-fit px-2 py-1 text-xs bg-black text-white rounded-full"
      >
        Copied!
      </PopoverContent>
    </Popover>
  );
};

export default CopyButton;
