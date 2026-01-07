"use client";

import { usePromotions } from "@/lib/hooks/queries/usePromotions";
import VendorCard from "../VendorCard";
import Loading from "../LoadingSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";

const MarketsSelection = () => {
  const { data, isLoading } = usePromotions();

  if (isLoading) {
    return (
      <section className="my-6 sm:my-10">
        <Loading count={3} title scroll />
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-10">
      <div>
        <h3>Featured</h3>
        <Swiper
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
          className="section-y"
        >
          {data?.featured.map((item) => (
            <SwiperSlide key={item.id}>
              <VendorCard menuItem={item} route="markets" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div>
        <h3 className="mb-6.5 mt-10">Markets</h3>
        <Swiper
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
          className="section-y"
        >
          {data?.discount.map((item) => (
            <SwiperSlide key={item.id}>
              <VendorCard menuItem={item} route="markets" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MarketsSelection;
