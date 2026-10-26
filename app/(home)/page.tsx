"use client";
import Categories from "@/components/home/Categories";
import Selections from "@/components/home/Selections";
import Banners from "@/components/home/Banners";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { useEffect } from "react";
import { useRef } from "react";
import { auth } from "@/lib/services/auth.service";
// import { RiSearchLine } from "react-icons/ri";
// import { useRouter } from "next/navigation";

export default function Homepage() {
  // const [search, setSearch] = useState("");
  const hasTracked = useRef(false);
  // const router = useRouter();

  useEffect(() => {
    // Guard to prevent double-firing in React Strict Mode (development only)
    if (hasTracked.current) return;

    hasTracked.current = true;
    auth.markVisitor().catch(() => {});
  }, []);

  // const handleSearch = (e: ChangeEvent) => {
  //   e.preventDefault();
  //   if (!search.trim()) return;

  //   router.push(`/?search=${search}`);
  //   setSearch("");
  // };

  return (
    <>
      <OrganizationJsonLd />
      <div className="h-full flex flex-col ">
        {/* Search Bar */}
        {/* <form
          onSubmit={handleSearch}
          className="sm:hidden relative w-full"
        >
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for food, restaurants...."
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-primary duration-100 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form> */}

        <Categories />
        <Banners />
        <Selections />
      </div>
    </>
  );
}
