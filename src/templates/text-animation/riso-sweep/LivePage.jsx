import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './riso-sweep.css';
import {
  PAGE_CLASS,
  RISO_SWEEP_DEFAULT_PROPS,
  SHADER_FRAME_CLASS,
  SOURCE_URL,
} from './constants';
import { GalleryHeading } from './GalleryHeading';
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
        <GalleryHeading {...RISO_SWEEP_DEFAULT_PROPS} documentSrc={SOURCE_URL} />
      </div>
    </div>
  );
});

export default LivePage;
