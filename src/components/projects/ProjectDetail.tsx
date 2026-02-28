'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiExternalLink, HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import { FaGithub } from 'react-icons/fa';
import { Project } from '@/data/projects';

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const extraImages = project.images.slice(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const imageRef = useRef<HTMLImageElement>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev! + 1) % extraImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === 0 ? extraImages.length - 1 : prev! - 1));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, extraImages.length, closeLightbox]);
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <HiArrowLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </Link>
        </motion.div>

        {/* About This Project — image left, details right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="grid lg:grid-cols-[1fr_3fr] gap-8 items-start">
            {/* Main Image */}
            <div className="card overflow-hidden">
              <div className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-5">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base sm:text-lg">
                {project.longDescription}
              </p>

              {/* Action Buttons */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-center"
                    >
                      <HiExternalLink className="w-5 h-5 mr-2 inline" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-center"
                    >
                      <FaGithub className="w-5 h-5 mr-2 inline" />
                      View Code
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Demo Video (if available) */}
        {project.demoVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Demo Video
            </h2>
            <div className="card overflow-hidden">
              <div className="relative aspect-video">
                <iframe
                  src={project.demoVideo}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Project Details Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-5 sm:p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
              Challenge
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.challenge}
            </p>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-5 sm:p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
              Solution
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.solution}
            </p>
          </motion.div>

          {/* Outcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-5 sm:p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
              Outcome
            </h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {project.outcome}
            </p>
          </motion.div>
        </div>

        {/* Additional Images Gallery */}
        {extraImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mb-12 max-w-3xl mx-auto"
          >
            {/* Main Preview with inside full-height arrows */}
            <div className="relative group">
              <div className="flex-1 min-w-0">
                <motion.div
                  className="relative card overflow-hidden cursor-zoom-in"
                  onClick={() => setLightboxIndex(activeIndex)}
                  animate={{ height: containerHeight }}
                  transition={{ duration: 0, ease: 'easeInOut' }}
                  style={containerHeight ? undefined : { height: 'auto' }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Image
                        ref={imageRef}
                        src={extraImages[activeIndex]}
                        alt={`${project.title} - Image ${activeIndex + 2}`}
                        width={800}
                        height={600}
                        className="w-full h-auto"
                        onLoad={(e) => {
                          const img = e.currentTarget;
                          setContainerHeight(img.offsetHeight);
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Left Arrow (Full Height Overlay) */}
                  {extraImages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex((prev) => (prev === 0 ? extraImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-0 top-0 bottom-0 w-16 md:w-32 flex items-center justify-start pl-2 md:pl-6 group/btn z-10 cursor-pointer"
                      aria-label="Previous image"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <HiChevronLeft className="relative w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover/btn:-translate-x-1 group-hover/btn:scale-110" />
                    </button>
                  )}

                  {/* Right Arrow (Full Height Overlay) */}
                  {extraImages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex((prev) => (prev + 1) % extraImages.length);
                      }}
                      className="absolute right-0 top-0 bottom-0 w-16 md:w-32 flex items-center justify-end pr-2 md:pr-6 group/btn z-10 cursor-pointer"
                      aria-label="Next image"
                    >
                      <div className="absolute inset-0 bg-gradient-to-l from-white/40 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <HiChevronRight className="relative w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover/btn:translate-x-1 group-hover/btn:scale-110" />
                    </button>
                  )}
                </motion.div>

                {/* Thumbnail Strip — aligned with image */}
                {extraImages.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {extraImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${index === activeIndex
                          ? 'border-primary-600 dark:border-primary-400 ring-2 ring-primary-600/30 dark:ring-primary-400/30'
                          : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close lightbox"
              >
                <HiX className="w-6 h-6" />
              </button>

              {/* Nav Arrows */}
              {extraImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === 0 ? extraImages.length - 1 : prev! - 1)); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Previous image"
                  >
                    <HiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % extraImages.length); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Next image"
                  >
                    <HiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Lightbox Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-5xl max-h-[85vh] w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={extraImages[lightboxIndex]}
                    alt={`${project.title} - Image ${lightboxIndex + 2}`}
                    width={1400}
                    height={1000}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                {lightboxIndex + 1} / {extraImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technologies Used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6 sm:p-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Technologies Used
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
