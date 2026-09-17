import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './warp-field-keycap-drift.css';
import { PAGE_CLASS, SHADER_FRAME_CLASS, WARP_FIELD_KEYCAP_DRIFT_PROPS } from './constants';
import { WarpFieldBackground } from './WarpFieldBackground';
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
        <WarpFieldBackground {...WARP_FIELD_KEYCAP_DRIFT_PROPS} />
      </div>
    </div>
  );
});

export default LivePage;
