import React from 'react';
import { useNavigate } from 'react-router-dom';
import './real-time-alerts.css';
import { PAGE_CLASS } from './constants';
import App from './App';
import BackButton from './components/BackButton';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useSignalFonts } from './hooks/useSignalFonts';
import { useStandaloneBack } from './hooks/useStandaloneBack';

const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone, isPreview } = useEmbedMode();
  const handleBack = useStandaloneBack(navigate);

  useSignalFonts();
  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <App preview={isPreview} />
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
