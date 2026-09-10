import React from 'react';
import FadeIn from './FadeIn';
import Magnet from './Magnet';
import FitWidthHeading from './FitWidthHeading';
import { ContactButton } from './Buttons';
import { PORTRAIT_URL } from '../content';
import { scrollToSection } from './scrollToSection';

const NAV = [
  { label: 'About', id: 'about' },
  { label: 'Price', id: 'price' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const handleNavClick = (event, id) => {
  event.preventDefault();
  scrollToSection(id);
};

/**
 * @param {boolean} reserveBackSpace — full-page Back button clearance
 * @param {boolean} compact — gallery embed: no middle black gap (portrait under title)
 */
const HeroSection = ({ reserveBackSpace = false, compact = false }) => (
  <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
    <FadeIn
      as="nav"
      delay={0}
      y={-20}
      className={
        reserveBackSpace
          ? 'relative z-30 flex justify-between px-6 pt-16 md:px-10 md:pt-20'
          : compact
            ? 'relative z-30 flex justify-between px-6 pt-5 md:px-10 md:pt-6'
            : 'relative z-30 flex justify-between px-6 pt-6 md:px-10 md:pt-8'
      }
      aria-label="Page sections"
    >
      {NAV.map(({ label, id }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(event) => handleNavClick(event, id)}
          className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
        >
          {label}
        </a>
      ))}
    </FadeIn>

    <div
      className={
        compact
          ? 'relative z-20 mt-2 w-full overflow-hidden px-0'
          : 'relative z-20 mt-6 w-full overflow-hidden px-0 sm:mt-4 md:-mt-5'
      }
    >
      <FadeIn delay={0.15} y={40} className="w-full">
        <FitWidthHeading>Hi, i&apos;m Kamrul</FitWidthHeading>
      </FadeIn>
    </div>

    <FadeIn
      delay={0.6}
      y={30}
      className={
        compact
          ? 'pointer-events-none absolute left-1/2 top-[15%] z-10 w-[min(560px,62%)] -translate-x-1/2'
          : 'pointer-events-none absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:pointer-events-auto sm:top-auto sm:bottom-0 sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]'
      }
    >
      <Magnet
        padding={compact ? 0 : 150}
        strength={compact ? 0 : 3}
        activeTransition="transform 0.3s ease-out"
        inactiveTransition="transform 0.6s ease-in-out"
        className="pointer-events-auto"
      >
        <img
          src={PORTRAIT_URL}
          alt="Kamrul 3D portrait"
          className="h-auto w-full select-none object-contain object-top"
          draggable={false}
        />
      </Magnet>
    </FadeIn>

    <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
      <FadeIn delay={0.35} y={20}>
        <p
          className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          a 3d creator driven by crafting striking and unforgettable projects
        </p>
      </FadeIn>
      <FadeIn delay={0.5} y={20}>
        <ContactButton />
      </FadeIn>
    </div>
  </section>
);

export default HeroSection;
