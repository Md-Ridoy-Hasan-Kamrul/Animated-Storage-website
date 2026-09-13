import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  STATS,
  STATS_WRAP_CLASS,
  STAT_COL_CLASS,
  STAT_LABEL_CLASS,
  STAT_VALUE_CLASS,
} from '../constants';
import { statsMotion } from '../utils/motionPresets';
import StatIcon from './StatIcons';

const BottomStats = memo(() => (
  <motion.div id="consultation" className={STATS_WRAP_CLASS} {...statsMotion}>
    {STATS.map((stat) => (
      <div key={stat.id} className={STAT_COL_CLASS}>
        <StatIcon type={stat.icon} />
        <p className={STAT_VALUE_CLASS}>{stat.value}</p>
        <p className={STAT_LABEL_CLASS}>{stat.label}</p>
      </div>
    ))}
  </motion.div>
));

BottomStats.displayName = 'BottomStats';

export default BottomStats;
