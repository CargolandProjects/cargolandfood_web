"use client";

import { useCategory } from "@/contexts/CategoryContext";
import RestaurantsSelection from "./RestaurantsSelection";
import GroceriesSelection from "./GroceriesSelection";
import MarketsSelection from "./MarketsSelection";
import HotPicks from "./HotPicks";
import Promotions from "../Promotions";

const Selections = () => {
  const { activeCategory } = useCategory();
  return (
    <>
      {!activeCategory && (
        <div className="">
          <HotPicks />
          <Promotions />
        </div>
      )}

      <section className="mt-1">
        {activeCategory === "Restaurants" && <RestaurantsSelection />}
        {activeCategory === "Groceries" && <GroceriesSelection />}
        {activeCategory === "Markets" && <MarketsSelection />}
      </section>
    </>
  );
};

export default Selections;
