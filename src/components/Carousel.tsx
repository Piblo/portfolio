import clsx from "clsx";
import { useState, type ReactNode, Children } from "react";
import { useSwipeable } from "react-swipeable";

type CarouselProps = {
  itemCount: number;
  children: ReactNode;
  className?: string;
};

export const Carousel = ({ children, itemCount, className }: CarouselProps) => {
  const [x, setX] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const SWIPE_DELTA_MIN = 150;

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      setX(deltaX);
    },
    onSwipedLeft: ({ deltaX }) => {
      if (Math.abs(deltaX) < SWIPE_DELTA_MIN) return;
      setActiveIndex((current) => Math.min(current + 1, itemCount - 1));
    },
    onSwipedRight: ({ deltaX }) => {
      if (Math.abs(deltaX) < SWIPE_DELTA_MIN) return;
      setActiveIndex((current) => Math.max(current - 1, 0));
    },
    onSwiped: () => {
      setX(0);
    },
    trackMouse: true,
  });

  return (
    <div className={clsx("flex flex-col h-full", className)}>
      <div
        className={clsx("flex flex-1", { "transition-transform": x === 0 })}
        style={{
          transform: `translateX(calc(-${activeIndex * 100}% + ${x}px))`,
        }}
        {...handlers}
      >
        {children}
      </div>
      <div className="rounded-full bg-neutral-800 mb-2 w-fit p-2 px-6 flex gap-4 self-center">
        {Array(itemCount)
          .fill("")
          .map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={clsx("w-[6px] h-[6px]  rounded-full", {
                "bg-neutral-100": index === activeIndex,
                "bg-neutral-100/30": index !== activeIndex,
              })}
            ></button>
          ))}
      </div>
    </div>
  );
};

type CarouselItemProps = {
  children: ReactNode;
};

const CarouselItem = ({ children }: CarouselItemProps) => {
  return <div className="flex-shrink-0 basis-full select-none">{children}</div>;
};

Carousel.Item = CarouselItem;
