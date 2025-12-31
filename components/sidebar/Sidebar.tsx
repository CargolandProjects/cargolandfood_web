"use client";

import { useState } from "react";
import { logo } from "@/assets/svgs";
import { Button } from "../ui/button";
import {
  RiHeartFill,
  RiHome3Fill,
  RiShoppingBagFill,
  RiShoppingCartFill,
} from "react-icons/ri";
import { IconType } from "react-icons";
import { useCategory } from "@/contexts/CategoryContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SettingsMenu from "./SettingsMenu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logoFull } from "@/assets/images";
import { X } from "lucide-react";

export type ActiveTab =
  | "Home"
  | "Cart"
  | "Orders"
  | "Favourite"
  | "Settings"
  | null;

interface SidebarItem {
  id: ActiveTab;
  icon: IconType;
  label: string;
}

interface SIdeBar {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const sidebarItems: SidebarItem[] = [
  { id: "Home", icon: RiHome3Fill, label: "Home" },
  { id: "Cart", icon: RiShoppingCartFill, label: "Cart" },
  { id: "Orders", icon: RiShoppingBagFill, label: "Orders" },
  { id: "Favourite", icon: RiHeartFill, label: "Favourite" },
];

const Sidebar = ({ open, setOpen }: SIdeBar) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Home");
  const { setActiveCategory } = useCategory();
  const router = useRouter();

  const handleTabChange = (tabId: ActiveTab) => {
    const active = tabId === activeTab ? null : tabId;
    setActiveTab(active);
  };

  const handleCLick = (id: ActiveTab) => {
    handleTabChange(id);
    router.push("/");
  };

  return (
    <aside
      className={`md:sticky fixed z-40 left-0 inset-y-0 w-full max-w-[375px] md:max-w-sidebar shrink-0 bg-white border-r border-gray-100 transform transition-all duration-300 overflow-hidden ${
        open ? "max-md:translate-x-0" : "max-md:-translate-x-full"
      }`}
    >
      <div className="flex flex-col md:items-center py-4 px-6">
        {/* Logo Large Screens*/}
        <Link
          href="/"
          onClick={() => setActiveCategory(null)}
          className="size-6 overflow-hidden mb-8 max-md:hidden"
        >
          <img src={logo.src} alt="Cargoland Food" className="object-cover" />
        </Link>
        {/* Logo Small Screens*/}
        <div className="md:hidden flex justify-between items-start">
          <Link
            href="/"
            onClick={() => setActiveCategory(null)}
            className="h-10 w-[140px] block overflow-hidden mb-8"
          >
            <img
              src={logoFull.src}
              alt="Cargoland Food"
              className="object-cover"
            />
          </Link>
          <button onClick={() => setOpen(false)}>
            <X className="size-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-12 md:gap-7 flex-1">
          {sidebarItems.map((item, idx) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <>
                {/* Separate home button */}
                {idx === 0 && (
                  <Button
                    onClick={() => {
                      handleCLick(item.id);
                      setActiveCategory(null);
                    }}
                    variant="ghost"
                    className="flex gap-2 items-center self-start p-0! hover:bg-transparent"
                    aria-label={item.label}
                  >
                    <div
                      className={`relative size-10 md:size-6 rounded-sm transition-colors flex justify-center items-center max-md:rounded-full max-md:bg-primary-50  ${
                        isActive && "md:bg-gray-100"
                      }`}
                    >
                      <IconComponent
                        className={`w-5 h-5 transition-colors text-primary ${
                          isActive ? "md:text-primary" : "md:text-gray-300"
                        } `}
                      />
                    </div>
                    <span className=" md:hidden text-xl font-medium leading-7">
                      {item.label}
                    </span>
                  </Button>
                )}

                {/* Rest of the buttons with popups */}
                {idx > 0 && (
                  <Popover
                    open={isActive}
                    onOpenChange={() => handleTabChange(item.id)}
                    key={idx}
                  >
                    <div
                      key={item.id}
                      className="flex gap-2 items-center"
                      onClick={() => handleTabChange(item.id)}
                    >
                      <PopoverTrigger
                        className={`relative size-10 md:size-6 rounded-sm transition-colors flex justify-center items-center max-md:rounded-full max-md:bg-primary-50  ${
                          isActive && "md:bg-gray-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-colors max-md:text-primary ${
                            isActive ? "md:text-primary" : "md:text-gray-300"
                          }`}
                        />
                        {isActive && (
                          <span className="absolute left-8 transform top-1/2 -translate-y-1/2 z-30 text-white py-1 px-3 bg-primary rounded-xl text-xs whitespace-nowrap pointer-events-none">
                            {item.label}
                          </span>
                        )}
                      </PopoverTrigger>
                      <span className="md:hidden text-xl font-medium leading-7">
                        {item.label}
                      </span>
                    </div>
                    <PopoverContent
                      side="right"
                      // sideOffset={8}
                      className="md:w-[374px] rounded-xl max-h-[95vh] overflow-auto hide-scrollbar px-4 shadow"
                    ></PopoverContent>
                  </Popover>
                )}
              </>
            );
          })}
        </nav>

        {/* Settings - Bottom */}
        <SettingsMenu activeTab={activeTab} handleTabChange={handleTabChange} />
      </div>
    </aside>
  );
};

export default Sidebar;
