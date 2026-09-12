import React from 'react';
import { motion } from 'framer-motion';
import {
  CURATOR_CREDIT,
  FOOTER_DELAY_S,
  FOOTER_DESCRIPTION,
  FOOTER_DURATION_S,
} from '../constants';
import FooterLinks from './FooterLinks';
import LuminaMark from './LuminaMark';
import SocialRow from './SocialRow';

const LiquidFooter = () => (
  <motion.footer
    id="lumina-footer"
    className="liquid-glass mt-32 w-full rounded-3xl p-6 text-white/70 md:mt-64 md:p-10"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: FOOTER_DURATION_S, delay: FOOTER_DELAY_S, ease: 'easeOut' }}
  >
    <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5">
        <div className="flex items-center gap-3 text-white">
          <LuminaMark />
          <span className="text-xl font-medium">LUMINA</span>
        </div>
        <p className="mt-4 max-w-sm text-sm leading-relaxed">{FOOTER_DESCRIPTION}</p>
      </div>
      <FooterLinks />
    </div>

    <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:gap-4">
      <p className="text-[10px] uppercase tracking-widest opacity-50">{CURATOR_CREDIT}</p>
      <SocialRow />
    </div>
  </motion.footer>
);

export default LiquidFooter;
