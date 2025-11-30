"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  RiMapPinFill,
  RiWallet3Fill,
  RiArrowDownSLine,
  RiSearchLine,
  RiNotification2Fill,
  RiUser3Fill,
} from "react-icons/ri";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-full px-6 py-2.25 flex items-center justify-between gap-8">
        {/* Location Section */}
        <div className="flex items-center gap-6">
          {/* Location Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="px-3 py-2 hover:bg-gray-100"
              >
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
                <p className="text-sm font-semibold text-gray-900">
                  My Wallet
                </p>
                <RiArrowDownSLine className="size-5 text-gray-600 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>View balance</DropdownMenuItem>
              <DropdownMenuItem>Add funds</DropdownMenuItem>
              <DropdownMenuItem>Transaction history</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Section */}
        <div className="flex flex-1 shrink items-center justify-end gap-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-[416px]">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for food, restaurants...."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
            />
          </div>

          {/* Notification Bell */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <RiNotification2Fill className="size-6 text-gray-300" />
          </Button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {true ?
              
                <Avatar className="w-10 h-10 border-2 border-gray-200">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User profile"
                    />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                : <div className="size-10 rounded-full flex justify-center items-center bg-primary">
                  <RiUser3Fill className="size-6 text-gray-300"/>
                </div>
                  }
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>My Orders</DropdownMenuItem>
              <DropdownMenuItem>Saved Addresses</DropdownMenuItem>
              <DropdownMenuItem>Favorites</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
