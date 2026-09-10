import React, { useEffect, useRef, useState } from 'react';
import { MARQUEE_GIFS } from '../content';
import {
  MARQUEE_BASE_OFFSET,
  MARQUEE_SCROLL_FACTOR,
  MARQUEE_TILE,
} from '../constants';

const triple = (items) => [...items, ...items, ...items];

const MarqueeRow = ({ images, transform }) => (
  <div className="flex gap-3" style={{ transform, willChange: 'transform' }}>
    {images.map((src, i) => (
      <img
        // eslint-disable-next-line react/no-array-index-key
        key={`${src}-${i}`}
        src={src}
        alt=""
        loading="lazy"
        className="shrink-0 rounded-2xl object-cover"
        style={{ width: MARQUEE_TILE.width, height: MARQUEE_TILE.height }}
      />
    ))}
  </div>
);

const MarqueeSection = () => {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const top = section.offsetTop;
      setOffset((window.scrollY - top + window.innerHeight) * MARQUEE_SCROLL_FACTOR);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const row1 = triple(MARQUEE_GIFS.slice(0, 11));
  const row2 = triple(MARQUEE_GIFS.slice(11));

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
    >
      <div className="flex flex-col gap-3">
        <MarqueeRow
          images={row1}
          transform={`translateX(${offset - MARQUEE_BASE_OFFSET}px)`}
        />
        <MarqueeRow
          images={row2}
          transform={`translateX(${-(offset - MARQUEE_BASE_OFFSET)}px)`}
        />
      </div>
    </section>
  );
};

export default MarqueeSection;
