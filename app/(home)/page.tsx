"use client";
import Categories from "@/components/home/Categories";
import Selections from "@/components/home/Selections";
import Banners from "@/components/home/Banners";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { useEffect } from "react";
import { useRef } from "react";
import { auth } from "@/lib/services/auth.service";

export default function Homepage() {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Guard to prevent double-firing in React Strict Mode (development only)
    if (hasTracked.current) return;

    hasTracked.current = true;
    auth.markVisitor().catch(() => {});
  }, []);
  
  return (
    <>
      <OrganizationJsonLd />
      <div className="h-full flex flex-col ">
        <Categories />
        <Banners />
        <Selections />
      </div>
    </>
  );
}
