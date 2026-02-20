'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiExternalLink, HiArrowRight } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { projects } from '@/data/projects';

export default function FeaturedProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-ink dark:text-primary-50"
          >
            Projects
          </motion.h2>

          {/* Projects List */}
          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Image */}
                  <Link href="/projects" className={`relative aspect-video rounded-lg overflow-hidden bg-primary-200 dark:bg-accent-800 block cursor-pointer ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </Link>

                  {/* Content */}
                  <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    {/* Project Title */}
                    <div>
                      <Link href="/projects" className="group/link inline-flex items-center gap-2">
                        <h3 className="text-2xl md:text-3xl font-bold text-ink dark:text-primary-50 group-hover/link:text-ink-medium dark:group-hover/link:text-primary-200 transition-colors">
                          {project.title}
                        </h3>
                      </Link>
                    </div>

                    {/* Description */}
                    <p className="text-base text-ink-soft dark:text-primary-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-accent-900/40 text-ink-soft dark:text-primary-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-medium dark:text-primary-300 hover:text-ink dark:hover:text-primary-100 transition-colors inline-flex items-center gap-2"
                          aria-label="View source code"
                        >
                          <FaGithub className="w-5 h-5" />
                          <span className="text-sm font-medium">Source</span>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-medium dark:text-primary-300 hover:text-ink dark:hover:text-primary-100 transition-colors inline-flex items-center gap-2"
                          aria-label="View live demo"
                        >
                          <HiExternalLink className="w-5 h-5" />
                          <span className="text-sm font-medium">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-ink-medium dark:text-primary-300 hover:text-ink dark:hover:text-primary-100 transition-colors text-lg font-medium group/all"
            >
              View All Projects
              <HiArrowRight className="w-5 h-5 transition-transform group-hover/all:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
