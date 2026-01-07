import { formatDistanceToNow } from "date-fns";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { hamburger, medal, meter } from "@/assets/svgs";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  type: string;
  isRead: boolean;
}

const Notifications = () => {
  const notifications: Notification[] = [
    {
      id: "rate-order",
      title: "Rate your order",
      message:
        "How was the food? Let us know by rating your recent order and sharing your feedback.",
      time: "2025-08-18T09:15:30Z",
      icon: meter.src,
      type: "feedback",
      isRead: false,
    },
    {
      id: "new-restaurants",
      title: "Hungry? Try out new restaurants",
      message:
        "Check our latest restaurant addition and satisfy your cravings!",
      time: "2024-12-25T14:30:00+02:00",
      icon: hamburger.src,
      type: "promotion",
      isRead: false,
    },
    {
      id: "special-offer",
      title: "Don't miss out: Special offer just for you!",
      message:
        "Get 10% off your next order with code DRKEYZ. Limited time only!",
      time: "2026-11-20T17:20:45Z",
      icon: medal.src,
      type: "promotion",
      isRead: false,
    },
  ];

  const timeAgo = (date: Date | string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };
  
  return (
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
              src={notification.icon}
              alt={notification.id}
              className="size-4.5"
            />
          </div>
          <div className="max-w-[191px]">
            <p className="text-base font-medium">{notification.title}</p>
            <p className="text-xs text-gray-500 leading-4">
              {notification.message}
            </p>
            <p>{timeAgo(notification.time)}</p>
          </div>
        </DropdownMenuItem>
      ))}
    </div>
  );
};

export default Notifications;
