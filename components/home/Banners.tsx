"use client";

import { useBannerPromos } from "@/lib/hooks/queries/useSpecials";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

const Loading = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <Skeleton className="h-[106px] sm:h-[154px] rounded-sm sm:rounded-xl" />
    <Skeleton className="max-md:hidden h-[106px] sm:h-[154px] rounded-sm sm:rounded-xl" />
  </div>
);

const Banners = () => {
  const { zoneId } = useActiveZone();
  const { data: banners, isLoading, isSuccess } = useBannerPromos(zoneId || "");
  return (
    <section className="mb-2 sm:mb-8">
      {isLoading && <Loading />}
      {isSuccess && (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          speed={600}
          loop={true}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true, // makes dots clickable
            dynamicBullets: true, // optional: set true for smaller dots that expand
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              loop: false,
            },
          }}
          className="pb-7! md:pb-10! "
        >
          {banners
            .filter((b) => !!b.campaignImgUrl.trim())
            .map((banner, index) => (
              <SwiperSlide key={index}>
                <Link
                  href={`/vendor/${banner.vendorId}`}
                  className=" relative h-[106px] sm:h-[154px] rounded-sm sm:rounded-xl overflow-hidden block"
                >
                  <Image
                    src={banner.campaignImgUrl}
                    alt="banner image"
                    className="size-full object-cover"
                    fill
                  />
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </section>
  );
};

export default Banners;
