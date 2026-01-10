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
import { ScrollArea } from "./ui/scroll-area";

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
      <DialogContent className="dialog">
        <DialogHeader className="mt-13.5 sm:mt-16.5">
          <DialogTitle className="dialog-title max-sm:text-lg! max-sm:leading-6!">
            Favourites from Sharwarma Plus+
          </DialogTitle>
        </DialogHeader>

        {/* Food items */}
        <ScrollArea className="max-h-[386px] mt-3 sm:mt-4 pb-4.5">
          <div className="space-y-2 sm:space-y-4 py-1">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="h-[116px] flex items-center justify-center gap-2 rounded-2xl border border-neutral-300"
              >
                {/* Food image */}
                <div className="w-[120px] h-[108px] ml-1 overflow-hidden rounded-l-button rounded-r-xs">
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
                  <div className="flex items-centehr justify-between mt-1">
                    <p className="mt-3 text-base font-medium ">₦{item.price}</p>
                    <button className=" size-9 rounded-md bg-primary-300 flex items-center justify-center">
                      <RiAddFill className="size-5 text-primary" />
                    </button>
                  </div>
                </div>

                {/* Add button */}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
