
import { hamburgers } from "@/assets/images";
import { Button } from "@/components/ui/button";

interface Promotions {
  title: string;
  description: string;
  image: string;
  cta: string;
}

const Promotions = () => {
  const promotions: Promotions[] = [
    {
      title: "Special offer for August",
      description: "We are here with the best burgers in town",
      image: hamburgers.src,
      cta: "Buy Now",
    },
    {
      title: "Special offer for August",
      description: "We are here with the best burgers in town",
      image: hamburgers.src,
      cta: "Buy Now",
    },
  ];
  return (
    <section className="my-10">
      <div className="flex gap-6">
        {promotions.map((promotion, index) => (
          <div
            className="relative flex-1 px-7 py-3 rounded-xl bg-linear-to-br from-primary to-[#FEEFE6] overflow-hidden"
            key={index}
          >
            <div className="max-w-[370.36px] -top-6 overflow-hidden absolute -right-20">
              <img
                src={promotion.image}
                alt={promotion.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-[171px]  relative">
              <h3 className="font-bold text-xl leading-6 text-white">{promotion.title}</h3>
              <p className="text-xxs font-normal text-white mt-1">{promotion.description}</p>
              <Button className="bg-white text-black px-5 mt-4">{promotion.cta}</Button>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
