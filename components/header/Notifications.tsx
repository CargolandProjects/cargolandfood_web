import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { bell } from "@/assets/svgs";
import {  RiEBike2Line, RiNotification2Fill } from "react-icons/ri";
import { formatDistanceToNow } from "date-fns";
import { hamburger, medal, meter } from "@/assets/svgs";
import { useNotificationEvent } from "@/lib/hooks/useSocket";
import { NotificationEvent } from "@/lib/socket/socketEvents";

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationEvent[]>([]);

  // Listen for new notifications from socket
  useNotificationEvent((notification) => {
    setNotifications((prev) => [notification, ...prev]); // Prepend new notification
  });

  // Map notification type to icon
  const getIcon = (type: NotificationEvent["type"]) => {
    switch (type) {
      case "NEW":
      case "ACCEPTED":
      case "PREPARING":
      case "READY":
        return hamburger.src;
      case "DELIVERED":
      case "ASSIGN_TO_RIDER":
        return <RiEBike2Line className="text-primary size-6" />;
      default:
        return hamburger.src;
    }
  };

  const timeAgo = (date: Date | string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
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

      <DropdownMenuContent align="end" className="dropdown-content w-[271px]">
        <DropdownMenuLabel className="font-bold text-base flex gap-4.5 p-0 mb-6">
          {/* <RiArrowGoBackLine className="size-5" /> */}
          Notification
        </DropdownMenuLabel>

        <div className="flex flex-col gap-6">
          {notifications.map((notification, i, a) => (
            <DropdownMenuItem
              className={`p-0 ${
                i === a.length - 1 ? "pb-[35px]" : ""
              } flex gap-2 items-start`}
              key={notification.id}
            >
              <div className="size-10 shrink-0 bg-primary-50 flex justify-center items-center rounded-full">
                <img
                  src={getIcon(notification.type)}
                  alt={notification.id}
                  className="size-4.5"
                />
              </div>
              <div className="max-w-[191px]">
                <p className="text-base font-medium">{notification.title}</p>
                <p className="text-xs text-gray-500 leading-4">
                  {notification.message}
                </p>
                <p>{timeAgo(notification.createdAt)}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
