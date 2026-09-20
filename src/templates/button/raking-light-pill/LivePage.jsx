import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './raking-light-pill.css';
import { PAGE_CLASS, RAKING_DEFAULT_PROPS, SHADER_FRAME_CLASS } from './constants';
import { ShaderButtons } from './ShaderButtons';
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
        <ShaderButtons {...RAKING_DEFAULT_PROPS} />
      </div>
    </div>
  );
});

export default LivePage;
