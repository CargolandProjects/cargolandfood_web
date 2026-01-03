import {
  RiArrowGoBackLine,
  RiArrowRightSLine,
  RiCoupon2Fill,
  RiEBike2Fill,
  RiLockFill,
  RiMap2Fill,
  RiPhoneFill,
  RiUserShared2Fill,
  RiWallet3Fill,
  RiWechatFill,
} from "react-icons/ri";
import { Button } from "../ui/button";
import { useCallback, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import ChatSupport from "../ChatSupport";
import { ActiveTab } from "./Sidebar";

interface SettingsProps {
  setActiveTab: (tab: ActiveTab) => void;
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

const SettingsMenu = ({ setActiveTab }: SettingsProps) => {
  const [showChatSupport, setShowChatSupport] = useState(false);
  const router = useRouter();

  const menuActions: { [key: string]: () => void } = useMemo(() => {
    return {
      Settings: () => {},
      Addresses: () => {},
      Security: () => {},
      Coupon: () => {},
      "My Wallet": () => {
        router.push("/wallet");
      },
      "Refer & Earn": () => {},
      "Join as a Delivery Man": () => {},
      "Live Chat": () => setShowChatSupport(true),
      "Help & Support": () => {},
    };
  }, [router]);

  // const handleClose = (v: boolean) => {
  //   setOpenMenu(v);
  //   handleTabChange("Settings");
  // };

  return (
    <>
      <div>
        {/* Header */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => setActiveTab(null)}
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
                    <RiArrowRightSLine className="size-6 text-neutral-600" />
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ChatSupport
        open={showChatSupport}
        onOpenChange={useCallback((o: boolean) => {
          setShowChatSupport(o);
        }, [])}
      />
    </>
  );
};

export default SettingsMenu;
