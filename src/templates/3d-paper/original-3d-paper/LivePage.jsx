import React from 'react';
import { useNavigate } from 'react-router-dom';
import './original-3d-paper.css';
import {
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
  THREE_D_PAPER_DEFAULT_PROPS,
} from './constants';
import BackButton from './components/BackButton';
import { ThreeDPaper } from './ThreeDPaper';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

/** Original 3D Paper — live page. */
const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const handleBack = useStandaloneBack(navigate);

  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <div className={SHADER_FRAME_CLASS}>
        <ThreeDPaper {...THREE_D_PAPER_DEFAULT_PROPS} />
      </div>
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
