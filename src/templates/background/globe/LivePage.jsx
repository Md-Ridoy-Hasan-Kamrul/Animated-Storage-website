import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './globe.css';
import { GLOBE_DEFAULT_PROPS, PAGE_CLASS, SHADER_FRAME_CLASS } from './constants';
import { GlobeCollection } from './GlobeCollection';
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
        <GlobeCollection {...GLOBE_DEFAULT_PROPS} />
      </div>
    </div>
  );
});

export default LivePage;
