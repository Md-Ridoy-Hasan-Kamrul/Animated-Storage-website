import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './woven-cloth.css';
import {
  DEFAULT_BRIGHTNESS,
  DEFAULT_HUE,
  DEFAULT_SATURATION,
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
} from './constants';
import { WovenCloth } from './WovenCloth';
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
        <WovenCloth
          hue={DEFAULT_HUE}
          saturation={DEFAULT_SATURATION}
          brightness={DEFAULT_BRIGHTNESS}
        />
      </div>
    </div>
  );
});

export default LivePage;
