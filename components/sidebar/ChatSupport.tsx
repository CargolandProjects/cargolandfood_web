"use client";

import { Plus, Send } from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { pizza2 } from "@/assets/images";
import { useSession } from "@/lib/hooks/useSession";
import { memo, useState } from "react";
import { Input } from "../ui/input";
import { Ri24HoursFill, RiAddFill, RiSendPlane2Fill } from "react-icons/ri";
import { ScrollArea } from "../ui/scroll-area";

interface ChatSupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Chat {
  id: string;
  type: "text" | "image" | "audio" | "video" | "file";
  message: string;
  senderId: string;
  createdAt: string;
}

const chats: Chat[] = [
  {
    id: "1",
    type: "text",
    message:
      "I have ordered for a pepperoni cheese pizza but I have received a different. There must have been a mistake somewhere. Please replace it.",
    senderId: "d9e3a066-c738-4364-81af-33796e147d8e",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "text",
    message:
      "We are very sorry to hear that. We will immediately resend the delivery guy for replacement. But first, please send a picture of the pizza for confirmation.",
    senderId: "2424",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "image",
    message: pizza2.src,
    senderId: "d9e3a066-c738-4364-81af-33796e147d8e",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    type: "text",
    message:
      "Here’s a picture for confirmation. Now’s please replace it. Thank you.",
    senderId: "d9e3a066-c738-4364-81af-33796e147d8e",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    type: "text",
    message:
      "I have ordered for a pepperoni cheese pizza but I have received a different. There must have been a mistake somewhere. Please replace it.",
    senderId: "d9e3a066-c738-4364-81af-33796e147d8e",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    type: "text",
    message:
      "We are very sorry to hear that. We will immediately resend the delivery guy for replacement. But first, please send a picture of the pizza for confirmation.",
    senderId: "2424",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    type: "image",
    message: pizza2.src,
    senderId: "d9e3a066-c738-4364-81af-33796e147d8e",
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    type: "text",
    message:
      "Here’s a picture for confirmation. Now’s please replace it. Thank you.",
    senderId: "d9e3a066-c738-4364-81af-33796e147d8e",
    createdAt: new Date().toISOString(),
  },
];

const ChatSupport = ({ open, onOpenChange }: ChatSupportModalProps) => {
  const [message, setMessage] = useState("");
  const { user: session } = useSession();
  // console.log("User's Id:", session?.id);
  const isTyping = true;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog pb-4.5! p-0!">
        <DialogHeader className="mt-[70px]">
          <DialogTitle className="dialog-title font-bold!">
            Customer Support
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="mt-6 h-[95vh] px-[28.5px]">
          {/* Messages Area */}
          <div className="flex flex-col gap-4 mb-37.5">
            {chats.map((chat) => {
              const userChat = chat.senderId === session?.id;
              return (
                <div
                  key={chat.id}
                  className={`${userChat ? "self-end" : "self-start"} `}
                >
                  {/* User Message */}
                  {chat.type === "text" && (
                    <div
                      className={`${
                        userChat ? "rounded-br-none" : "rounded-bl-none"
                      } bg-neutral-100 rounded-2xl  px-4 py-3 max-w-[280px]`}
                    >
                      <p className="text-base leading-5 text-neutral-600">
                        {chat.message}
                      </p>
                    </div>
                  )}

                  {/* Image Message */}
                  {chat.type === "image" && (
                    <div className="w-[136px] h-[136px] relative rounded-2xl rounded-br-none overflow-hidden border-2 border-neutral-100">
                      <img
                        src={chat.message}
                        alt={chat.type}
                        className="size-full object-cover"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-neutral-700 rounded-2xl rounded-bl-none px-4 w-16 h-12.5 flex items-center gap-1">
                  <span className="size-2 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="size-2 bg-neutral-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="size-2 bg-neutral-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
          </div>

          {/* Footer / Input */}
          <footer className="pt-7.5 sticky bottom-38">
            <div className="flex items-end gap-1">
              <div className="flex-1 flex items-center bg-white border border-neutral-300 rounded-lg px-4 py-3 h-12">
                <RiAddFill className="text-6 text-neutral-400 mr-3 cursor-pointer" />
                <Input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type here..."
                  className="flex-1 text-6 leading-5 text-neutral-600 border-none focus-visible:ring-0 placeholder:text-neutral-500 outline-none"
                />
              </div>
              <button className="size-12 bg-primary rounded-lg flex items-center justify-center text-white hover:bg-[#d95304] transition-colors">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.044 8.99207C8.039 8.88807 7.973 8.78707 7.846 8.76007L0.396 7.18107C0.165 7.13207 0 6.92807 0 6.69207V0.980074C0 0.250074 0.698 -0.178926 1.419 0.0720743C5.714 1.56907 13.5 5.48007 17.035 8.09707C17.375 8.34907 17.55 8.67007 17.555 8.99207C17.55 9.31507 17.375 9.63607 17.035 9.88807C13.5 12.5051 5.714 16.7561 1.419 18.2531C0.698 18.5041 0 18.0751 0 17.3451V11.2931C0 11.0571 0.165 10.8531 0.396 10.8041L7.846 9.22507C7.973 9.19807 8.039 9.09607 8.044 8.99207Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </footer>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};


export default memo(ChatSupport)