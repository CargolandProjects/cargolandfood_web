"use client";

import { Header } from "@/components/Header";
import Footer from "@/components/home/Footer";
import GlobalCheckout from "@/components/orders/GlobalCheckout";
import Sidebar from "@/components/sidebar/Sidebar";
import ContextProviders from "@/contexts/ContextProviders";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const matchRoutes = (routes: string[], path: string) =>
    routes.some((route) => path === route || path.startsWith(route + "/"));

  const SEARCH_ROUTES = ["/", "/restaurants", "/groceries", "/markets"];

  const applyPadding = matchRoutes(SEARCH_ROUTES, path);

  return (
    <ContextProviders>
      <main className="font-satoshi text-brand-black flex h-screen overflow-hidden">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header setSideBar={setOpen} />
          <div
            className={`${
              applyPadding && "max-sm:pt-3"
            } flex-1 overflow-auto py-4 md:py-6 px-4 sm:px-6 md:px-13.5 min-w-0 hide-scrollbar`}
          >
            <div className="w-full mx-auto min-w-0">
              {children}
            </div>
          </div>
          
          {/* Globally Triggered UI Components - Outside scroll area */}
          <GlobalCheckout />
        </div>
      </main>
      <Footer />
    </ContextProviders>
  );
}
