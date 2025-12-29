"use client";

import { icon, logout } from "@/assets/svgs";
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
import { formatDateWComma } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  RiMapPinFill,
  RiWallet3Fill,
  RiArrowDownSLine,
  RiSearchLine,
  RiNotification2Fill,
  RiUser3Fill,
  RiArrowRightSLine,
} from "react-icons/ri";
import Notifications from "./Notifications";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import MenuContent from "./MenuContent";

export type MenuScreen = "root" | "personalInfo";

export function Header() {
  const [screen, setScreen] = useState<MenuScreen>("root");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const OpenAuth = useAuthFlow((s) => s.openAuth);
  const { user: session, isAuthenticated, signOut } = useSession();

  const [firstName, lastName] = session?.fullName.split(" ") || [];
  const initials =
    (firstName &&
      lastName &&
      `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()) ||
    "";
  // console.log("FirstName:", firstName);
  // console.log("LastName:", lastName);
  // console.log("Initials:", initials);
  // console.log("Data is: ", session);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(` ?search=${search}`);
    setSearch("");
  };

  // session.signOut();
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-full px-6 py-2.25 flex items-center justify-between gap-8">
        {/* Location Section */}
        <div className="flex items-center gap-6">
          {/* Location Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-3 py-2 hover:bg-gray-100">
                <RiMapPinFill className="size-6 text-primary mb-1" />
                <div className="text-left -ml-1">
                  <div className="text-xs font-medium ">Your Location</div>
                  <div className="text-xxs text-gray-600">
                    45 Denkede St, Shomolu...
                  </div>
                </div>
                <RiArrowDownSLine className="size-5 text-gray-600 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>45 Denkede St, Shomolu, Lagos</DropdownMenuItem>
              <DropdownMenuItem>Add new location</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
              >
                <RiWallet3Fill className="size-6  text-blue-400 " />
                <p className="text-xs font-medium text-gray-900">My Wallet</p>
                <RiArrowDownSLine className="size-5 text-gray-600 ml-2" />
              </Button>
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
        <div className="flex flex-1 shrink items-center justify-end gap-6">
          {/* Search Bar */}
          <form
            onSubmit={handleSubmit}
            className="relative flex-1 max-w-[416px]"
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
              <Button variant="ghost" size="icon" className="rounded-full">
                <RiNotification2Fill className="size-6 text-gray-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="dropdown-content w-[271px]"
            >
              <DropdownMenuLabel className="font-bold text-base">
                Notification
              </DropdownMenuLabel>
              <Notifications />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile Dropdown */}
          <DropdownMenu onOpenChange={() => setScreen("root")}>
            <DropdownMenuTrigger asChild>
              {session && isAuthenticated ? (
                <Avatar className="size-10 border-2 cursor-pointer">
                  <AvatarImage
                    src={session?.avatarUrl}
                    alt={session?.fullName}
                  />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ) : (
                <div className="size-10 rounded-full flex justify-center items-center bg-primary cursor-pointer">
                  <RiUser3Fill className="size-6 text-white" />
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[243px] dropdown-content"
            >
              {isAuthenticated ? (
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
              ) : (
                <DropdownMenuItem className="text-red-600">
                  <Button onClick={() => OpenAuth("signin")}>signin</Button>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
