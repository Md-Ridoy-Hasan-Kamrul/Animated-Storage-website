import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './override-grid-predictive-arc.css';
import {
  DEFAULT_BRIGHTNESS,
  DEFAULT_GAP,
  DEFAULT_HUE,
  DEFAULT_MODE,
  DEFAULT_SATURATION,
  DEFAULT_SIZE,
  DEFAULT_SPEED,
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
  VARIANT_ID,
} from './constants';
import { PredictiveArcCanvas } from './PredictiveArcCanvas';
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
        <PredictiveArcCanvas
          variant={VARIANT_ID}
          size={DEFAULT_SIZE}
          gap={DEFAULT_GAP}
          mode={DEFAULT_MODE}
          speed={DEFAULT_SPEED}
          hue={DEFAULT_HUE}
          saturation={DEFAULT_SATURATION}
          brightness={DEFAULT_BRIGHTNESS}
        />
      </div>
    </div>
  );
});

export default LivePage;
