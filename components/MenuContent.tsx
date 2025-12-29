import { logout, icon } from "@/assets/svgs";
import { formatDateWComma } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  RiArrowRightSLine,
  RiPencilFill,
  RiMailFill,
  RiPhoneFill,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import BackButton from "./BackButton";
import { User } from "@/lib/services/auth.service";
import { MenuScreen } from "./Header";
import { useState } from "react";
import EditProfile from "./profile/EditProfile";
import DeleteProfile from "./profile/DeleteProfile";
import ConfirmationModal from "./ConfirmationModal";

interface MenuContentProps {
  screen: string;
  session: User | null;
  initials: string;
  setScreen: (screen: MenuScreen) => void;
  signOut: () => void;
}

const MenuContent = ({
  screen,
  setScreen,
  session,
  initials,
  signOut,
}: MenuContentProps) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const content = () => {
    switch (screen) {
      case "root":
        return (
          <>
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setScreen("personalInfo");
              }}
              className="flex space-between"
            >
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-2.5">
                  <Avatar className="size-12.5 border-2 border-gray-200">
                    <AvatarImage
                      src={session?.avatarUrl}
                      alt={session?.fullName}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center">
                    <p className="font-medium text-base">{session?.fullName}</p>
                    <p className="">{formatDateWComma(new Date())}</p>
                  </div>
                </div>
                <RiArrowRightSLine className="size-6" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 text-base font-medium"
              onClick={(e) => {
                e.preventDefault();
                setShowAlert(true);
              }}
            >
              <div className="size-5">
                <img
                  src={logout.src}
                  alt="logout-button-icon"
                  className="size-full object-contain"
                />
              </div>
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        );

      case "personalInfo":
        return (
          <>
            <DropdownMenuLabel>
              <BackButton
                changeTarget={setScreen}
                title="Personal Info"
                target="root"
              />
            </DropdownMenuLabel>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setShowEdit(true);
              }}
              className="cursor-pointer"
            >
              <div className="flex w-full justify-between items-center">
                <div className="flex gap-2.5">
                  <Avatar className="size-12.5 border-2 border-gray-200">
                    <AvatarImage
                      src={session?.avatarUrl}
                      alt={session?.fullName}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col justify-center gap-0.5">
                    <p className="font-medium text-base leading-6">
                      {session?.fullName}
                    </p>
                    <p className="leading-4">{formatDateWComma(new Date())}</p>
                  </div>
                </div>

                <RiPencilFill className="size-5" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex gap-0.5  items-center">
                <div className="size-10 rounded-full flex justify-center items-center">
                  <img
                    src={icon.src}
                    alt="logout-button-icon"
                    className="size-4.5 md:size-6 object-contain"
                  />
                </div>
                <div className="">
                  <p className="font-medium">Full Name</p>
                  <p className="text-gray-500">{session?.fullName}</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-0.5 items-center">
              <div className="size-10 rounded-full flex justify-center items-center">
                <RiMailFill className="size-4.5 md:size-6 text-cargo-info" />
              </div>
              <div className="">
                <p className="font-medium">Email</p>
                <p className="text-gray-500">{session?.email}</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex gap-0.5  items-center ">
              <div className="size-10 rounded-full flex justify-center items-center">
                <RiPhoneFill className="size-4 md:size-6 text-cargo-cyan" />
              </div>
              <div className="">
                <p className="font-medium">Phone Number</p>
                <p className="text-gray-500">{session?.phoneNumber}</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setShowDelete(true);
              }}
              className="flex gap-0.5 justify-between items-center "
            >
              <div className="flex items-center">
                <div className="size-10 rounded-full flex justify-center items-center">
                  <div className="size-6 rounded-full flex justify-center items-center bg-white">
                    <RiDeleteBin6Fill className="size-3 text-cargo-error" />
                  </div>
                </div>
                <p className="text-cargo-error">Delete Accoint</p>
              </div>
              <RiArrowRightSLine className="size-6" />
            </DropdownMenuItem>
          </>
        );
    }
  };

  return (
    <>
      <EditProfile
        initials={initials}
        session={session}
        open={showEdit}
        onOpenChange={setShowEdit}
      />
      <DeleteProfile
        open={showDelete}
        onOpenChange={setShowDelete}
        session={session}
      />
      <ConfirmationModal
        open={showAlert}
        onOpenChange={setShowAlert}
        onConfirm={signOut}
        title="Are you sure?"
        description="Are you sure, you want to log out from this account?"
        cancelText="No, Cancel"
        confirmText="Log Out"
      />
      {content()}
    </>
  );
};

export default MenuContent;
