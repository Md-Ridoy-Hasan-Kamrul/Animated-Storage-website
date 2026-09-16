import React from 'react';
import { useNavigate } from 'react-router-dom';
import './topology-field-structure-flow.css';
import {
  PAGE_CLASS,
  SHADER_FRAME_CLASS,
  STRUCTURE_FLOW_DEFAULT_PROPS,
} from './constants';
import BackButton from './components/BackButton';
import { StructureFlowCollection } from './StructureFlowCollection';
import { useEmbedMode } from './hooks/useEmbedMode';
import { usePageChrome } from './hooks/usePageChrome';
import { useStandaloneBack } from './hooks/useStandaloneBack';

/** Topology Field Structure Flow — live page. */
const LivePage = () => {
  const navigate = useNavigate();
  const { isStandalone } = useEmbedMode();
  const handleBack = useStandaloneBack(navigate);

  usePageChrome();

  return (
    <div className={PAGE_CLASS}>
      <div className={SHADER_FRAME_CLASS}>
        <StructureFlowCollection {...STRUCTURE_FLOW_DEFAULT_PROPS} />
      </div>
      {isStandalone ? <BackButton onBack={handleBack} /> : null}
    </div>
  );
};

export default LivePage;
