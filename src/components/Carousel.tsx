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

  const handlers = useSwipeable({
    onSwiping: ({ absX, deltaX }) => {
      setX(deltaX);
    },
    onSwipedLeft: () => {
      console.log("swiped left");
      setActiveIndex((current) => current + 1);
    },
    onSwipedRight: () => {
      setActiveIndex((current) => current - 1);
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
            <div
              key={index}
              className={clsx("w-[6px] h-[6px]  rounded-full", {
                "bg-neutral-100": index === activeIndex,
                "bg-neutral-100/30": index !== activeIndex,
              })}
            ></div>
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
