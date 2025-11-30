import {
  foodCafe,
  choppers,
  divineSpot,
  pappiesMaestro,
  pizzaHut,
  suyaBistro,
} from "@/assets/images";

interface HotPicksProps {
  name: string;
  image: string;
  link: string;
}
const HotPicks = () => {
  const hotPicks: HotPicksProps[] = [
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
  return (
    <section className="my-10">
      <h3>Hot Picks</h3>
      <div className="flex gap-6 mt-2">
        {hotPicks.map((item, index) => (
          <div className="flex justify-center flex-col items-center" key={index}>
            <div className="size-31 rounded-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="size-full object-cover"
              />
            </div>
            <p className="mt-0.5 text-sm font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotPicks;
