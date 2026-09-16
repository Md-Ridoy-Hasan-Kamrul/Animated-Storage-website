import React from 'react';
import { useNavigate } from 'react-router-dom';
import './living-green-sylva-living-world.css';
import {
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
  SYLVA_LIVING_WORLD_DEFAULT_PROPS,
} from './constants';
import BackButton from './components/BackButton';
import { SylvaLivingWorldScene } from './SylvaLivingWorldScene';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

/**
 * Living Green Sylva Living World — scene-only live page.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const handleBack = useStandaloneBack(navigate);

  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <div className={SHADER_FRAME_CLASS}>
        <SylvaLivingWorldScene {...SYLVA_LIVING_WORLD_DEFAULT_PROPS} />
      </div>
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
