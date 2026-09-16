import React from 'react';
import { STRUCTURE_FLOW_DEFAULT_PROPS } from './constants';
import { StructureFlowCollection } from './StructureFlowCollection';

/** Gallery card host — Flux Vortex Structure Flow. */
export function FluxVortexStructureFlow(props) {
  return <StructureFlowCollection {...STRUCTURE_FLOW_DEFAULT_PROPS} {...props} />;
}

export default FluxVortexStructureFlow;
