'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HiSearch, HiX, HiArrowRight } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { projects, technologies } from '@/data/projects';
import type { Project } from '@/data/projects';
import ScrollToTop from '@/components/ui/ScrollToTop';
import ProjectTechStack from '@/components/projects/ProjectTechStack';
import { useNavigation } from '@/context/NavigationContext';

// #4 — cursor spotlight card extracted so hooks can be called per card
function ProjectCard({ project, index, slideComplete }: {
  project: Project;
  index: number;
  slideComplete: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  // #4 — radial gradient that follows the cursor
  const spotlight = useMotionTemplate`radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(120, 119, 198, 0.08), transparent 80%)`;

  return (
    <motion.div
      layout
      className="relative z-0 hover:z-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      // #8 — skip delays/durations when reduced motion preferred
      transition={{
        duration: prefersReducedMotion ? 0 : 0.2,
        delay: slideComplete && !prefersReducedMotion ? 0.06 * index : 0,
      }}
      onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
    >
      <div className="card card-hover h-full group relative">
        {/* #4 — spotlight overlay */}
        {!prefersReducedMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: spotlight }}
          />
        )}

        {/* Image */}
        <Link href={`/projects/${project.id}`} className="block">
          <div className="relative h-48 overflow-hidden cursor-pointer">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-medium text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                View Details
              </span>
            </div>
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-[#F7C948] text-ink text-xs font-bold rounded-full shadow-lg">
                  Featured
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-6 space-y-4 relative z-20">
          <div>
            <div className="flex items-start justify-between mb-2">
              <Link href={`/projects/${project.id}`}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer">
                  {project.title}
                </h3>
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium bg-[#F7C948]/15 text-[#a16207] dark:text-[#F7C948] rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3">
              {project.description}
            </p>
          </div>

          <ProjectTechStack
            technologies={project.technologies}
            className="gap-2"
            itemClassName="px-2 py-1 text-xs rounded"
            maxItems={3}
          />

          <div className="flex items-center space-x-2 pt-4 border-t border-slate-200 dark:border-slate-700">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-secondary text-center py-2"
                aria-label="View GitHub repository"
              >
                <FaGithub className="w-4 h-4 inline mr-2" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 btn-primary text-center py-2"
                aria-label="View live demo"
              >
                <HiExternalLink className="w-4 h-4 inline mr-2" />
                Demo
              </a>
            )}
            <Link
              href={`/projects/${project.id}`}
              className="flex-1 btn-secondary text-center py-2 inline-flex items-center justify-center gap-1 group/details"
            >
              Details
              <HiArrowRight className="w-4 h-4 transition-transform group-hover/details:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsListing() {
  const { slideComplete } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTech =
        selectedTechs.length === 0 ||
        selectedTechs.every((tech) => project.technologies.includes(tech));

      return matchesSearch && matchesTech;
    });
  }, [searchQuery, selectedTechs]);

  const projectCountByTech = useMemo(() => {
    const counts = new Map<string, number>();
    for (const tech of technologies) {
      counts.set(tech, projects.filter((p) => p.technologies.includes(tech)).length);
    }
    return counts;
  }, []);

  const toggleTech = useCallback((tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  }, []);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTechs([]);
  };

  return (
    <div className="pt-12 md:pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={slideComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-ink dark:text-primary-50">
            All{' '}
            <span className="relative inline-block">
              Projects
              <motion.svg
                aria-hidden
                className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-3 md:h-4 text-[#F7C948] overflow-visible"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                fill="none"
                initial={{ opacity: 0 }}
                animate={slideComplete ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.5 }}
              >
                <motion.path
                  d="M2 7 Q 25 1 50 7 T 100 7 T 150 7 T 198 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={slideComplete ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore my complete portfolio of projects showcasing various technologies and solutions
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={slideComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <HiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 z-10 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by name, description, or tag..."
              className="input-field pl-12 pr-12 relative z-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 z-10"
              >
                <HiX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Technology Filters */}
          <div className="card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Filter by Technology
              </h3>
              {(selectedTechs.length > 0 || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline text-left sm:text-right"
                >
                  Clear all filters
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => {
                const isSelected = selectedTechs.includes(tech);

                return (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${isSelected
                      ? 'bg-[#F7C948] text-ink shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                  >
                    {tech}
                    <span className="ml-1 sm:ml-2 text-xs opacity-75">({projectCountByTech.get(tech) ?? 0})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filters Summary */}
          {(selectedTechs.length > 0 || searchQuery) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
            >
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-slate-600 dark:text-slate-400">
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={slideComplete ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* #1 + #2 — layout animations + re-stagger on filter change */}
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  slideComplete={slideComplete}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="card p-8 sm:p-12 max-w-md mx-auto">
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mb-4">
                No projects found matching your criteria
              </p>
              <button onClick={clearFilters} className="btn-primary w-full sm:w-auto">
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <ScrollToTop />
    </div>
  );
}
