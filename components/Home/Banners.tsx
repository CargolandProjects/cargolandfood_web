
import { hamburgers } from "@/assets/images";
import { Button } from "@/components/ui/button";

interface Banner {
  title: string;
  description: string;
  image: string;
  cta: string;
}

const Banners = () => {
  const Banners: Banner[] = [
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
        {Banners.map((Banner, index) => (
          <div
            className="relative flex-1 px-7 py-3 rounded-xl bg-linear-to-br from-primary to-[#FEEFE6] overflow-hidden"
            key={index}
          >
            <div className="max-w-[370.36px] -top-6 overflow-hidden absolute -right-20">
              <img
                src={Banner.image}
                alt={Banner.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="max-w-[171px]  relative">
              <h3 className="font-bold text-xl leading-6 text-white">{Banner.title}</h3>
              <p className="text-xxs font-normal text-white mt-1">{Banner.description}</p>
              <Button className="bg-white text-black px-5 mt-4 rounded-sm hover:text-white">{Banner.cta}</Button>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banners;
