import { Skeleton } from "../ui/skeleton";
import { useHotPicks } from "@/lib/hooks/queries";

const Loading = () => (
  <div className="space-y-2 md:space-y-4">
    <Skeleton className="w-25 md:w-32 h-3 md:h-4" />
    <div className="flex gap-3 md:gap-6 overflow-x-auto hide-scrollbar">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton
          className="w-[103px] h-[72px] sm:w-31 sm:h-29 shrink-0"
          key={i}
        />
      ))}
    </div>
  </div>
);

const HotPicks = () => {
  const { data = [], isPending } = useHotPicks();

  if (isPending) {
    return <Loading />;
  }

  return (
    <section className="sm:my-10">
      <h3>Hot Picks</h3>
      <div className="flex gap-6 mt-2 max-sm:justify-between overflow-x-auto hide-scrollbar">
        {data.map((item, index) => (
          <div
            className="flex justify-center flex-col items-center"
            key={index}
          >
            <div className="size-15 sm:size-31 rounded-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="size-full object-cover"
              />
            </div>
            <p className="mt-0.5 text-xs sm:text-sm font-medium text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotPicks;
