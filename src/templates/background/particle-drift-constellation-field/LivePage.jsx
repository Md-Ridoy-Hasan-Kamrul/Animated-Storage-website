import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './particle-drift-constellation-field.css';
import {
  PAGE_CLASS,
  PARTICLE_DRIFT_DEFAULT_PROPS,
  SHADER_FRAME_CLASS,
  SOURCE_URL,
} from './constants';
import { ConstellationField } from './ConstellationField';
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
        <ConstellationField {...PARTICLE_DRIFT_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />
      </div>
    </div>
  );
});

export default LivePage;
