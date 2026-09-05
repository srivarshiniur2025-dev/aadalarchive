"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons/Icons";

type CarouselApi = UseEmblaCarouselType[1];

export function Carousel({
  children,
  className,
  opts,
}: {
  children: React.ReactNode;
  className?: string;
  opts?: Parameters<typeof useEmblaCarousel>[0];
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    ...opts,
  });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">{children}</div>
      </div>
      <button
        type="button"
        aria-label="Previous"
        disabled={!canPrev}
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--border-gold)] bg-obsidian/80 p-2 text-gold disabled:opacity-30"
      >
        <Icons.Back className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Next"
        disabled={!canNext}
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-[var(--border-gold)] bg-obsidian/80 p-2 text-gold disabled:opacity-30"
      >
        <Icons.Forward className="h-4 w-4" />
      </button>
    </div>
  );
}

export function CarouselItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[45%] lg:basis-[30%]", className)}>
      {children}
    </div>
  );
}
