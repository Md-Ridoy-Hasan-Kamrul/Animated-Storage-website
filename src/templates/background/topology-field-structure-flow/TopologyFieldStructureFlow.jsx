import React from 'react';
import { STRUCTURE_FLOW_DEFAULT_PROPS } from './constants';
import { StructureFlowCollection } from './StructureFlowCollection';

/** Gallery card host — Topology Field Structure Flow. */
export function TopologyFieldStructureFlow(props) {
  return <StructureFlowCollection {...STRUCTURE_FLOW_DEFAULT_PROPS} {...props} />;
}

export default TopologyFieldStructureFlow;
