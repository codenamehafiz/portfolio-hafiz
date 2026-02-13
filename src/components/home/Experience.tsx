'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import Image from 'next/image';
import NumberFlow from '@number-flow/react';

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      const timeout = setTimeout(() => setHasAnimated(true), delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [inView, hasAnimated, delay]);

  return (
    <span ref={ref}>
      <NumberFlow
        value={hasAnimated ? value : 0}
        transformTiming={{ duration: 1200, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        spinTiming={{ duration: 1200, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      />
    </span>
  );
}

const INITIAL_DISPLAY_COUNT = 2;

const experiences = [
  {
    period: 'Jun 2023 — Feb 2026',
    duration: '2 yrs 9 mos',
    role: 'Fullstack Engineer',
    company: 'Okakichi Sdn Bhd',
    logo: '/images/logos/okakichi.png',
    initials: 'OK',
    description: 'Architecting high-performance backend systems and APIs for gaming products.',
    technologies: ['C#', '.NET', 'MongoDB', 'Azure', 'React', 'JavaScript', 'TypeScript', 'Node.js', 'CI/CD'],
    highlights: [
      'Built scalable backend APIs powering live game services',
      'Streamlined CI/CD pipelines for automated builds, testing and deployments',
      'Developed internal tooling and automation scripts to boost team productivity',
      'Co-created monitoring dashboards for player management and game analytics',
    ],
  },
  {
    period: 'Dec 2018 — May 2023',
    duration: '4 yrs 6 mos',
    role: 'Frontend Developer',
    company: 'Cybersolution Technologies Sdn Bhd',
    logo: '/images/logos/cybersolution.png',
    initials: 'CT',
    description: 'Led front-end development on government web applications within a UI/UX team.',
    technologies: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    highlights: [
      'Shipped government web applications across multiple phased rollouts',
      'Built interactive prototypes for user validation before development kickoff',
      'Drove UI/UX decisions across Angular and React codebases',
    ],
  },
  {
    period: 'May 2018 — Nov 2018',
    duration: '7 mos',
    role: 'Web Developer',
    company: 'GarGeon',
    logo: '/images/logos/gargeon.png',
    initials: 'GG',
    description: 'Co-led the build of a web and mobile platform tackling waste industry challenges.',
    technologies: ['PHP', 'CodeIgniter', 'Ionic', 'JavaScript', 'MySQL'],
    highlights: [
      'Owned UI/UX and backend architecture decisions as part of the core team',
      'Delivered a CodeIgniter web app and Ionic mobile app from the ground up',
    ],
  },
  {
    period: 'Sep 2016 — Feb 2018',
    duration: '1 yr 6 mos',
    role: 'Programmer',
    company: 'Zanko Sdn Bhd',
    logo: '/images/logos/zanko.png',
    initials: 'ZK',
    description: 'Full-stack ownership of a government web application, from UI design to server-side logic.',
    technologies: ['PHP', 'CodeIgniter', 'JavaScript', 'HTML5', 'CSS3', 'MySQL'],
    highlights: [
      'Designed the entire application UI from scratch including document templates',
      'Bridged front-end and back-end by building data controllers and API connectors',
      'Translated user requirements into technical solutions using Agile methodology',
    ],
  },
  {
    period: 'Nov 2015 — Aug 2016',
    duration: '10 mos',
    role: 'Frontend Web Developer',
    company: 'Misa Travel Pte Ltd',
    logo: '/images/logos/misatravel.png',
    initials: 'MT',
    description: 'Built the admin dashboard and mobile experience for a global discount app.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Mobile Development'],
    highlights: [
      'Designed and built the Kiasu Perks admin dashboard from scratch',
      'Integrated front-end interfaces with back-end services',
      'Crafted the mobile app landing page and mobile UI',
    ],
  },
];

export default function Experience() {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMore = experiences.length > INITIAL_DISPLAY_COUNT;
  const firstHiddenRef = useRef<HTMLDivElement>(null);
  const lastVisibleRef = useRef<HTMLDivElement>(null);
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-10"
        >
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-3xl md:text-4xl font-bold text-ink dark:text-primary-50"
          >
            Experience
          </motion.h2>

          {/* Experience Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <p className="text-base md:text-lg text-ink-soft dark:text-primary-300 leading-relaxed">
              I&apos;ve been shipping code for over 10 years — starting from front-end, growing into back-end, and now doing it all as a full-stack engineer.
            </p>

            <div className="space-y-1">
              <p className="text-sm font-semibold uppercase tracking-widest text-ink-muted dark:text-primary-400 mb-3">
                Within those 10 years
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  { years: 10, area: 'Web & Software Development' },
                  { years: 8, area: 'Front-end Development & UI/UX' },
                  { years: 4, area: 'Back-end Architecture' },
                  { years: 6, area: 'Product Engineering' },
                  { years: 6, area: 'React Development' },
                  { years: 2, area: 'Cloud Infrastructure' },
                ].map(({ years, area }, i) => (
                  <div key={area} className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-ink dark:text-primary-50 tabular-nums">
                      <AnimatedNumber value={years} delay={i * 0.1} />
                    </span>
                    <span className="text-sm text-ink-soft dark:text-primary-300">years in {area}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Separator */}
          <hr className="border-ink-soft/15 dark:border-primary-300/15" />

          {/* Experience Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div
              className={`absolute left-[7px] top-2 bottom-2 w-[2px] rounded-full transition-all duration-300 ${
                isExpanded
                  ? 'bg-ink-soft/20 dark:bg-primary-300/20'
                  : 'bg-gradient-to-b from-ink-soft/20 via-ink-soft/20 to-transparent dark:from-primary-300/20 dark:via-primary-300/20 dark:to-transparent'
              }`}
            />

            <div>
              {experiences.map((exp, index) => {
                const isHidden = !isExpanded && index >= INITIAL_DISPLAY_COUNT;
                const isFirst = index === 0;
                return (
                <motion.div
                  key={exp.period}
                  ref={
                    index === INITIAL_DISPLAY_COUNT + 1
                      ? firstHiddenRef
                      : index === INITIAL_DISPLAY_COUNT - 1
                        ? lastVisibleRef
                        : undefined
                  }
                  initial={false}
                  animate={{
                    opacity: isHidden ? 0 : 1,
                    height: isHidden ? 0 : 'auto',
                    marginTop: isHidden ? 0 : isFirst ? 0 : 40,
                    paddingTop: isHidden ? 0 : undefined,
                    paddingBottom: isHidden ? 0 : undefined,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: !isHidden && index >= INITIAL_DISPLAY_COUNT ? (index - INITIAL_DISPLAY_COUNT) * 0.1 : 0,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className={`group relative pl-8 md:pl-12 overflow-hidden ${isHidden ? 'pointer-events-none' : ''}`}
                >
                  {/* Timeline Dot */}
                  {index === 0 ? (
                    /* Current/Latest position - pulsing dot */
                    <div className="absolute left-0 top-[2px] w-[16px] h-[16px] flex items-center justify-center">
                      <div className="absolute w-[16px] h-[16px] rounded-full bg-accent-500/30 dark:bg-accent-400/30 animate-ping" />
                      <div className="absolute w-[16px] h-[16px] rounded-full bg-accent-500/20 dark:bg-accent-400/20 animate-pulse" />
                      <div className="relative w-[10px] h-[10px] rounded-full bg-accent-500 dark:bg-accent-400" />
                    </div>
                  ) : (
                    /* Past positions */
                    <div className="absolute left-0 top-[2px] w-[16px] h-[16px] rounded-full border-2 border-ink-soft/40 dark:border-primary-300/40 bg-white dark:bg-ink group-hover:border-accent-500 dark:group-hover:border-accent-400 group-hover:scale-110 transition-all">
                      <div className="absolute inset-[3px] rounded-full bg-ink-soft/40 dark:bg-primary-300/40 group-hover:bg-accent-500 dark:group-hover:bg-accent-400 transition-colors" />
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Period & Duration */}
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium text-ink-muted dark:text-primary-400 uppercase tracking-wide">
                        {exp.period}
                      </p>
                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent-500/10 dark:bg-accent-400/10 text-accent-600 dark:text-accent-400">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <div className="flex items-start gap-3">
                      {/* Company Logo / Initials Fallback */}
                      <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-100 dark:bg-accent-900/40 flex items-center justify-center overflow-hidden">
                        {exp.logo ? (
                          <Image
                            src={exp.logo}
                            alt={exp.company}
                            width={100}
                            height={100}
                            className="object-contain w-full h-full"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <span className={`text-sm font-bold text-ink-soft dark:text-primary-300 ${exp.logo ? 'hidden' : ''}`}>
                          {exp.initials}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-ink dark:text-primary-50 mb-0.5">
                          {exp.role}
                        </h3>
                        <span className="text-base text-ink-medium dark:text-primary-200">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-base text-ink-soft dark:text-primary-300 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-2 text-sm text-ink-soft dark:text-primary-300">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="text-accent-500 dark:text-accent-400 leading-relaxed">▹</span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-accent-900/40 text-ink-soft dark:text-primary-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
              })}
            </div>


            {/* View More Button */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 pl-12"
              >
                <button
                  onClick={() => {
                    const expanding = !isExpanded;
                    setIsExpanded(expanding);
                    if (expanding) {
                      setTimeout(() => {
                        firstHiddenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 450);
                    } else {
                      setTimeout(() => {
                        lastVisibleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 450);
                    }
                  }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft dark:text-primary-300 hover:text-ink dark:hover:text-primary-100 transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <HiChevronUp className="w-4 h-4" />
                      View Less
                    </>
                  ) : (
                    <>
                      <HiChevronDown className="w-4 h-4" />
                      View More ({experiences.length - INITIAL_DISPLAY_COUNT} more)
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </div>

          {/* Download Resume */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center"
          >
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-ink-soft/20 dark:border-primary-300/20 text-ink-soft dark:text-primary-300 hover:text-ink dark:hover:text-primary-100 hover:border-ink-soft/40 dark:hover:border-primary-300/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
