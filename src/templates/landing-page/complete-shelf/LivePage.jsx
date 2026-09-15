import React from 'react';
import { useNavigate } from 'react-router-dom';
import './complete-shelf.css';
import { COMPLETE_SHELF_DEFAULT_PROPS, PAGE_CLASS, SHADER_FRAME_CLASS } from './constants';
import BackButton from './components/BackButton';
import { CompleteShelfLandingPage } from './CompleteShelfLandingPage';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

/**
 * Working Volumes — Complete Shelf live page — hosts the byte-exact authored document.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const handleBack = useStandaloneBack(navigate);

  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <div className={SHADER_FRAME_CLASS}>
        <CompleteShelfLandingPage {...COMPLETE_SHELF_DEFAULT_PROPS} />
      </div>
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
