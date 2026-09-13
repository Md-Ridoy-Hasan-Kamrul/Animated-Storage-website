import React, { memo } from 'react';
import {
  MAIN_CLASS,
  MAIN_CLOSED_CLASS,
  MAIN_FADE_CLASS,
  MAIN_OPEN_CLASS,
} from '../constants';
import { overlayMotionClass } from '../utils/statIcons';
import BottomStats from './BottomStats';
import HeroCopy from './HeroCopy';

const HeroMain = memo(({ menuOpen }) => (
  <main
    className={`${MAIN_CLASS} ${MAIN_FADE_CLASS} ${overlayMotionClass(
      menuOpen,
      MAIN_OPEN_CLASS,
      MAIN_CLOSED_CLASS,
    )}`}
  >
    <HeroCopy />
    <BottomStats />
  </main>
));

HeroMain.displayName = 'HeroMain';

export default HeroMain;
