import React from 'react';
import { FEATURE_LINE_ONE, FEATURE_LINE_TWO } from '../constants';
import CornerBracket from './CornerBracket';
import WireGlobe from './WireGlobe';

const FeatureBlock = () => (
  <aside className="synth-feature relative self-end">
    <CornerBracket corner="tl" className="synth-corner absolute left-0 top-0" />
    <CornerBracket corner="tr" className="synth-corner absolute right-0 top-0" />
    <CornerBracket corner="bl" className="synth-corner absolute bottom-0 left-0" />
    <CornerBracket corner="br" className="synth-corner absolute bottom-0 right-0" />
    <div className="flex items-center gap-4">
      <WireGlobe />
      <p className="font-jakarta synth-feature-copy uppercase">
        <span className="block">{FEATURE_LINE_ONE}</span>
        <span className="block">{FEATURE_LINE_TWO}</span>
      </p>
    </div>
  </aside>
);

export default FeatureBlock;
