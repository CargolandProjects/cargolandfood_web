"use client";

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
import { usePromotions } from "@/lib/hooks/queries/usePromotions";

import Loading from "./Loading";

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

  const { data, isLoading } = usePromotions();

  if (isLoading) {
    return (
      <div className="space-y-10">
        <Loading count={3} title />
        <Loading count={3} title />
      </div>
    );
  }

  return (
    <div>
      {!isLoading && data?.discount.length && (
        <>
          <section className=" my-10">
            <div className="flex justify-between">
              <h3 className="mb-6.5">Discounts</h3>
              <div className="flex gap-4">
                <Button
                  onClick={goToPreviousDiscounts}
                  className="size-10 rounded-full bg-white hover:bg-white shadow-cargo-sm"
                >
                  <RiArrowLeftLine className="text-black" />
                </Button>
                <Button
                  onClick={goToNextDiscounts}
                  className="size-10 rounded-full bg-white hover:bg-white shadow-cargo-sm"
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
                speed={600}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                }}
                // className="!overflow-visible"
              >
                {data?.discount.map((discount) => (
                  <SwiperSlide key={discount.id}>
                    <MenuItemCard menuItem={discount} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          <section className="my-10">
            <div className="flex justify-between">
              <h3 className="mb-6.5">Featured</h3>
              <div className="flex gap-4">
                <Button
                  onClick={goToPreviousFeature}
                  className="size-10 rounded-full bg-white hover:bg-white shadow-cargo-sm"
                >
                  <RiArrowLeftLine className="text-black" />
                </Button>
                <Button
                  onClick={goToNextFeature}
                  className="size-10 rounded-full bg-white hover:bg-white shadow-cargo-sm"
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
                speed={600}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                  },
                }}
                // className="!overflow-visible"
              >
                {data?.featured.map((feature) => (
                  <SwiperSlide key={feature.id}>
                    <MenuItemCard menuItem={feature} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Promotions;
