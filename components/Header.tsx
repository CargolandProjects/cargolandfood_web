"use client";

import { bell } from "@/assets/svgs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/hooks/useSession";
import useAuthFlow from "@/lib/stores/authFlowStore";
import { AnimatePresence, motion } from "framer-motion";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  RiMapPinFill,
  RiWallet3Fill,
  RiArrowDownSLine,
  RiSearchLine,
  RiNotification2Fill,
  RiUser3Fill,
  RiArrowRightSLine,
  RiMenu4Line,
  RiArrowLeftLine,
} from "react-icons/ri";
import Notifications from "./Notifications";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import MenuContent from "./MenuContent";

interface HeaderProps {
  setSideBar: (v: boolean) => void;
}

export type MenuScreen = "root" | "personalInfo";

export function Header({ setSideBar }: HeaderProps) {
  const [screen, setScreen] = useState<MenuScreen>("root");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const path = usePathname();
  const OpenAuth = useAuthFlow((s) => s.openAuth);
  const { user: session, isAuthenticated, signOut } = useSession();
  console.log("Session Data:", session);

  const [firstName, lastName] = session?.fullName.split(" ") || [];
  const initials =
    (firstName &&
      lastName &&
      `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()) ||
    "";

  const SEARCH_ROUTES = ["/", "/restaurants", "/groceries", "/markets"];
  const BACK_ROUTES = ["/restaurants", "/groceries", "/markets"];

  const matchRoutes = (routes: string[], path: string) =>
    routes.some((route) => path === route || path.startsWith(route + "/"));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`?search=${search}`);
    setSearch("");
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const showSearch = matchRoutes(SEARCH_ROUTES, path);
  const showBack = matchRoutes(BACK_ROUTES, path);

  // session.signOut();
  return (
    <header className="sticky top-0 z-30 px-4 sm:px-6 py-2 max-sm:pb-1 bg-white sm:border-b border-gray-100">
      <div className="max-sm:flex justify-between gap-2">
        {/* mobile menu button */}
        <Button
          onClick={() => setSideBar(true)}
          className="sm:hidden size-10 rounded-full bg-white button-shadow"
          variant="ghost"
        >
          <RiMenu4Line className="size-6 text-brand-black" />
        </Button>
        <div className="max-w-full flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            {/* Location Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex">
                  <RiMapPinFill className="size-6 text-primary mb-1" />
                  <div className="text-left ml-0.5 flex-1 sm:space-y-0.5">
                    <div className="text-xs font-medium leading-4">
                      Your Location
                    </div>
                    <div className="text-xxs leading-3 text-gray-600">
                      45 Denkede St, Shomolu...
                    </div>
                  </div>
                  <RiArrowDownSLine className="size-5 text-neutral-600 ml-0.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem>
                  45 Denkede St, Shomolu, Lagos
                </DropdownMenuItem>
                <DropdownMenuItem>Add new location</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Wallet Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="max-sm:hidden">
                <button className="flex items-center gap-1 hover:bg-gray-100">
                  <RiWallet3Fill className="size-6  text-blue-400 " />
                  <p className="text-xs font-medium text-gray-900">My Wallet</p>
                  <RiArrowDownSLine className="size-5 text-gray-600 ml-2" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-[161px] dropdown-content"
              >
                <DropdownMenuLabel className="p-0">
                  Available Balance
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="border-gray-200 border mt-1 mb-2" />
                <DropdownMenuItem className="text-gray-500 font-medium p-0 justify-between">
                  #20,000.00 <RiArrowRightSLine className="size-6" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Section */}
          <div className="flex sm:flex-1 bg-amber-00 shrink items-center justify-end gap-2 sm:gap-6">
            {/* Search Bar */}
            <form
              onSubmit={handleSubmit}
              className="max-sm:hidden relative flex-1 max-w-[416px]"
            >
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for food, restaurants...."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* Notification Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full size-7 sm:size-10 max-sm:bg-neutral-300 flex justify-center items-center">
                  <RiNotification2Fill className="size-6 text-gray-300 max-sm:hidden" />
                  <img
                    src={bell.src}
                    alt="notification icon"
                    className=" sm:hidden text-neutral-600"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="dropdown-content w-[271px]"
              >
                <DropdownMenuLabel className="font-bold text-base flex gap-4.5 p-0 mb-6">
                  {/* <RiArrowGoBackLine className="size-5" /> */}
                  Notification
                </DropdownMenuLabel>
                <Notifications />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Dropdown */}
            {isAuthenticated && session ? (
              <DropdownMenu onOpenChange={() => setScreen("root")}>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="size-7 sm:size-10 border-2">
                      <AvatarImage
                        src={session?.avatarUrl}
                        alt={session?.fullName}
                      />
                      <AvatarFallback className="max-sm:text-xs pt-0.5">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <RiArrowDownSLine className="size-5 text-neutral-600 max-sm:hidden" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[243px] dropdown-content"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={screen}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.1 }}
                    >
                      <MenuContent
                        session={session}
                        setScreen={setScreen}
                        signOut={signOut}
                        screen={screen}
                        initials={initials}
                      />
                    </motion.div>
                  </AnimatePresence>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => OpenAuth("signin")}
                className="size-7 sm:size-10 rounded-full flex justify-center items-center bg-primary cursor-pointer"
              >
                <RiUser3Fill className="size-4 sm:size-6 text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="flex gap-3 mt-4 items-center sm:hidden">
          {showBack && (
            <button
              onClick={handleBack}
              className="gap-4 ml-2.5 text-sm hover:cursor-pointer"
            >
              <RiArrowLeftLine className="size-5" />
            </button>
          )}

          <form
            onSubmit={handleSubmit}
            className="relative flex-1 sm:max-w-[416px]"
          >
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food, restaurants...."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      )}
    </header>
  );
}
