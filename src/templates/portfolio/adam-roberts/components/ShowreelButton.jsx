import React from 'react';
import { Play } from 'lucide-react';
import { PLAY_ICON_SIZE } from '../constants';

const ShowreelButton = () => (
  <a
    href="#"
    className="flex items-center gap-3 self-start border border-white/30 bg-white/5 px-6 py-3 backdrop-blur-sm transition-colors hover:bg-white/10"
  >
    <Play size={PLAY_ICON_SIZE} fill="white" />
    <span className="text-sm tracking-wider">PLAY SHOWREEL</span>
  </a>
);

export default ShowreelButton;
