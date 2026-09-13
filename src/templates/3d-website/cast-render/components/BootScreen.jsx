import React, { memo } from 'react';

const BootScreen = memo(({ bootRef, barRef, pctRef, done }) => (
  <div className={`boot${done ? ' done' : ''}`} id="boot" ref={bootRef}>
    <div className="bar">
      <i id="bootBar" ref={barRef} />
    </div>
    <p id="bootPct" ref={pctRef}>
      LOADING 0%
    </p>
  </div>
));

BootScreen.displayName = 'BootScreen';

export default BootScreen;
