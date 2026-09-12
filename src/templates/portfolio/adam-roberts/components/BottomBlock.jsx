import React from 'react';
import AwardsRow from './AwardsRow';
import FooterStrip from './FooterStrip';
import HeroHeadline from './HeroHeadline';
import ShowreelButton from './ShowreelButton';

const BottomBlock = () => (
  <div className="pb-4">
    <div className="grid grid-cols-1 items-end gap-4 sm:gap-6 lg:grid-cols-2">
      <HeroHeadline />
      <div className="flex flex-col justify-end gap-4 sm:gap-6">
        <ShowreelButton />
        <AwardsRow />
      </div>
    </div>
    <FooterStrip />
  </div>
);

export default BottomBlock;
