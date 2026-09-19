import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './play-circle-liquid-metal-button.css';
import {
  PAGE_CLASS,
  PLAY_CIRCLE_DEFAULT_PROPS,
  SHADER_FRAME_CLASS,
  SOURCE_URL,
} from './constants';
import { LiquidMetalButton } from './LiquidMetalButton';
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
        <LiquidMetalButton {...PLAY_CIRCLE_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />
      </div>
    </div>
  );
});

export default LivePage;
