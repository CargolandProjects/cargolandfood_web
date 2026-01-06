"use client";

import { useState } from "react";
import { usePromotions } from "@/lib/hooks/queries/usePromotions";
import FilterBar from "../FilterBar";
import VendorCard from "../VendorCard";
import Loading from "../LoadingSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";

const GroceriesSelection = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { data, isLoading } = usePromotions();

  const filters = [
    { label: "All Shops", value: "all" },
    { label: "Drinks", value: "drinks" },
    { label: "Supermarkets", value: "supermarkets" },
    { label: "Depots", value: "depots" },
  ];

  if (isLoading) {
    return (
      <section className="my-6 sm:my-10">
        <Loading count={3} title scroll />
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-10">
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-6 section-y"></div> */}
      {activeFilter === "all" && (
        <div className="space-y-4 sm:space-y-10 mt-4 sm:mt-10">
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
                  <VendorCard menuItem={item} route="groceries" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <h3>Drinks</h3>
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
                  <VendorCard menuItem={item} route="groceries" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <h3>Supermarkets</h3>
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
                  <VendorCard menuItem={item} route="groceries" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <h3>Depots</h3>
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
                  <VendorCard menuItem={item} route="groceries" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {activeFilter === "drinks" && (
        <div className="space-y-4 sm:space-y-10 mt-4 sm:mt-10">
          <div>
            <h3>Drinks</h3>
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
                  <VendorCard menuItem={item} route="groceries" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {activeFilter === "supermarkets" && (
        <div className="space-y-4 sm:space-y-10 mt-4 sm:mt-10">
          <div>
            <h3>Supermarkets</h3>
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
                  <VendorCard menuItem={item} route="groceries" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {activeFilter === "depots" && (
        <div className="space-y-4 sm:space-y-10 mt-4 sm:mt-10">
          <div>
            <h3>Depots</h3>
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
                  <VendorCard menuItem={item} route="groceries" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  );
};

export default GroceriesSelection;
