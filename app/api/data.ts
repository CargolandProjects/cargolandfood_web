import { choppers, divineSpot, foodCafe, pappiesMaestro, pizzaHut, suyaBistro } from "@/assets/images";
import { food, groceries, restaurant } from "@/assets/svgs";


export const categories = [
  {
    id: "Restaurants",
    name: "Restaurants",
    icon: restaurant,
  },
  {
    id: "Groceries",
    name: "Groceries & More",
    icon: groceries,
  },
  {
    id: "Markets",
    name: "Markets",
    icon: food,

  },
];

export const hotPicks = [
    {
      name: "Food Cafe",
      image: foodCafe.src,
      link: "",
    },
    {
      name: "Suya Bistro",
      image: suyaBistro.src,
      link: "",
    },
    {
      name: "Divine Spot",
      image: divineSpot.src,
      link: "",
    },
    {
      name: "Choppers",
      image: choppers.src,
      link: "",
    },
    {
      name: "Pappies Maestro",
      image: pappiesMaestro.src,
      link: "",
    },
    {
      name: "Pizza Hut",
      image: pizzaHut.src,
      link: "",
    },
  ];
