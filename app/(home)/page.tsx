import Categories from "@/components/home/Categories";
import Selections from "@/components/home/Selections";
import Banners from "@/components/home/Banners";

export default function Homepage() {
  return (
    <div className="h-full flex flex-col ">
      <Categories/>
      <Banners />
      <Selections />
    </div>
  );
}
