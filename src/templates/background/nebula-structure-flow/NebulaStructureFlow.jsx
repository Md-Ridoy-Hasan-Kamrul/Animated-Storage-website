import React from 'react';
import { STRUCTURE_FLOW_DEFAULT_PROPS } from './constants';
import { StructureFlowCollection } from './StructureFlowCollection';

/** Gallery card host — Nebula Structure Flow. */
export function NebulaStructureFlow(props) {
  return <StructureFlowCollection {...STRUCTURE_FLOW_DEFAULT_PROPS} {...props} />;
}

export default NebulaStructureFlow;
