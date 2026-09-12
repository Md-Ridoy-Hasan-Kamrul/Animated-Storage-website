import React from 'react';

const PixelWord = ({ children }) => (
  <span className="font-pixel inline-block align-baseline text-[1.25em] font-normal leading-none">
    {children}
  </span>
);

const HeroHeadline = () => (
  <h1 className="ar-headline text-3xl font-normal uppercase tracking-wide sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]">
    I BRING THE
    <br />
    <PixelWord>UNEXPECTED</PixelWord> TO
    <br />
    BRAND &amp; DIGITAL
    <br />
    <PixelWord>EXPERIENCES</PixelWord>
  </h1>
);

export default HeroHeadline;
