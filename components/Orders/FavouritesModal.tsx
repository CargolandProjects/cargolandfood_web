"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { burger, pizza } from "@/assets/images";
import { RiAddFill } from "react-icons/ri";
import { ScrollArea } from "../ui/scroll-area";

interface FavouriteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

const foodItems = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: "9,650",
    image: pizza.src,
  },
  {
    id: 2,
    name: "Hamburger",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: "7,000",
    image: burger.src,
  },
  {
    id: 3,
    name: "Hamburger",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: "7,000",
    image: burger.src,
  },
  {
    id: 1,
    name: "Pepperoni Pizza",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: "9,650",
    image: pizza.src,
  },
  {
    id: 2,
    name: "Hamburger",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: "7,000",
    image: burger.src,
  },
  {
    id: 3,
    name: "Hamburger",
    description: "Hot & fresh pizza adorned with pepperoni on tomato...",
    price: "7,000",
    image: burger.src,
  },
];

export default function FavouritesModal({
  open,
  onOpenChange,
  onConfirm,
}: FavouriteModalProps) {
  // const handleConfirm = () => {
  //   onConfirm?.();
  //   onOpenChange(false);
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px]! p-0 px-7 gap-0 rounded-2xl">
        <DialogHeader className="mt-16.5">
          <DialogTitle className="dialog-title ">
            Favourites from Sharwarma Plus+
          </DialogTitle>
        </DialogHeader>

        {/* Food items */}
        <ScrollArea className="max-h-[386px] mt-4 pb-4.5">
          <div className="space-y-4 ">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center gap-2 "
              >
                {/* Food image */}
                <div className="w-[120px] h-[108px] overflow-hidden rounded-l-button rounded-r-xs">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="size-full object-cover"
                  />
                </div>

                {/* Food details */}
                <div className="flex-1">
                  <p className="text-sm font-medium ">{item.name}</p>
                  <p className="text-xs font-regular text-neutral-600 leading-4 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="mt-3 font-base font-medium ">₦{item.price}</p>
                </div>

                {/* Add button */}
                <button className=" size-9 rounded-md bg-primary-300 flex items-center justify-center">
                  <RiAddFill className="size-5 text-primary" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
