import React from 'react';
import { JOURNAL_ENTRIES } from '../content';
import SectionHeader from './SectionHeader';

const JournalSection = () => (
  <section id="resume" className="pc-bg py-16 md:py-24">
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      <SectionHeader
        eyebrow="Journal"
        titleBefore="Recent"
        titleItalic="thoughts"
        subtext="Notes on craft, process, and the systems behind the work."
        ctaLabel="View all"
        ctaHref="#resume"
      />
      <ul className="flex flex-col gap-4">
        {JOURNAL_ENTRIES.map((entry) => (
          <li key={entry.id}>
            <a
              href="#resume"
              className="flex flex-col items-stretch gap-4 rounded-[40px] border border-[hsl(var(--stroke))] bg-[hsl(var(--surface)/0.3)] p-4 transition-colors hover:bg-[hsl(var(--surface))] sm:flex-row sm:items-center sm:gap-6 sm:rounded-full"
            >
              <img
                src={entry.image}
                alt=""
                className="h-20 w-full shrink-0 rounded-[28px] object-cover sm:h-16 sm:w-16 sm:rounded-full"
                loading="lazy"
              />
              <span className="pc-text min-w-0 flex-1 text-base font-medium md:text-lg">
                {entry.title}
              </span>
              <span className="pc-muted flex shrink-0 items-center gap-4 px-1 text-xs sm:px-4 sm:text-sm">
                <span>{entry.readTime}</span>
                <span aria-hidden>·</span>
                <span>{entry.date}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default JournalSection;
