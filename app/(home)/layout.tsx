"use client"

import { Header } from "@/components/Header";
import Footer from "@/components/home/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import ContextProviders from "@/contexts/ContextProviders";
import { ReactNode, useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [open, setOpen] = useState(false);
  return (
    <ContextProviders>
      <main className="font-satoshi text-brand-black flex h-screen overflow-hidden">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header setSideBar={setOpen} />
          <div className="flex-1 overflow-auto py-4 md:py-6 px-6 md:px-13.5 min-w-0 hide-scrollbar">
            <div className="w-full max-w-295.5 mx-auto min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </ContextProviders>
  );
}
