"use client";

import { useBannerPromos } from "@/lib/hooks/queries/useSpecials";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import Image from "next/image";
import { SwiperSlide, Swiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import LoadingSkeleton from "../vendor/LoadingSkeleton";
import { RiDiscountPercentFill } from "react-icons/ri";
import AllPromoBanners from "./AllPromoBanners";
import { useState } from "react";

const Loading = () => (
  <div className="flex items-center gap-6 w-full">
    <div className="grid md:grid-cols-2 gap-6 w-full">
      <Skeleton className="h-[106px] sm:h-[154px] rounded-sm sm:rounded-xl" />
      <Skeleton className="max-md:hidden h-[106px] sm:h-[154px] rounded-sm sm:rounded-xl" />
    </div>
    <Skeleton className="max-md:hidden h-9.5 w-[81px] rounded-full shrink-0"/>
  </div>
);

const Banners = ({
  showScreen = "LARGE",
}: {
  showScreen?: "LARGE" | "MOBILE";
}) => {
  const [open, setOpen] = useState(false);
  const { zoneId } = useActiveZone();
  const { data: banners, isLoading, isSuccess } = useBannerPromos(zoneId || "");
  return (
    <>
      {showScreen === "LARGE" && (
        <section className="my-4 sm:my-10 md:flex items-center gap-4 sm:gap-6">
          {isLoading && <Loading />}

          {isSuccess && banners.length > 0 && (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              speed={600}
              loop={true}
              autoplay={{
                delay: 3000,
                pauseOnMouseEnter: true,
              }}
              // pagination={{
              //   clickable: true, // makes dots clickable
              //   dynamicBullets: true, // optional: set true for smaller dots that expand
              // }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  loop: false,
                },
              }}
              // className="pb-7! md:pb-10! "
            >
              {banners
                .filter((b) => !!b.campaignImgUrl.trim())
                .map((banner, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      href={`/vendor/${banner.vendorId}`}
                      className="relative h-[106px] sm:h-[154px] rounded-sm sm:rounded-xl overflow-hidden block"
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

          {isSuccess && (
            <Button
              onClick={() => setOpen(true)}
              variant="outline"
              className="max-md:hidden shrink-0 py-2 px-4 h-auto text-base font-normal leading-5 border-primary text-primary hover:text-primary rounded-full"
            >
              See All
            </Button>
          )}
        </section>
      )}

      {/* Second promo banners for mobile */}
      {showScreen === "MOBILE" && (
        <section className="md:hidden mt-6 sm:mt-10 max-sm:pb-2">
          {isLoading && <LoadingSkeleton count={2} title scroll />}

          {isSuccess && (
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-center">
                <h3>Promos</h3>
                <RiDiscountPercentFill className="size-3.5 text-blue-600" />
              </div>

              <Button
                onClick={() => setOpen(true)}
                variant="ghost"
                className="h-auto p-0 text-primary font-normal hover:underline active:underline underline-offset-2 hover:cursor-pointer hover:bg-transparent hover:text-primary hover:font-medium"
              >
                See All
              </Button>
            </div>
          )}

          {isSuccess && (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              speed={600}
              loop={true}
              autoplay={{
                delay: 3000,
                pauseOnMouseEnter: true,
              }}
              // pagination={{
              //   clickable: true, // makes dots clickable
              //   dynamicBullets: true, // optional: set true for smaller dots that expand
              // }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  loop: false,
                },
              }}
              className="mt-2.5"
            >
              {banners
                .filter((b) => !!b.campaignImgUrl.trim())
                .map((banner, index) => (
                  <SwiperSlide key={index}>
                    <Link
                      href={`/vendor/${banner.vendorId}`}
                      className="relative h-[106px] sm:h-[95px] rounded-sm sm:rounded-xl overflow-hidden block"
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
      )}

      <AllPromoBanners open={open} setOpen={setOpen} />
    </>
  );
};

export default Banners;
