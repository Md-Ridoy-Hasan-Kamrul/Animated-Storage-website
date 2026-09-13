import React from 'react';
import {
  CARD_BG,
  CARD_BLUR,
  CARD_BORDER,
  CHART_HEIGHT,
  CHART_PATH,
  CHART_VIEWBOX,
  CHART_WIDTH,
  CHART_WRAP_WIDTH,
  NIKE_RED,
  STAT_SUBTITLE,
  STAT_TITLE,
  STAT_VALUE,
} from '../constants';

const StatsCard = ({ isMobile = false, isTablet = false }) => {
  const position = isMobile
    ? 'left-4 top-[15%] w-[280px]'
    : isTablet
      ? 'left-[5%] top-[18%] w-[320px]'
      : 'left-[calc(8%+200px)] top-[20%] w-[320px]';
  const statSize = isMobile ? 'text-[48px] leading-[56px]' : 'text-[72px] leading-[80px]';

  return (
    <div
      className={`absolute z-20 rounded-sm px-8 py-6 ${position}`}
      style={{
        background: CARD_BG,
        backdropFilter: `blur(${CARD_BLUR})`,
        border: CARD_BORDER,
      }}
    >
      <div className="mb-3 flex items-end">
        <p className={`font-serif italic tracking-tight ${statSize}`} style={{ color: NIKE_RED }}>
          {STAT_VALUE}
        </p>
        <div style={{ width: CHART_WRAP_WIDTH }} className="overflow-visible">
          <svg
            style={{ width: CHART_WIDTH, height: CHART_HEIGHT }}
            viewBox={CHART_VIEWBOX}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <g filter="url(#filter0_d_878_28499)">
              <path d={CHART_PATH} stroke={NIKE_RED} strokeWidth="2" />
            </g>
            <defs>
              <filter
                id="filter0_d_878_28499"
                x="0"
                y="0"
                width="289"
                height="138"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="11.25" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.854902 0 0 0 0 0.227451 0 0 0 0 0.0862745 0 0 0 1 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_878_28499"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_878_28499"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="mb-2 font-serif text-[15px] uppercase leading-tight tracking-[0.02em] text-white">
        {STAT_TITLE}
      </p>
      <p className="font-serif text-[13px] text-white/60">{STAT_SUBTITLE}</p>
    </div>
  );
};

export default StatsCard;
