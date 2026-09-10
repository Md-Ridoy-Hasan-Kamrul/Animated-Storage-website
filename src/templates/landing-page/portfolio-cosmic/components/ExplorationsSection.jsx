import React, { useRef, useState } from 'react';
import { EXPLORATION_ITEMS } from '../content';
import { useExplorationsPin } from '../hooks/useExplorationsPin';
import AccentButton from './AccentButton';

const LEFT = EXPLORATION_ITEMS.filter((_, i) => i % 2 === 0);
const RIGHT = EXPLORATION_ITEMS.filter((_, i) => i % 2 === 1);

const ExplorationCard = ({ item, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(item)}
    className="mb-10 aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))] shadow-lg transition-transform hover:scale-[1.02]"
    style={{ transform: `rotate(${item.rotation}deg)` }}
  >
    <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
  </button>
);

const ExplorationsSection = ({ enabled = true }) => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useExplorationsPin({
    sectionRef,
    pinRef,
    leftRef,
    rightRef,
    enabled,
  });

  return (
    <section ref={sectionRef} className="pc-bg relative min-h-[300vh]">
      <div
        ref={pinRef}
        className="relative z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <p className="pc-muted mb-4 text-xs uppercase tracking-[0.3em]">Explorations</p>
        <h2 className="pc-text mb-4 text-3xl md:text-5xl">
          Visual <span className="pc-font-display italic">playground</span>
        </h2>
        <p className="pc-muted mb-8 max-w-sm text-sm md:text-base">
          Experiments, studies, and fragments from the studio wall.
        </p>
        <AccentButton href="https://dribbble.com" variant="outline">
          Dribbble <span aria-hidden>↗</span>
        </AccentButton>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="pointer-events-auto mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-4 md:gap-40 md:px-10">
          <div ref={leftRef} className="flex flex-col items-start pt-[20vh]">
            {LEFT.map((item) => (
              <ExplorationCard key={item.id} item={item} onOpen={setLightbox} />
            ))}
          </div>
          <div ref={rightRef} className="flex flex-col items-end pt-[40vh]">
            {RIGHT.map((item) => (
              <ExplorationCard key={item.id} item={item} onOpen={setLightbox} />
            ))}
          </div>
        </div>
      </div>

      {lightbox ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === 'Escape' && setLightbox(null)}
        >
          <img
            src={lightbox.image}
            alt=""
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
          />
        </div>
      ) : null}
    </section>
  );
};

export default ExplorationsSection;
