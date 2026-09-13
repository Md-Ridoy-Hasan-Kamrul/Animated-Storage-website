import React from 'react';

const HoverZones = ({ isMobile, onPlay }) => {
  if (isMobile) {
    return (
      <div
        data-testid="nike-zone-mobile"
        className="absolute inset-0 z-30"
        onTouchStart={() => onPlay(true)}
        onMouseEnter={() => onPlay(true)}
      />
    );
  }

  return (
    <>
      <div
        data-testid="nike-zone-right"
        className="absolute right-[calc(8%+100px)] bottom-[12%] z-30 h-[calc(50%+230px)] w-[calc(50%-50px)]"
        onMouseEnter={() => onPlay(true)}
        onMouseLeave={() => onPlay(false)}
      />
      <div
        data-testid="nike-zone-left"
        className="absolute left-[calc(8%+200px)] top-[calc(20%+190px)] z-30 h-[calc(22.5%+130px)] w-[calc(15%+250px)] -translate-y-full"
        onMouseEnter={() => onPlay(true)}
        onMouseLeave={() => onPlay(false)}
      />
    </>
  );
};

export default HoverZones;
