import { ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  RiArrowGoBackLine,
  RiCoupon2Fill,
  RiEBike2Fill,
  RiLockFill,
  RiMap2Fill,
  RiPhoneFill,
  RiSettings3Fill,
  RiUserShared2Fill,
  RiWallet3Fill,
  RiWechatFill,
} from "react-icons/ri";
import { Button } from "../ui/button";
import { ActiveTab } from "./Sidebar";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";

interface SettingsProps {
  activeTab: string;
  handleTabChange: (tab: ActiveTab) => void;
}

const SETTINGS_SECTIONS = [
  {
    title: "General",
    items: [
      { label: "Addresses", icon: RiMap2Fill, color: "text-cargo-info" },
      { label: "Security", icon: RiLockFill, color: "text-cargo-cyan" },
    ],
  },
  {
    title: "Promotional Activity",
    items: [
      { label: "Coupon", icon: RiCoupon2Fill, color: "text-primary" },
      { label: "My Wallet", icon: RiWallet3Fill, color: "text-cargo-cyan" },
    ],
  },
  {
    title: "Earnings",
    items: [
      { label: "Refer & Earn", icon: RiUserShared2Fill, color: "text-primary" },
      {
        label: "Join as a Delivery Man",
        icon: RiEBike2Fill,
        color: "text-cargo-info",
      },
    ],
  },
  {
    title: "Help & Support",
    items: [
      { label: "Live Chat", icon: RiWechatFill, color: "text-primary" },
      { label: "Help & Support", icon: RiPhoneFill, color: "text-cargo-info" },
    ],
  },
];

const SettingsMenu = ({ activeTab, handleTabChange }: SettingsProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  const menuActions: { [key: string]: () => void } = {
    Settings: () => {},
    Addresses: () => {},
    Security: () => {},
    Coupon: () => {},
    "My Wallet": () => router.push("/wallet"),
    "Refer & Earn": () => {},
    "Join as a Delivery Man": () => {},
    "Live Chat": () => {},
    "Help & Support": () => {},
  };

  return (
    <Popover open={openMenu} onOpenChange={() => setOpenMenu((prev) => !prev)}>
      <PopoverTrigger>
        <Button
          variant="ghost"
          onClick={() => handleTabChange("Settings")}
          className={`relative size-6 rounded-sm transition-colors mt-auto ${
            activeTab === "Settings" && "bg-gray-100"
          }`}
          aria-label="Settings"
        >
          <RiSettings3Fill
            className={`"w-5 h-5 transition-colors", ${
              activeTab === "Settings" ? "text-primary" : "text-gray-300"
            }`}
          />
          {activeTab === "Settings" && (
            <span className="absolute left-12 top-1/2 -translate-y-1/2 z-30 text-white py-1 px-3 bg-primary rounded-xl text-xs whitespace-nowrap pointer-events-none">
              Settings
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="right"
        sideOffset={8}
        className="w-[374px] rounded-xl max-h-[95vh] overflow-auto hide-scrollbar px-4 shadow"
      >
        {/* Header */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => setOpenMenu(false)}
            className="absolute left-0"
          >
            <RiArrowGoBackLine className="size-5" />
          </button>
          <h2 className="text-lg leading-6">Settings</h2>
        </div>

        {/* Content */}
        <div className="space-y-4 mt-4">
          {SETTINGS_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-base leading-6">{section.title}</h2>
              <Separator className="mt-2! mb-4!" />

              <div className="space-y-4">
                {section.items.map((item) => (
                  <Button
                    onClick={() => menuActions[item.label]()}
                    variant="ghost"
                    key={item.label}
                    className="flex items-center justify-between w-full p-0!"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`size-6.5 ${item.color}`} />

                      <span className="text-[16px] font-normal text-[#0A0D14] leading-tight">
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight
                      className="w-5 h-5 text-[#525866]"
                      strokeWidth={1.5}
                    />
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SettingsMenu;
