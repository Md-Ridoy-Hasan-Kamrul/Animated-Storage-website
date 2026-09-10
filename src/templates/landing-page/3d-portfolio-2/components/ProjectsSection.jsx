import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiveProjectButton } from './Buttons';
import { PROJECTS } from '../content';
import { PROJECT_IMAGE_HEIGHTS } from '../constants';
import {
  getProjectTargetScale,
  getProjectStackMargin,
} from '../utils/projectStack';

/**
 * Sticky stack layer: pins at top:0 / 100dvh; next card slides over previous.
 */
const ProjectCard = ({ project, index, total, progress }) => {
  const targetScale = getProjectTargetScale(index, total);
  const start = index * (1 / total);
  const scale = useTransform(progress, [start, 1], [1, targetScale]);

  return (
    <div
      className="sticky top-0 flex h-[100dvh] w-full items-start justify-center pt-10 md:pt-16"
      style={{ zIndex: index + 1 }}
    >
      <motion.article
        style={{
          scale,
          marginTop: getProjectStackMargin(index),
          transformOrigin: 'top center',
        }}
        className="flex w-full max-w-6xl flex-col rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4 md:mb-6">
          <div className="flex min-w-0 flex-wrap items-end gap-3 md:gap-8">
            <span
              className="shrink-0 font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {project.number}
            </span>
            <div className="pb-1 md:pb-4">
              <p className="text-xs uppercase tracking-widest text-[#D7E2EA]/70 sm:text-sm">
                {project.category}
              </p>
              <h3 className="text-lg font-medium uppercase text-[#D7E2EA] sm:text-xl md:text-3xl">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton className="mb-1 md:mb-2" />
        </div>

        <div className="flex gap-3 md:gap-4">
          <div className="flex w-[40%] flex-col gap-3 md:gap-4">
            <img
              src={project.images[0]}
              alt=""
              className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: PROJECT_IMAGE_HEIGHTS.leftTop }}
              loading="lazy"
            />
            <img
              src={project.images[1]}
              alt=""
              className="w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: PROJECT_IMAGE_HEIGHTS.leftBottom }}
              loading="lazy"
            />
          </div>
          <div className="w-[60%]">
            <img
              src={project.images[2]}
              alt=""
              className="h-full min-h-[260px] w-full rounded-[40px] object-cover sm:min-h-[320px] sm:rounded-[50px] md:rounded-[60px]"
              loading="lazy"
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <h2
        className="hero-heading relative z-0 mb-6 text-center font-black uppercase leading-none tracking-tight sm:mb-10 md:mb-14"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Project
      </h2>

      <div className="relative">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <div className="h-[20vh]" aria-hidden />
    </section>
  );
};

export default ProjectsSection;
