import Categories from "@/components/Home/Categories";
import HotPicks from "@/components/Home/HotPicks";
import Promotions from "@/components/Home/Promotions";
import Selections from "@/components/Home/Selections";

export default function Homepage() {
  return (
    <div className="">
      <Categories/>
      {/* <p className="text-4xl font-bold">This is the Main Homepage</p> */}
      <Promotions />
      <HotPicks />
      <Selections />
    </div>
  );
}
