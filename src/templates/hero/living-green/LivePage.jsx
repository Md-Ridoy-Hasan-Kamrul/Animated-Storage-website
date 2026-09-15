import React from 'react';
import { useNavigate } from 'react-router-dom';
import './living-green.css';
import { PAGE_CLASS, SHADER_FRAME_CLASS, SYLVA_DEFAULT_PROPS } from './constants';
import BackButton from './components/BackButton';
import { SylvaHero } from './SylvaHero';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

/**
 * Living Green — Sylva live page — hosts the byte-exact authored document.
 */
const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const handleBack = useStandaloneBack(navigate);

  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <div className={SHADER_FRAME_CLASS}>
        <SylvaHero {...SYLVA_DEFAULT_PROPS} />
      </div>
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
