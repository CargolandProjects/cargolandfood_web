"use client";

import { Header } from "@/components/Header";
import Footer from "@/components/home/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import ContextProviders from "@/contexts/ContextProviders";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import GlobalUI from "@/components/globalUi/GlobalUI";

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
      <main className="font-satoshi text-brand-black flex min-h-dvh">
        <Sidebar open={open} setOpen={setOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <Header setSideBar={setOpen} />
          <div
            className={`${
              applyPadding && "max-sm:pt-3"
            } flex-1 py-4 md:py-6 px-4 sm:px-6 md:px-13.5 min-w-0`}
          >
            <div className="w-full mx-auto min-w-0 h-full max-w-[1400px]">{children}</div>
          </div>

          <GlobalUI />
        </div>
      </main>
      <Footer />
    </ContextProviders>
  );
}
