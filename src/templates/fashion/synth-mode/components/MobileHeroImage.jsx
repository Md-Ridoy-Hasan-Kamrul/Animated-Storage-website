import React from 'react';
import { MOBILE_IMAGE_CLASS } from '../constants';
import { BG_IMAGE_1 } from '../content';

const MobileHeroImage = () => (
  <div
    className={MOBILE_IMAGE_CLASS}
    style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
    role="img"
    aria-label="LGPSM campaign"
  />
);

export default MobileHeroImage;
