import React from 'react';
import { GALLERY_IMAGES } from '../content';

const BlackPanel = ({ panelRef, wrapRef, gridRef, layout, images = GALLERY_IMAGES }) => (
  <div
    ref={panelRef}
    className="fixed inset-0 z-10 bg-black"
    style={{ transform: 'translateY(100vh)' }}
  >
    <div
      ref={wrapRef}
      className="w-full"
      style={{ paddingTop: 'min(400px, 40vh)' }}
    >
      <div ref={gridRef} className="mx-auto grid w-full max-w-[1600px] gap-3 px-3 sm:gap-4 sm:px-6">
        {layout.map((row, rowIndex) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`row-${rowIndex}`}
            className="grid gap-3 sm:gap-4"
            style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
          >
            {row.map((imageIndex, colIndex) => {
              if (imageIndex < 0) {
                return (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={`empty-${rowIndex}-${colIndex}`}
                    className="aspect-[2/3]"
                    aria-hidden
                  />
                );
              }
              return (
                <div
                  key={images[imageIndex]}
                  className="bp-card aspect-[2/3] overflow-hidden"
                  data-col={colIndex}
                  style={{ transform: 'scale(0)' }}
                >
                  <img
                    src={images[imageIndex]}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default BlackPanel;
