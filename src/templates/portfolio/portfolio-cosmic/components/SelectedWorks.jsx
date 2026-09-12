import React from 'react';
import { PROJECTS } from '../content';
import { bentoColSpan } from '../utils/cycleIndex';
import SectionHeader from './SectionHeader';

const COL_CLASS = {
  5: 'md:col-span-5',
  7: 'md:col-span-7',
};

const ProjectCard = ({ project }) => (
  <a
    href="#work"
    className={`group relative block overflow-hidden rounded-3xl border border-[hsl(var(--stroke))] bg-[hsl(var(--surface))] ${project.aspect}`}
  >
    <img
      src={project.image}
      alt={project.title}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="pc-halftone pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" />
    <div className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--bg)/0.7)] opacity-0 backdrop-blur-lg transition-opacity duration-300 group-hover:opacity-100">
      <span className="relative inline-flex rounded-full p-[1.5px]">
        <span className="accent-gradient-border absolute inset-0 rounded-full" aria-hidden />
        <span className="relative rounded-full bg-white px-5 py-2 text-sm text-black">
          View — <span className="pc-font-display italic">{project.title}</span>
        </span>
      </span>
    </div>
  </a>
);

const SelectedWorks = () => (
  <section id="work" className="pc-bg py-12 md:py-16">
    <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
      <SectionHeader
        eyebrow="Selected Work"
        titleBefore="Featured"
        titleItalic="projects"
        subtext="A selection of projects I've worked on, from concept to launch."
        ctaLabel="View all work"
        ctaHref="#work"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
        {PROJECTS.map((project, index) => (
          <div key={project.id} className={COL_CLASS[bentoColSpan(index)]}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SelectedWorks;
