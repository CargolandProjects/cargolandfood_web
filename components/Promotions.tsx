"use client";

import VendorCard from "./VendorCard";
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

import Loading from "./LoadingSkeleton";

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
      <div>
        <div className="mt-6 sm:my-10">
          <Loading count={3} title scroll />
        </div>
        <div className="my-4 sm:my-10">
          <Loading count={3} title scroll/>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!isLoading && data?.discount.length && (
        <>
          <section className="mt-6 sm:my-10">
            <div className="flex justify-between">
              <h3>Discounts</h3>
              <div className="flex gap-4 max-sm:hidden">
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
              <p className="sm:hidden text-primary hover:underline active:underline underline-offset-2 hover:cursor-pointer">
                See all
              </p>
            </div>
            <div className="w-full mt-2 sm:mt-6.5 ">
              <Swiper
                onBeforeInit={(swiper) => {
                  discountsSwiperRef.current = swiper;
                }}
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1.3}
                loop={true}
                speed={600}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                // className="!overflow-visible"
              >
                {data?.discount.map((discount) => (
                  <SwiperSlide key={discount.id}>
                    <VendorCard menuItem={discount} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          <section className="my-4 sm:my-10">
            <div className="flex justify-between">
              <h3>Featured</h3>
              <div className="flex gap-4 max-sm:hidden">
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
              <p className="sm:hidden text-primary hover:underline active:underline underline-offset-2 hover:cursor-pointer">
                See all
              </p>
            </div>

            <div className="w-full mt-2 sm:mt-6.5">
              <Swiper
                onBeforeInit={(swiper) => {
                  featureSwiperRef.current = swiper;
                }}
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1.3}
                loop={true}
                speed={600}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                // className="!overflow-visible"
              >
                {data?.featured.map((feature) => (
                  <SwiperSlide key={feature.id}>
                    <VendorCard menuItem={feature} />
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
