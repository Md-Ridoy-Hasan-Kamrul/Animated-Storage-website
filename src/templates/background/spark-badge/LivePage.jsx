import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './spark-badge.css';
import {
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
  SOURCE_URL,
  SPARK_BADGE_DEFAULT_PROPS,
  VARIANT_ID,
} from './constants';
import { SparkBadge } from './SparkBadge';
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
        <SparkBadge
          {...SPARK_BADGE_DEFAULT_PROPS}
          variant={VARIANT_ID}
          sourceUrl={SOURCE_URL}
        />
      </div>
    </div>
  );
});

export default LivePage;
