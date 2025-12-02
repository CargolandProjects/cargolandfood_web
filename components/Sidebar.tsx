"use client";

import React, { useState } from "react";
import { logo } from "@/assets/svgs";
import { Button } from "./ui/button";
import {
  RiHeartFill,
  RiHome3Fill,
  RiSettings3Fill,
  RiShoppingBagFill,
  RiShoppingCartFill,
} from "react-icons/ri";
import { IconType } from "react-icons";
import { useCategory } from "@/contexts/CategoryContext";

type ActiveTab = "Home" | "Cart" | "Orders" | "Favourite" | "Settings";

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

  const handleTabChange = (tabId: ActiveTab) => {
    if (tabId === "Home") setActiveCategory(null);
    setActiveTab(tabId);
  };

  return (
    <aside className="sticky left-0 inset-y-0 w-sidebar shrink-0 bg-white border-r border-gray-100">
      <div className="flex flex-col items-center py-4">
        {/* Logo */}
        <div className="size-6 flex items-center justify-center rounded-sm bg-black overflow-hidden mb-8">
          <img src={logo.src} alt="Cargoland Food" className="object-cover" />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-7 flex-1">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => handleTabChange(item.id)}
                className={`relative size-6 rounded-sm transition-colors ${
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
              </Button>
            );
          })}
        </nav>

        {/* Settings - Bottom */}
        <Button
          variant="ghost"
          onClick={() => handleTabChange("Settings")}
          className={`relative size-10 rounded-sm transition-colors mt-auto ${
            activeTab === "Settings" && "bg-gray-100"
          }`}
          aria-label="Settings"
        >
          <RiSettings3Fill
            className={`
              "w-5 h-5 transition-colors",
         ${activeTab === "Settings" ? "text-primary" : "text-gray-300"}
            `}
          />
          {activeTab === "Settings" && (
            <span className="absolute left-12 top-1/2 -translate-y-1/2 z-30 text-white py-1 px-3 bg-primary rounded-xl text-xs whitespace-nowrap pointer-events-none">
              Settings
            </span>
          )}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
