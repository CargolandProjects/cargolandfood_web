import { Header } from "@/components/Header";
import Footer from "@/components/home/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { ReactNode } from "react";

export default function HomeLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <CategoryProvider>
      <>
        <main className="font-satoshi text-brand-black flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <div className="flex-1 overflow-auto py-6 px-6 md:px-13.5 min-w-0 hide-scrollbar">
              <div className="w-full max-w-295.5 mx-auto min-w-0">
                {children}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    </CategoryProvider>
  );
}
