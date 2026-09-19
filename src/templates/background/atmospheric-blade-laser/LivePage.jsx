import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './atmospheric-blade-laser.css';
import { ATMOSPHERIC_BLADE_DEFAULT_PROPS, PAGE_CLASS, SHADER_FRAME_CLASS } from './constants';
import { LaserCollection } from './LaserCollection';
import BackButton from './components/BackButton';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

const LivePage = memo(function LivePage() {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const onBack = useStandaloneBack(navigate);
  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      {isStandalone ? <BackButton onBack={onBack} /> : null}
      <div className={SHADER_FRAME_CLASS}>
        <LaserCollection {...ATMOSPHERIC_BLADE_DEFAULT_PROPS} />
      </div>
    </div>
  );
});

export default LivePage;
