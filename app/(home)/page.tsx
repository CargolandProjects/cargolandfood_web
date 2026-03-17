import Categories from "@/components/home/Categories";
import Selections from "@/components/home/Selections";
import Banners from "@/components/home/Banners";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";

export default function Homepage() {
  return (
    <>
      <OrganizationJsonLd />
      <div className="h-full flex flex-col ">
        <Categories/>
        <Banners />
        <Selections />
      </div>
    </>
  );
}
