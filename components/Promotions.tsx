"use client";
import { sharwarma } from "@/assets/images";
import { StaticImageData } from "next/image";
import MenuItemCard from "./MenuItemCard";
import { Button } from "./ui/button";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export interface MenuItem {
  id: number;
  title: string;
  image: StaticImageData;
  rating: number;
  deliveryFee: number;
  deliveryTime: string;
  discount: number;
}

const Promotions = () => {
  // Simple Swiper refs for both sections
  const discountsSwiperRef = useRef<SwiperType>(null);
  const featureSwiperRef = useRef<SwiperType>(null);

  // Simple navigation functions for Discounts
  const goToPreviousDiscounts = () => discountsSwiperRef.current?.slidePrev();
  const goToNextDiscounts = () => discountsSwiperRef.current?.slideNext();

  // Simple navigation functions for Feature
  const goToPreviousFeature = () => featureSwiperRef.current?.slidePrev();
  const goToNextFeature = () => featureSwiperRef.current?.slideNext();

  const discounts: MenuItem[] = [
    {
      id: 1,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 200,
      deliveryTime: "20 min",
      discount: 40,
    },
    {
      id: 2,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 0,
      deliveryTime: "20 min",
      discount: 40,
    },
    {
      id: 3,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 200,
      deliveryTime: "20 min",
      discount: 40,
    },
    {
      id: 4,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 0,
      deliveryTime: "20 min",
      discount: 40,
    },
    {
      id: 5,
      title: "Sharwarma Plus+",
      image: sharwarma,
      rating: 4.7,
      deliveryFee: 200,
      deliveryTime: "20 min",
      discount: 40,
    },
  ];

  return (
    <div>
      <section className=" my-10">
        <div className="flex justify-between">
          <h3 className="mb-6.5">Discounts</h3>
          <div className="flex gap-4">
            <Button
              onClick={goToPreviousDiscounts}
              className="size-10 rounded-full bg-white hover:bg-white shadow-button"
            >
              <RiArrowLeftLine className="text-black" />
            </Button>
            <Button
              onClick={goToNextDiscounts}
              className="size-10 rounded-full bg-white hover:bg-white shadow-button"
            >
              <RiArrowRightLine className="text-black" />
            </Button>
          </div>
        </div>
        <div className="w-full ">
          <Swiper
            onBeforeInit={(swiper) => {
              discountsSwiperRef.current = swiper;
            }}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={2}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            // className="!overflow-visible"
          >
            {discounts.map((discount) => (
              <SwiperSlide key={discount.id}>
                <MenuItemCard menuItem={discount} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="my-10">
        <div className="flex justify-between">
          <h3 className="mb-6.5">Feature</h3>
          <div className="flex gap-4">
            <Button
              onClick={goToPreviousFeature}
              className="size-10 rounded-full bg-white hover:bg-white shadow-button"
            >
              <RiArrowLeftLine className="text-black" />
            </Button>
            <Button
              onClick={goToNextFeature}
              className="size-10 rounded-full bg-white hover:bg-white shadow-button"
            >
              <RiArrowRightLine className="text-black" />
            </Button>
          </div>
        </div>

        <div className="w-full">
          <Swiper
            onBeforeInit={(swiper) => {
              featureSwiperRef.current = swiper;
            }}
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={2}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
            }}
            // className="!overflow-visible"
          >
            {discounts.map((discount) => (
              <SwiperSlide key={discount.id}>
                <MenuItemCard menuItem={discount} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Promotions;
