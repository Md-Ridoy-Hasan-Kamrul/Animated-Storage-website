import React from 'react';
import { useNavigate } from 'react-router-dom';
import './china-japanese-tower-landscape.css';
import {
  CHINESE_TOWER_DEFAULT_PROPS,
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
} from './constants';
import BackButton from './components/BackButton';
import { JapaneseTowerLandscape } from './JapaneseTowerLandscape';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

/** Chinese Tower Landscape — live page (China). */
const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const handleBack = useStandaloneBack(navigate);

  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <div className={SHADER_FRAME_CLASS}>
        <JapaneseTowerLandscape {...CHINESE_TOWER_DEFAULT_PROPS} />
      </div>
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
