'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, type ComponentType } from 'react';
import { createPortal } from 'react-dom';
import { HiOutlineBriefcase, HiOutlineCode, HiOutlinePresentationChartBar, HiX } from 'react-icons/hi';
import About from '@/components/home/About';
import Experience from '@/components/home/Experience';
import Skills from '@/components/home/Skills';
import Presentation from '@/components/home/Presentation';
import SquigglyDivider from '@/components/ui/SquigglyDivider';
import WorkflowBento from '@/components/ui/WorkflowBento';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useNavigation } from '@/context/NavigationContext';

type AboutTab = 'experience' | 'skills';

const aboutTabs: { id: AboutTab; label: string; subtitle: string; Icon: ComponentType<{ className?: string }> }[] = [
  { id: 'experience', label: 'Experience', subtitle: 'My professional journey', Icon: HiOutlineBriefcase },
  { id: 'skills', label: 'Skills', subtitle: 'Tools & technologies', Icon: HiOutlineCode },
];

export default function AboutPage() {
  const { slideComplete } = useNavigation();
  const [activeTab, setActiveTab] = useState<AboutTab>('experience');
  const [showPresentation, setShowPresentation] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!showPresentation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowPresentation(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [showPresentation]);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="pt-12 md:pt-24 pb-1">
        <div className="container-custom max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={slideComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="text-sm uppercase tracking-widest text-ink-muted dark:text-primary-400 mb-2"
          >
            Get to know me
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={slideComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="text-4xl md:text-5xl font-bold text-ink dark:text-primary-50"
          >
            About{' '}
            <span className="relative inline-block">
              Me
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
          </motion.h1>
        </div>
      </div>

      <About />

      <WorkflowBento />

      {/* My Process CTA — opens presentation modal */}
      <div className="container-custom max-w-4xl pt-2 flex justify-center">
        <button
          type="button"
          onClick={() => setShowPresentation(true)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#F7C948] text-ink font-semibold shadow-sm hover:bg-[#e3b73e] transition-colors"
        >
          <HiOutlinePresentationChartBar className="w-5 h-5" />
          My Process
        </button>
      </div>

      <SquigglyDivider />

      {/* Tabs — Experience / Skills (icon card style) */}
      <div className="container-custom max-w-4xl pt-8">
        <div
          role="tablist"
          aria-label="About sections"
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {aboutTabs.map(({ id, label, subtitle, Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left border-2 transition-all ${
                  isActive
                    ? 'bg-white dark:bg-primary-900/40 border-[#F7C948] shadow-sm'
                    : 'bg-primary-100/40 dark:bg-primary-800/30 border-transparent hover:bg-primary-100/70 dark:hover:bg-primary-800/50'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-[#F7C948]/20 text-[#F7C948]'
                      : 'bg-primary-200/60 dark:bg-primary-700/50 text-ink-soft dark:text-primary-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm md:text-base font-semibold transition-colors ${
                      isActive ? 'text-[#F7C948]' : 'text-ink dark:text-primary-100'
                    }`}
                  >
                    {label}
                  </div>
                  <div className="text-xs md:text-sm text-ink-soft dark:text-primary-300">
                    {subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className={activeTab === 'experience' ? 'block' : 'hidden'}>
        <Experience />
      </div>
      <div className={activeTab === 'skills' ? 'block' : 'hidden'}>
        <Skills />
      </div>

      {/* Presentation modal overlay — portaled to document.body so it escapes
          parent stacking contexts (page-slide motion.div uses transform,
          which would otherwise trap the modal below the navbar). */}
      {typeof window !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {showPresentation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
                onClick={() => setShowPresentation(false)}
              >
                <motion.div
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full max-w-7xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setShowPresentation(false)}
                    aria-label="Close presentation"
                    className="absolute -top-12 right-0 z-10 inline-flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium"
                  >
                    <HiX className="w-5 h-5" />
                    Close
                  </button>
                  <Presentation />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}

      <ScrollToTop />
    </div>
  );
}
