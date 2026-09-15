import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sublevel-studio.css';
import { PAGE_CLASS, SHADER_FRAME_CLASS } from './constants';
import BackButton from './components/BackButton';
import { SublevelStudioLandingPage } from './SublevelStudioLandingPage';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

/**
 * Sublevel Studio live page — hosts the byte-exact authored document in a full-size frame.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const handleBack = useStandaloneBack(navigate);

  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <div className={SHADER_FRAME_CLASS}>
        <SublevelStudioLandingPage />
      </div>
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
