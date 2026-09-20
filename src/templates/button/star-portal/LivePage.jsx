import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './star-portal.css';
import {
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
  SOURCE_URL,
  STAR_PORTAL_DEFAULT_PROPS,
} from './constants';
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
        <ShaderButtons {...STAR_PORTAL_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />
      </div>
    </div>
  );
});

export default LivePage;
