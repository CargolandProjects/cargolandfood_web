import Categories from "@/components/home/Categories";
import Selections from "@/components/home/Selections";
import Banners from "@/components/home/Banners";

export default function Homepage() {
  return (
    <div className="">
      <Categories/>
      {/* <p className="text-4xl font-bold">This is the Main Homepage</p> */}
      <Banners />
      <Selections />
    </div>
  );
}
