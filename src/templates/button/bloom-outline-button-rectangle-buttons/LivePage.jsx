import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './bloom-outline-button-rectangle-buttons.css';
import {
  BLOOM_OUTLINE_BUTTON_DEFAULT_PROPS,
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
} from './constants';
import { RectangleButtons } from './RectangleButtons';
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
        <RectangleButtons {...BLOOM_OUTLINE_BUTTON_DEFAULT_PROPS} />
      </div>
    </div>
  );
});

export default LivePage;
