import React from 'react';

const LeafIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="nm-explore-leaf h-5 w-5 fill-white"
    aria-hidden
  >
    <path d="M12 2C8 6 6 10 6 14c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2-8-6-12z" />
    <path d="M12 8c-1.2 2.4-2 5-2 7a2 2 0 0 0 4 0c0-2-.8-4.6-2-7z" />
    <path d="M12 14v8" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M12 16c-2 .4-3.5 1.2-4.5 2.2" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const ExploreButton = ({ href = '#explore' }) => (
  <a
    href={href}
    className="group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-md border border-[#1a1a1a] bg-[#1a1a1a] px-6 py-3.5 shadow-sm transition-transform duration-300 hover:-translate-y-[0.5px] hover:shadow-[3px_3px_0px_rgba(17,17,17,0.5)] active:translate-y-0 active:shadow-none"
  >
    <span className="nm-explore-panel pointer-events-none absolute inset-0 bg-[#fcfcfc]" />
    <span className="relative z-[1]">
      <LeafIcon />
    </span>
    <span className="relative z-[1] text-[15px] font-medium text-white transition-colors duration-300 group-hover:text-[#111]">
      Explore Now
    </span>
  </a>
);

export default ExploreButton;
