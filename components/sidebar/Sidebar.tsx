"use client";

import React, { useEffect, useState } from "react";
import { logo } from "@/assets/svgs";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  RiHeartFill,
  RiHome3Fill,
  RiSettings3Fill,
  RiShoppingBagFill,
  RiShoppingCartFill,
} from "react-icons/ri";
import { IconType } from "react-icons";
import { useCategory } from "@/contexts/CategoryContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SettingsMenu from "./settings/SettingsMenu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logoFull } from "@/assets/images";
import { X } from "lucide-react";
import Cart from "./Cart";
import Favourites from "./Favourites";
import Orders from "./Orders";
import { useCart } from "@/lib/hooks/queries/useCart";
import { useGetOrders } from "@/lib/hooks/queries/useOrders";
import { useSession } from "@/lib/hooks/useSession";
import Image from "next/image";

interface SideBar {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export type ActiveTab =
  | "Home"
  | "Cart"
  | "Orders"
  | "Favourite"
  | "Settings"
  | null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface SidebarItem<P = any> {
  id: ActiveTab;
  icon: IconType;
  label: string;
  content?: React.ComponentType<P>;
  props?: P;
  count?: number;
}

// Move sidebarItems outside component to prevent Fast Refresh issues
const getSidebarItems = (
  setActiveTab: (tab: ActiveTab) => void,
  isAuthenticated: boolean,
  setOpen: (v: boolean) => void,
  count: { cartCount: number; OrdersCount: number }
): SidebarItem[] => [
  { id: "Home", icon: RiHome3Fill, label: "Home" },
  {
    id: "Cart",
    icon: RiShoppingCartFill,
    label: "Cart",
    content: Cart,
    count: count.cartCount,
    props: { setActiveTab, isAuthenticated },
  },
  {
    id: "Orders",
    icon: RiShoppingBagFill,
    label: "Orders",
    content: Orders,
    count: count.OrdersCount,
    props: { setActiveTab, isAuthenticated },
  },
  {
    id: "Favourite",
    icon: RiHeartFill,
    label: "Favourite",
    content: Favourites,
    props: { setActiveTab, isAuthenticated },
  },
  {
    id: "Settings",
    icon: RiSettings3Fill,
    label: "Settings",
    content: SettingsMenu,
    props: { setActiveTab, isAuthenticated, setOpen },
  },
];

const Sidebar = ({ open, setOpen }: SideBar) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const { setActiveCategory } = useCategory();
  const { isAuthenticated } = useSession();
  const router = useRouter();
  const path = usePathname();

  const { data: cart } = useCart(isAuthenticated);
  const { data: orders } = useGetOrders(isAuthenticated);
  const cartItems = cart?.length || 0;
  const currentOrders =
    orders?.filter((o) => o.status !== "COMPLETED").length || 0;

  // Detect if we're on desktop (only runs once on mount, then on resize)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true; // SSR fallback to desktop
    return window.matchMedia("(min-width: 640px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleTabChange = (tabId: ActiveTab) => {
    const active = tabId === activeTab ? null : tabId;
    setActiveTab(active);
  };

  const handleClick = () => {
    setOpen(false);
    setActiveTab(null);
    setActiveCategory(null);
    router.push("/");
  };

  const sidebarItems = getSidebarItems(setActiveTab, isAuthenticated, setOpen, {
    cartCount: cartItems,
    OrdersCount: currentOrders,
  });

  return (
    <>
      {/* Large Screens */}
      {isDesktop && (
        <aside className="max-sm:hidden h-full sticky inset-y-0 w-sidebar shrink-0 border-r border-gray-100 bg-white">
          <div className="flex flex-col items-center ">
            {/* Logo */}
            <div className="py-4 w-full flex justify-center">
              <Link
                href="/"
                onClick={() => setActiveCategory(null)}
                className="relative size-6 flex items-center justify-center rounded-sm bg-black overflow-hidden"
              >
                <Image
                  src={logo.src}
                  alt="Cargoland Food"
                  className="object-cover"
                  fill
                />
              </Link>
            </div>

            {/* Navigation Items */}
            <nav className="mt-3 pt-3 pb-2 flex flex-col items-center gap-6.5 flex-1 w-full">
              {sidebarItems.map((item, idx) => {
                const IconComponent = item.icon;
                const isActive =
                  item.id === "Home"
                    ? path === "/" && activeTab === null
                    : activeTab === item.id;
                return (
                  <React.Fragment key={idx}>
                    {/* Separate home button */}
                    {idx === 0 && (
                      <Button
                        onClick={handleClick}
                        variant="ghost"
                        className={`relative size-6 rounded-sm transition-colors flex justify-center items-center ${
                          isActive && "bg-gray-100"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-colors ${
                            isActive ? "text-primary" : "text-gray-300"
                          } `}
                        />
                      </Button>
                    )}

                    {/* Rest of the buttons with popups except settings */}
                    {idx > 0 && item.id !== "Settings" && (
                      <Popover
                        open={isActive}
                        onOpenChange={() => handleTabChange(item.id)}
                        key={idx}
                      >
                        <PopoverTrigger
                          key={item.id}
                          // variant="ghost"
                          onClick={() => handleTabChange(item.id)}
                          className={`relative size-6 rounded-sm transition-colors flex justify-center items-center 
                            ${isActive && "bg-gray-100"}`}
                        >
                          <IconComponent
                            className={`w-5 h-5 transition-colors ${
                              isActive ? "text-primary" : "text-gray-300"
                            }`}
                          />
                          {(item.count ?? 0) > 0 && (
                            <div className="absolute -top-1.5 -right-4.5 px-1.5 bg-primary rounded-full text-xs text-white">
                              {item.count}
                            </div>
                          )}
                          {isActive && (
                            <span className="absolute left-8 transform top-1/2 -translate-y-1/2 z-30 text-white py-1 px-3 bg-primary rounded-xl text-xs whitespace-nowrap pointer-events-none">
                              {item.label}
                            </span>
                          )}
                        </PopoverTrigger>
                        <PopoverContent
                          side="right"
                          sideOffset={8}
                          className="w-[374px] mt-10 rounded-xl h-[713px] overflow-auto hide-scrollbar py-6 px-4 shadow"
                        >
                          {item.content && <item.content {...item.props} />}
                        </PopoverContent>
                      </Popover>
                    )}

                    {/* Settings Popup */}
                    {item.id === "Settings" && (
                      <div className="w-full border-t border-gray-100 py-3 flex justify-center">
                        <Popover
                          open={isActive}
                          onOpenChange={() => handleTabChange(item.id)}
                          key={idx}
                        >
                          <PopoverTrigger
                            key={item.id}
                            // variant="ghost"
                            onClick={() => handleTabChange(item.id)}
                            className={`relative size-6 rounded-sm transition-colors flex justify-center items-center 
                            ${isActive && "bg-gray-100"}`}
                          >
                            <IconComponent
                              className={`w-5 h-5 transition-colors ${
                                isActive ? "text-primary" : "text-gray-300"
                              }`}
                            />
                            {(item.count ?? 0) > 0 && (
                              <div className="absolute -top-1.5 -right-4.5 px-1.5 bg-primary rounded-full text-xs text-white">
                                {item.count}
                              </div>
                            )}
                            {isActive && (
                              <span className="absolute left-8 transform top-1/2 -translate-y-1/2 z-30 text-white py-1 px-3 bg-primary rounded-xl text-xs whitespace-nowrap pointer-events-none">
                                {item.label}
                              </span>
                            )}
                          </PopoverTrigger>
                          <PopoverContent
                            side="right"
                            sideOffset={8}
                            className="w-[374px] mt-10 rounded-xl h-[713px] overflow-auto hide-scrollbar py-6 px-4 shadow"
                          >
                            {item.content && <item.content {...item.props} />}
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          </div>
        </aside>
      )}

      {/* Mobile Screens */}
      <AnimatePresence>
        {!isDesktop && open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            className="md:hidden fixed inset-0 pt-10 px-6 bg-white z-35 "
          >
            <div className="flex items-start justify-between">
              <Link
                href="/"
                onClick={() => setActiveCategory(null)}
                className="relative h-10 w-[140px] block overflow-hidden mb-8"
              >
                <Image
                  src={logoFull.src}
                  alt="Cargoland Food"
                  className="object-cover"
                  fill
                />
              </Link>
              <button onClick={() => setOpen(false)}>
                <X className="size-4" />
              </button>
            </div>

            <div className="grid gap-6">
              {sidebarItems.map((item, idx) => {
                const isActive = activeTab === item.id;
                return (
                  <>
                    <div
                      onClick={() => {
                        if (idx === 0) {
                          handleClick();
                        } else {
                          handleTabChange(item.id);
                        }
                      }}
                      className="flex items-center justify-between gap-2 hover:cursor-pointer"
                      key={idx}
                    >
                      <div className="flex items-center gap-2">
                        <div className="size-10 flex items-center justify-center bg-primary-50 rounded-full">
                          <item.icon className="size-6 text-primary" />
                        </div>
                        <p className="text-xl font-medium leading-7">
                          {item.label}
                        </p>
                      </div>

                      {(item.count ?? 0) > 0 && (
                        <div className="flex items-center gap-2 bg-primary-100 px-3 rounded-full">
                          <span className="text-primary">{item.count}</span>
                        </div>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.content && isActive && (
                        <motion.aside
                          initial={{ x: "-100%" }}
                          animate={{ x: 0 }}
                          exit={{ x: "-100%" }}
                          transition={{
                            type: "tween",
                            ease: "easeOut",
                            duration: 0.15,
                          }}
                          className="md:hidden fixed inset-0 pt-10 px-6 bg-white z-35 "
                        >
                          <div className="fixed inset-0 h-dvh p-4 z-40 bg-white">
                            <item.content {...item.props} />
                          </div>
                        </motion.aside>
                      )}
                    </AnimatePresence>
                  </>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
