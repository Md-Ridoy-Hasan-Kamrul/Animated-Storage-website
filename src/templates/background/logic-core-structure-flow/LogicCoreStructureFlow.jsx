import React from 'react';
import { STRUCTURE_FLOW_DEFAULT_PROPS } from './constants';
import { StructureFlowCollection } from './StructureFlowCollection';

/** Gallery card host — Logic Core Structure Flow. */
export function LogicCoreStructureFlow(props) {
  return <StructureFlowCollection {...STRUCTURE_FLOW_DEFAULT_PROPS} {...props} />;
}

export default LogicCoreStructureFlow;
