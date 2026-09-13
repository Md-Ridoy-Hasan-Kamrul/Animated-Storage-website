import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CTA_LABEL, HEADLINE_LINES, ICON_STROKE } from '../constants';
import CheckerMark from './CheckerMark';
import CornerBracket from './CornerBracket';

const HeroCopy = ({ onShop }) => (
  <div className="flex flex-col justify-center">
    <CornerBracket corner="tl" className="synth-corner mb-3" />
    <h1 className="font-orbitron synth-headline uppercase">
      <span className="block">{HEADLINE_LINES[0]}</span>
      <span className="block">{HEADLINE_LINES[1]}</span>
      <span className="flex items-end gap-3">
        <span>{HEADLINE_LINES[2]}</span>
        <CheckerMark />
      </span>
    </h1>
    <CornerBracket corner="bl" className="synth-corner mt-3" />
    <button type="button" className="synth-cta mt-8 self-start font-jakarta uppercase" onClick={onShop}>
      <span>{CTA_LABEL}</span>
      <ArrowUpRight className="synth-cta-icon synth-icon" strokeWidth={ICON_STROKE} />
    </button>
  </div>
);

export default HeroCopy;
