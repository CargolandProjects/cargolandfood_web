"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import SettingsMenu from "./SettingsMenu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { logoFull } from "@/assets/images";
import { X } from "lucide-react";

interface SIdeBar {
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
}

const Sidebar = ({ open, setOpen }: SIdeBar) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("Home");
  const [isMobile, setIsMoble] = useState(false);
  const { setActiveCategory } = useCategory();
  const router = useRouter();

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 640;
      setIsMoble(mobile);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleTabChange = (tabId: ActiveTab) => {
    const active = tabId === activeTab ? null : tabId;
    setActiveTab(active);
  };

  const handleClick = () => {
    setActiveTab("Home");
    setActiveCategory(null);
    router.push("/");
  };

  const sidebarItems: SidebarItem[] = [
    { id: "Home", icon: RiHome3Fill, label: "Home" },
    { id: "Cart", icon: RiShoppingCartFill, label: "Cart" },
    { id: "Orders", icon: RiShoppingBagFill, label: "Orders" },
    { id: "Favourite", icon: RiHeartFill, label: "Favourite" },
    {
      id: "Settings",
      icon: RiSettings3Fill,
      label: "Settings",
      content: SettingsMenu,
      props: { setActiveTab },
    },
  ];

  return (
    <>
      {/* Large Screens */}
      {!isMobile && (
        <aside className=" sticky left-0 inset-y-0 w-sidebar shrink-0 bg-white border-r border-gray-100">
          <div className="flex flex-col items-center py-4">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setActiveCategory(null)}
              className="size-6 flex items-center justify-center rounded-sm bg-black overflow-hidden mb-8"
            >
              <img
                src={logo.src}
                alt="Cargoland Food"
                className="object-cover"
              />
            </Link>

            {/* Navigation Items */}
            <nav className="flex flex-col gap-7 flex-1">
              {sidebarItems.map((item, idx) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                // const Content = item.content;

                return (
                  <>
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

                    {/* Rest of the buttons with popups */}
                    {idx > 0 && (
                      <Popover
                        open={isActive}
                        onOpenChange={() => handleTabChange(item.id)}
                        key={idx}
                      >
                        <PopoverTrigger
                          key={item.id}
                          // variant="ghost"
                          onClick={() => handleTabChange(item.id)}
                          className={`relative size-6 rounded-sm transition-colors flex justify-center items-center ${
                            isActive && "bg-gray-100"
                          }`}
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
                        >
                          {item.content && <item.content {...item.props} />}
                        </PopoverContent>
                      </Popover>
                    )}
                  </>
                );
              })}
            </nav>
          </div>
        </aside>
      )}

      {/* Mobile Screens */}
      <AnimatePresence>
        {isMobile && open && (
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
                      className="flex items-center gap-2 hover:cursor-pointer"
                      key={idx}
                    >
                      <div className="size-10 flex items-center justify-center bg-primary-50 rounded-full">
                        <item.icon className="size-6 text-primary" />
                      </div>
                      <p className="text-xl font-medium leading-7">
                        {item.label}
                      </p>
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
                          <div className="fixed inset-0 p-6 z-40 bg-white">
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
