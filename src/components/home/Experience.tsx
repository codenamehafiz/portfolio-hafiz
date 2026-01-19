'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const experiences = [
  {
    period: '2020 — Present',
    role: 'Senior Full Stack Developer',
    company: 'Tech Solutions Inc.',
    companyUrl: 'https://example.com',
    description: 'Building and maintaining scalable web applications using modern technologies. Led migration of legacy systems to cloud-native architecture.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Azure', 'C#', 'MongoDB', 'Kubernetes'],
    highlights: [
      'Migrated legacy monolith to microservices architecture, improving performance by 40%',
      'Implemented CI/CD pipelines reducing deployment time from hours to minutes',
      'Mentored junior developers and conducted code reviews',
    ],
  },
  {
    period: '2018 — 2020',
    role: 'Full Stack Developer',
    company: 'Digital Agency Co.',
    companyUrl: 'https://example.com',
    description: 'Developed custom web and mobile applications for diverse clients across multiple industries.',
    technologies: ['React', 'Angular', 'Ionic', 'PHP', 'CodeIgniter', 'MySQL'],
    highlights: [
      'Delivered 15+ client projects on time and within budget',
      'Built responsive mobile applications serving 100k+ users',
      'Integrated third-party APIs and payment gateways',
    ],
  },
  {
    period: '2015 — 2018',
    role: 'Frontend Developer',
    company: 'Startup Ventures',
    companyUrl: 'https://example.com',
    description: 'Focused on creating pixel-perfect, responsive user interfaces and improving user experience.',
    technologies: ['JavaScript', 'jQuery', 'Bootstrap', 'HTML5', 'CSS3', 'Figma'],
    highlights: [
      'Redesigned company website increasing conversion rate by 25%',
      'Implemented UI component library used across multiple projects',
      'Collaborated with designers to ensure design consistency',
    ],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="section-padding relative bg-white/50 dark:bg-accent-900/20">
      <div className="container-custom max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-ink dark:text-primary-50"
          >
            Experience
          </motion.h2>

          {/* Experience Timeline */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group relative"
              >
                {/* Timeline Line (not on last item) */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-0 top-12 bottom-0 w-px bg-primary-200 dark:bg-accent-800" />
                )}

                <div className="space-y-4">
                  {/* Period */}
                  <p className="text-sm font-medium text-ink-muted dark:text-primary-400 uppercase tracking-wide">
                    {exp.period}
                  </p>

                  {/* Role & Company */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-ink dark:text-primary-50 mb-1">
                      {exp.role}
                    </h3>
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-ink-medium dark:text-primary-200 hover:text-ink dark:hover:text-primary-100 transition-colors inline-flex items-center gap-2 group/link"
                    >
                      {exp.company}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-base text-ink-soft dark:text-primary-300 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="space-y-2 text-sm text-ink-soft dark:text-primary-300">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-accent-500 dark:text-accent-400 mt-1">▹</span>
                          <span>{highlight}</span>
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
