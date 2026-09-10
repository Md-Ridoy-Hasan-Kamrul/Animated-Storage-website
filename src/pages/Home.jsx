import React, { memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import HomeContent from '../components/home/HomeContent';

const Home = memo(() => {
  useSEO({
    title: 'Kmotion — Free Animated Templates',
    description:
      'Browse free animated website templates and copy full prompts on Kmotion.',
    keywords: ['kmotion', 'templates', 'landing page', 'animation', 'framer motion'],
  });

  return <HomeContent />;
});

Home.displayName = 'Home';

export default Home;
