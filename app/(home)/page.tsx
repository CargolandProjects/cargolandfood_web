import Categories from "@/components/Home/Categories";
import Selections from "@/components/Home/Selections";
import Banners from "@/components/Home/Banners";

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
