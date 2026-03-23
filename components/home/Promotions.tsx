"use client";

import VendorCard from "../vendor/VendorCard";
import { Button } from "../ui/button";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import Loading from "../vendor/LoadingSkeleton";
import { useDiscountVendors } from "@/lib/hooks/queries/useVendors";
import { useActiveZone } from "@/lib/hooks/useActiveZone";

const Promotions = () => {
  const { zoneId } = useActiveZone();
  const { data, isLoading, isSuccess } = useDiscountVendors(zoneId ?? "");

  // Simple Swiper refs for both sections
  const discountsSwiperRef = useRef<SwiperType>(null);
  // const featureSwiperRef = useRef<SwiperType>(null);

  // Simple navigation functions for Discounts
  const goToPreviousDiscounts = () => discountsSwiperRef.current?.slidePrev();
  const goToNextDiscounts = () => discountsSwiperRef.current?.slideNext();

  // Simple navigation functions for Feature
  // const goToPreviousFeature = () => featureSwiperRef.current?.slidePrev();
  // const goToNextFeature = () => featureSwiperRef.current?.slideNext();
  if (isLoading) {
    return (
      <div>
        <div className="mt-6 sm:my-10">
          <Loading count={3} title scroll />
        </div>
        {/* <div className="my-4 sm:my-10">
          <Loading count={3} title scroll />
        </div> */}
      </div>
    );
  }

  return (
    <div>
      {isSuccess && data.length && (
        <>
          {/* Discounts Section */}
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
            <div className="w-full section-y ">
              <Swiper
                onBeforeInit={(swiper) => {
                  discountsSwiperRef.current = swiper;
                }}
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1.3}
                loop={data.length > 3}
                speed={600}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    // spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 48,
                  },
                }}
              >
                {data?.map((discount) => (
                  <SwiperSlide key={discount.vendor.id}>
                    <VendorCard
                      vendorId={discount.vendor.id}
                      vendor={discount.vendor}
                      aggregateDiscount={discount.aggregateDiscount}
                      source="homepage_discounts"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>

          {/* Featured Section */}
          {/* <section className="my-4 sm:my-10">
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

            <div className="w-full section-y">
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
          </section> */}
        </>
      )}
    </div>
  );
};

export default Promotions;
