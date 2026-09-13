import React from 'react';
import {
  HEADLINE_LINE_FOUR,
  HEADLINE_LINE_ONE,
  HEADLINE_LINE_THREE_ITALIC,
  HEADLINE_LINE_THREE_LEAD,
  HEADLINE_LINE_TWO,
} from '../constants';

const HeroHeadline = ({ isMobile = false, isTablet = false }) => {
  const position = isMobile
    ? 'left-4 bottom-[30%] max-w-[90%]'
    : isTablet
      ? 'left-[5%] bottom-[12%] max-w-[500px]'
      : 'left-[8%] bottom-[12%] max-w-[500px]';
  const size = isMobile
    ? 'text-[24px]'
    : isTablet
      ? 'text-[32px]'
      : 'text-[44px]';

  return (
    <h2
      className={`absolute z-20 flex flex-col leading-[1.05] tracking-tight ${position} ${size}`}
    >
      <span className="font-sans font-medium">{HEADLINE_LINE_ONE}</span>
      <span className="font-sans font-medium">{HEADLINE_LINE_TWO}</span>
      <span className="pt-1 font-serif font-normal">
        <span className="not-italic">{HEADLINE_LINE_THREE_LEAD}</span>
        <span className="italic">{HEADLINE_LINE_THREE_ITALIC}</span>
      </span>
      <span className="font-serif font-normal italic">{HEADLINE_LINE_FOUR}</span>
    </h2>
  );
};

export default HeroHeadline;
