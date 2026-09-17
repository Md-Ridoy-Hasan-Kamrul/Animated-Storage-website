import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './certificate-3d-paper.css';
import {
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
  THREE_D_PAPER_DEFAULT_PROPS,
} from './constants';
import { ThreeDPaper } from './ThreeDPaper';
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
        <ThreeDPaper {...THREE_D_PAPER_DEFAULT_PROPS} />
      </div>
    </div>
  );
});

export default LivePage;
