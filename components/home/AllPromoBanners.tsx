import { useBannerPromos } from "@/lib/hooks/queries/useSpecials";
import { useActiveZone } from "@/lib/hooks/useActiveZone";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  RiArrowGoBackLine,
  RiArrowLeftLine,
  RiCloseFill,
} from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

const AllPromoBannersContent = ({
  isDesktop,
  setOpen,
}: {
  isDesktop: boolean;
  setOpen?: (v: boolean) => void;
}) => {
  const { zoneId } = useActiveZone();
  const { data: banners, isLoading, isSuccess } = useBannerPromos(zoneId || "");
  return (
    <div className="h-full overflow-y-auto hide-scrollbar bg-white">
      {/* Header */}
      {isDesktop ? (
        <>
          <DialogHeader className="mt-15">
            <div className="flex gap-2 justify-center">
              <DialogTitle className="text-xl font-medium text-center leading-7">
                All Promos
              </DialogTitle>
            </div>
          </DialogHeader>

          <DialogClose asChild>
            <button className="absolute top-6 right-6 size-10 flex justify-center items-center rounded-full bg-neutral-100">
              <RiCloseFill className="size-6" />
            </button>
          </DialogClose>
        </>
      ) : (
        // Mobile Header
        <div className="py-4 sticky top-0 z-20 flex items-center justify-center bg-white">
          {setOpen && (
            <button
              onClick={() => setOpen(false)}
              className="absolute left-6.5"
            >
              <RiArrowLeftLine className="size-5" />
            </button>
          )}
          <h2 className="text-lg sm:text-xl font-medium leading-6 sm:leading-7">
            All Promos
          </h2>
        </div>
      )}

      {isSuccess && (
        <div className="mt-3 max-sm:mb-4 sm:mt-8 max-sm:px-4">
          {banners.length === 0 && <p className="">No promo banners for now</p>}

          {banners.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4 md:gap-y-8">
              {banners
                .filter((b) => !!b.publicImgUrl)
                .map((banner) => (
                  <div className="" key={banner.id}>
                    <h2 className="text-base font-normal leading-5">
                      Save Up to
                      <span className="text-base font-bold leading-5">
                        {" "}
                        {banner.percentageValue}%
                      </span>
                    </h2>
                    <Link
                      href={`/vendor/${banner.vendorId}`}
                      className="relative mt-2 h-[106px] sm:h-[116px] rounded-sm sm:rounded-xl overflow-hidden block"
                    >
                      <Image
                        src={banner.campaignImgUrl}
                        alt="banner image"
                        className="size-full object-cover"
                        fill
                      />
                    </Link>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AllPromoBanners = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Adjust the breakpoint as needed

  return (
    <>
      {isDesktop && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent
            showCloseButton={false}
            className="w-[894px]! h-[668px]! max-w-[95vw]! max-h-[95vh] m-0 p-6! gap-0 rounded-2xl px-[28.5px] overflow-y-auto hide-scrollbar"
          >
            <AllPromoBannersContent isDesktop={isDesktop} />
          </DialogContent>
        </Dialog>
      )}

      <AnimatePresence mode="wait">
        {!isDesktop && open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            className="fixed z-37 inset-0 bg-white"
          >
            <AllPromoBannersContent isDesktop={isDesktop} setOpen={setOpen} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default AllPromoBanners;
