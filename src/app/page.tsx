'use client';

import { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/navigation/Navbar';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Experience from '@/components/home/Experience';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Skills from '@/components/home/Skills';
import Contact from '@/components/home/Contact';

// Create context for page navigation
const PageContext = createContext<{
  currentPage: 'hero' | 'main';
  navigateToMain: () => void;
  navigateToHero: () => void;
}>({
  currentPage: 'hero',
  navigateToMain: () => {},
  navigateToHero: () => {},
});

export const usePageNavigation = () => useContext(PageContext);

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'hero' | 'main'>('hero');

  const navigateToMain = () => setCurrentPage('main');
  const navigateToHero = () => setCurrentPage('hero');

  return (
    <PageContext.Provider value={{ currentPage, navigateToMain, navigateToHero }}>
      <Navbar />
      <div className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {currentPage === 'hero' ? (
            <motion.div
              key="hero"
              initial={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="w-full"
            >
              <Hero />
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="w-full relative"
            >
              <About />
              <Experience />
              <FeaturedProjects />
              <Skills />
              <Contact />

              {/* Copyright Notice */}
              <div className="absolute bottom-4 right-4 text-right z-40">
                <p className="text-xs text-ink-medium dark:text-primary-300">
                  &copy; 2025 Hafiz Idris. All rights reserved.
                </p>
                <p className="text-xs text-ink-muted dark:text-primary-400 mt-1">
                  Built with Next.js, TypeScript & Tailwind CSS
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageContext.Provider>
  );
}
