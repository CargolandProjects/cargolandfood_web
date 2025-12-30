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
import { useRouter, useSearchParams } from "next/navigation";
import SettingsMenu from "./SettingsMenu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export type ActiveTab = "Home" | "Cart" | "Orders" | "Favourite" | "Settings";

interface SidebarItem {
  id: ActiveTab;
  icon: IconType;
  label: string;
}

const sidebarItems: SidebarItem[] = [
  { id: "Home", icon: RiHome3Fill, label: "Home" },
  { id: "Cart", icon: RiShoppingCartFill, label: "Cart" },
  { id: "Orders", icon: RiShoppingBagFill, label: "Orders" },
  { id: "Favourite", icon: RiHeartFill, label: "Favourite" },
];

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Home");
  const { setActiveCategory } = useCategory();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (tabId: ActiveTab) => {
    if (tabId === "Home") setActiveCategory(null);
    setActiveTab(tabId);
  };

  const removeQuery = () => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.replace(`?${params.toString()}`);
  };

  return (
    <aside className="sticky left-0 inset-y-0 w-sidebar shrink-0 bg-white border-r border-gray-100">
      <div className="flex flex-col items-center py-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setActiveCategory(null)}
          className="size-6 flex items-center justify-center rounded-sm bg-black overflow-hidden mb-8"
        >
          <img src={logo.src} alt="Cargoland Food" className="object-cover" />
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-7 flex-1">
          {sidebarItems.map((item, idx) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Popover key={idx}>
                <PopoverTrigger
                  key={item.id}
                  // variant="ghost"
                  onClick={() => {
                    handleTabChange(item.id);
                    if (item.label === "Home") return removeQuery();
                  }}
                  className={`relative size-6 rounded-sm transition-colors flex justify-center items-center ${
                    isActive && "bg-gray-100"
                  }`}
                  aria-label={item.label}
                  aria-pressed={isActive}
                >
                  <IconComponent
                    className={`
                    "w-5 h-5 transition-colors",
                   ${isActive ? "text-primary" : "text-gray-300"}
                  `}
                  />
                  {isActive && (
                    <span className="absolute left-8 transform top-1/2 -translate-y-1/2 z-30 text-white py-1 px-3 bg-primary rounded-xl text-xs whitespace-nowrap pointer-events-none">
                      {item.label}
                    </span>
                  )}
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  sideOffset={8}
                  className="w-[374px] rounded-xl max-h-[95vh] overflow-auto hide-scrollbar px-4 shadow"
                ></PopoverContent>
              </Popover>
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
