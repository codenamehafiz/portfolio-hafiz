'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import About from '@/components/home/About';
import Experience from '@/components/home/Experience';
import Skills from '@/components/home/Skills';
import SquigglyDivider from '@/components/ui/SquigglyDivider';
import WorkflowBento from '@/components/ui/WorkflowBento';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useNavigation } from '@/context/NavigationContext';

type AboutTab = 'experience' | 'skills';

export default function AboutPage() {
  const { slideComplete } = useNavigation();
  const [activeTab, setActiveTab] = useState<AboutTab>('experience');

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

      <SquigglyDivider />

      {/* Tabs — Experience / Skills */}
      <div className="container-custom max-w-4xl pt-8">
        <div role="tablist" aria-label="About sections" className="flex gap-2 border-b border-primary-200 dark:border-primary-800 mb-2">
          {(['experience', 'skills'] as AboutTab[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-3 text-sm md:text-base font-semibold capitalize transition-colors ${
                  isActive
                    ? 'text-ink dark:text-primary-50'
                    : 'text-ink-soft/60 dark:text-primary-300/60 hover:text-ink dark:hover:text-primary-100'
                }`}
              >
                {tab}
                <span
                  className={`absolute left-2 right-2 -bottom-px h-[3px] bg-[#F7C948] rounded-full transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
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

      <ScrollToTop />
    </div>
  );
}
