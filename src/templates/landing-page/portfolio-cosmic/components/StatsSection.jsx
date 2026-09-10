import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../content';
import { SECTION_MOTION, STATS_MOTION } from '../constants';

const StatsSection = () => (
  <section className="pc-bg py-16 md:py-24">
    <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 md:grid-cols-3 md:gap-8 md:px-10 lg:px-16">
      {STATS.map((stat, index) => (
        <motion.div
          key={stat.id}
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: STATS_MOTION.duration,
            delay: index * STATS_MOTION.stagger,
            ease: SECTION_MOTION.ease,
          }}
          viewport={{ once: true, margin: STATS_MOTION.viewportMargin }}
        >
          <p className="pc-font-display pc-text text-5xl italic md:text-6xl">{stat.value}</p>
          <p className="pc-muted mt-2 text-xs uppercase tracking-[0.25em]">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default StatsSection;
