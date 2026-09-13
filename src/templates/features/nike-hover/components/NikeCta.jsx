import React from 'react';
import {
  CTA_LABEL,
  NIKE_RED,
  SWOOSH_PATH,
  SWOOSH_VIEWBOX,
  SWOOSH_WIDTH,
} from '../constants';

const NikeCta = ({ isMobile = false, isTablet = false }) => {
  const position = isMobile
    ? 'left-1/2 bottom-[8%] -translate-x-1/2'
    : isTablet
      ? 'right-[5%] bottom-[12%]'
      : 'right-[calc(8%+100px)] bottom-[12%]';
  const width = isMobile ? 'w-[140px]' : 'w-[180px]';
  const boxHeight = isMobile ? 'h-[80px]' : 'h-[100px]';

  return (
    <div className={`absolute z-20 flex flex-col items-center ${position}`}>
      <div className={`${width} bg-white py-[6px] text-center`}>
        <p className="font-serif text-[10px] font-bold uppercase leading-[16px] tracking-[0.08em] text-black">
          {CTA_LABEL}
        </p>
      </div>
      <div
        className={`${width} ${boxHeight} flex items-center justify-center`}
        style={{ background: NIKE_RED }}
      >
        <svg
          width={SWOOSH_WIDTH}
          viewBox={SWOOSH_VIEWBOX}
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d={SWOOSH_PATH} />
        </svg>
      </div>
    </div>
  );
};

export default NikeCta;
