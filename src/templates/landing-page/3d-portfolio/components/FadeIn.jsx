import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1];

const FadeIn = ({
  as = 'div',
  children,
  className = '',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  ...rest
}) => {
  const Component = useMemo(() => {
    try {
      return motion.create(as);
    } catch {
      return motion.div;
    }
  }, [as]);

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: EASE }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default FadeIn;
