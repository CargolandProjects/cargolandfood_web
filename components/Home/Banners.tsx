"use client";

import { hamburgers } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Banner {
  title: string;
  description: string;
  image: string;
  cta: string;
}

const banners: Banner[] = [
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
const Banners = () => {
  return (
    <section className="my-4 sm:my-10">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
        speed={600}
        loop={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            loop: false,
          },
        }}
        // className="flex gap-6"
      >
        {banners.map((Banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex-1 px-7 py-3 rounded-sm sm:rounded-xl bg-linear-to-br from-primary to-[#FEEFE6] overflow-hidden">
              <div className="max-w-[370.36px] -top-6 overflow-hidden absolute -right-20">
                <img
                  src={Banner.image}
                  alt={Banner.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="max-w-[171px] relative">
                <h3 className="font-bold text-base sm:text-xl leading-5 sm:leading-6 text-white">
                  {Banner.title}
                </h3>
                <p className="text-xxs font-normal text-white mt-1">
                  {Banner.description}
                </p>
                <Button className="bg-white max-sm:text-xxs text-brand-black max-sm:h-5 max-sm:w-20 px-5 mt-1 sm:mt-4 rounded-[3px] sm:rounded-sm  hover:text-white">
                  {Banner.cta}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banners;
