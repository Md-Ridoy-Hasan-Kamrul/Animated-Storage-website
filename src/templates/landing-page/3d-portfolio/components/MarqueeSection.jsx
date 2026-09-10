import React, { useEffect, useRef, useState } from 'react';
import { MARQUEE_GIFS } from '../content';

const MarqueeSection = () => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const top = section.offsetTop;
      const next = (window.scrollY - top + window.innerHeight) * 0.3;
      setOffset(next);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const row1 = [...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11)];
  const row2 = [...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11)];

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row1.map((src, i) => (
            <img
              key={`r1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
            />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {row2.map((src, i) => (
            <img
              key={`r2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
