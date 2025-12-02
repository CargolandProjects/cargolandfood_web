import { Header } from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { ReactNode } from "react";

export default function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <CategoryProvider>
      <main className="font-satoshi text-brand-black flex overflow-hidden h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 overflow-auto py-6 px-13.5">
            <div className="max-w-295.5 mx-auto">{children}</div>
          </div>
        </div>
      </main>
    </CategoryProvider>
  );
}
