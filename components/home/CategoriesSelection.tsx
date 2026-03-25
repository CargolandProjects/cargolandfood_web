"use client";

import { useEffect, useMemo } from "react";
// import FilterBar from "../FilterBar";
import VendorCard from "../vendor/VendorCard";
import Loading from "../vendor/LoadingSkeleton";
// import { Swiper, SwiperSlide } from "swiper/react";
import { useVendorsByCategory } from "@/lib/hooks/queries/useVendors";
import { useInView } from "react-intersection-observer";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import { useCategory } from "@/contexts/CategoryContext";

const CategoriesSelection = () => {
  // const [activeFilter, setActiveFilter] = useState("all");
  // const { data, isLoading } = usePromotions();
  const { activeCategory } = useCategory();
  const { zoneId } = useActiveZone();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVendorsByCategory(zoneId ?? "", activeCategory ?? "");

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const vendors = useMemo(() => {
    const allVendors = data?.pages.flatMap((page) => page.vendors) ?? [];
    return allVendors;
  }, [data?.pages]);

  // const filters = [
  //   { label: "All Vendors", value: "all" },
  //   { label: "Fast Delivery", value: "fast" },
  //   { label: "Best Prices", value: "prices" },
  // ];

  if (isLoading) {
    return (
      <section className="my-6 sm:my-10">
        <Loading count={6} title />
      </section>
    );
  }

  return (
    <section className="my-6 sm:my-10 h-full">
      {/* <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      /> */}

      {/* {activeFilter === "all" && (
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
                  <VendorCard menuItem={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <h3>Fast Delivery</h3>
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
                  <VendorCard menuItem={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            <h3>Best Prices</h3>
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
                  <VendorCard menuItem={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {activeFilter === "fast" && (
        <div className="space-y-4 sm:space-y-10 mt-4 sm:mt-10 ">
          <div>
            <h3>Fast Delivery</h3>
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
                  <VendorCard menuItem={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {activeFilter === "prices" && (
        <div className="space-y-4 sm:space-y-10 mt-4 sm:mt-10 ">
        
          <div>
            <h3>Best Prices</h3>
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
                  <VendorCard menuItem={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )} */}

      <h3>{activeCategory}</h3>

      {isError && (
        <p className="text-red-500 text-center mt-2 sm:mt-4">Error Fetching Vendors</p>
      )}

      {!zoneId && (
        <p className="text-neutral-500 text-center mt-2 sm:mt-4">
          Please select your location
        </p>
      )}

      {isSuccess && vendors.length === 0 && (
        <p className="text-neutral-500 text-left sm:text-center mt-2 sm:mt-4">
          No vendors found for your current location
        </p>
      )}

      {isSuccess && vendors.length > 0 && (
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 xl:gap-12 mt-2 section-y">
            {vendors.map((vendor) => (
              <VendorCard
                vendor={vendor}
                key={vendor.id}
                vendorId={vendor.id}
                source="homepage"
              />
            ))}
          </div>

          {/* Intersection observer trigger */}
          <div ref={ref} className=" flex items-center justify-center">
            {isFetchingNextPage && (
              <div className="text-neutral-500 h-20">
                Loading more {activeCategory}...
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CategoriesSelection;
