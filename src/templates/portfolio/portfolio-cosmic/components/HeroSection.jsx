import React from 'react';
import HlsBackgroundVideo from './HlsBackgroundVideo';
import Navbar from './Navbar';
import AccentButton from './AccentButton';
import { useRoleCycle } from '../hooks/useRoleCycle';
import { useHeroEntrance } from '../hooks/useHeroEntrance';
import { CONTACT_EMAIL } from '../constants';
import { smoothScrollToId } from '../utils/smoothScrollTo';

const HeroSection = ({ animate = true }) => {
  const { role, roleIndex } = useRoleCycle();
  useHeroEntrance(animate);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <HlsBackgroundVideo />
      <div className="pc-bg pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[hsl(var(--bg))] to-transparent" />

      <Navbar />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-24 pt-28 text-center md:px-10">
        <p className="blur-in pc-muted mb-8 text-xs uppercase tracking-[0.3em]">
          COLLECTION &apos;26
        </p>
        <h1 className="name-reveal pc-font-display pc-text mb-6 text-6xl italic leading-[0.9] tracking-tight md:text-8xl lg:text-9xl">
          Michael Smith
        </h1>
        <p className="blur-in pc-muted mb-4 text-base md:text-lg">
          A{' '}
          <span
            key={roleIndex}
            className="animate-role-fade-in pc-font-display inline-block italic text-[hsl(var(--text))]"
          >
            {role}
          </span>{' '}
          lives in Chicago.
        </p>
        <p className="blur-in pc-muted mb-12 max-w-md text-sm md:text-base">
          Designing seamless digital interactions by focusing on the unique nuances which bring
          systems to life.
        </p>
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          <AccentButton type="button" variant="solid" onClick={() => smoothScrollToId('work')}>
            See Works
          </AccentButton>
          <AccentButton href={`mailto:${CONTACT_EMAIL}`} variant="outline">
            Reach out...
          </AccentButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="pc-muted text-xs uppercase tracking-[0.2em]">Scroll</span>
        <span className="pc-stroke relative h-10 w-px overflow-hidden">
          <span className="animate-scroll-down accent-gradient absolute inset-x-0 top-0 h-1/2" />
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
