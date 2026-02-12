'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { normalizeImagePath } from '@/lib/utils/normalizeImagePath';
import { LoginHeading } from '../ui/Heading';

export default function OccasionSlider({ occasions }) {
  const sliderRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(8);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

  /* ================= RESPONSIVE ITEMS ================= */
  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;

      if (width < 640) setVisible(3);        // mobile
      else if (width < 768) setVisible(4);   // sm
      else if (width < 1024) setVisible(5);  // md
      else if (width < 1280) setVisible(6);  // lg
      else setVisible(8);                    // xl
    };

    updateVisible();
    window.addEventListener('resize', updateVisible);

    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = occasions.length - visible;

  /* ================= AUTO SLIDE ================= */
  useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isDragging, maxIndex]);

  /* ================= TRANSLATE ================= */
  useEffect(() => {
    if (!sliderRef.current) return;

    const width = sliderRef.current.offsetWidth;
    const move = (width / visible) * index;

    setCurrentTranslate(-move);
    setPrevTranslate(-move);
  }, [index, visible]);

  /* ================= DRAG ================= */
  const dragStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
  };

  const dragMove = (e) => {
    if (!isDragging) return;

    const currentX = e.touches
      ? e.touches[0].clientX
      : e.clientX;

    const diff = currentX - startX;
    setCurrentTranslate(prevTranslate + diff);
  };

  const dragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && index < maxIndex) {
      setIndex(index + 1);
    }

    if (movedBy > 100 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        <LoginHeading text="Shop by Occasion" />

        <div
          ref={sliderRef}
          className="relative mt-6 sm:mt-8 overflow-hidden"
          onMouseLeave={dragEnd}
        >
          {/* TRACK */}
          <div
            className={`flex transition-transform ${
              isDragging ? 'duration-0' : 'duration-500'
            }`}
            style={{ transform: `translateX(${currentTranslate}px)` }}
            onMouseDown={dragStart}
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onTouchStart={dragStart}
            onTouchMove={dragMove}
            onTouchEnd={dragEnd}
          >
            {occasions?.map((item, i) => (
              <div
                key={i}
                className="
                  flex-shrink-0
                  w-1/3
                  sm:w-1/4
                  md:w-1/5
                  lg:w-1/6
                  xl:w-[12.5%]
                  px-1 sm:px-1.5 md:px-2
                  text-center
                  cursor-grab
                "
              >
                {/* IMAGE */}
                <div
                  className="
                    shadow-md
                    relative
                    group
                    hover:shadow-xl
                    hover:-translate-y-2
                    p-1.5 sm:p-2 md:p-3
                    w-14 h-14
                    sm:w-20 sm:h-20
                    md:w-28 md:h-28
                    lg:w-32 lg:h-32
                    mx-auto
                    transition-all
                    duration-200
                    flex
                    items-center
                    justify-center
                    border-2
                    rounded-full
                    bg-pink-300
                    dark:bg-pink-600
                  "
                >
                  <Image
                    src={normalizeImagePath(
                      item.image || '/images/decore.jpg'
                    )}
                    alt={item.name}
                    fill
                    className="object-cover rounded-full group-hover:scale-110 transition-all duration-200"
                  />
                </div>

                {/* TEXT */}
                <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold line-clamp-1">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
