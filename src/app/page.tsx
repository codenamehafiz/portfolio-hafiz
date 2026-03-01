'use client';

import { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationProvider, useNavigation } from '@/context/NavigationContext';
import Navbar from '@/components/navigation/Navbar';
import CopyrightNotice from '@/components/navigation/CopyrightNotice';
import Hero from '@/components/home/Hero';
import AboutPage from '@/components/pages/AboutPage';
import ProjectsListing from '@/components/pages/ProjectsListing';
import ContactPage from '@/components/pages/ContactPage';
import { BackgroundBeams } from '@/components/ui/beams';

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%' }),
};

const slideTransition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
};

function PageContent() {
  const { currentPage, direction, isInitialLoad, setSlideComplete } = useNavigation();
  const [layoutPage, setLayoutPage] = useState(currentPage);

  const handleSlideComplete = useCallback(() => {
    setSlideComplete(true);
  }, [setSlideComplete]);

  // Reset scroll position when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const scrollableContainer = document.querySelector('.overflow-y-auto');
    if (scrollableContainer) {
      scrollableContainer.scrollTo(0, 0);
    }
  }, [currentPage]);

  return (
    <div className={`relative flex flex-col ${layoutPage === 'home' ? 'h-screen' : 'min-h-screen'}`}>
      <AnimatePresence>
        {currentPage === 'home' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            <BackgroundBeams className="opacity-80 dark:opacity-80 transition-opacity duration-1000" />
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
      <div className="relative w-full flex-1 overflow-hidden overflow-y-auto z-10">
        <AnimatePresence mode="wait" custom={direction} onExitComplete={() => setLayoutPage(currentPage)}>
          {currentPage === 'home' && (
            <motion.div
              key="home"
              custom={direction}
              variants={slideVariants}
              initial={isInitialLoad ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={slideTransition}
              onAnimationComplete={(def) => { if (def === 'center') handleSlideComplete(); }}
              className="w-full min-h-full flex flex-col"
            >
              <Hero />
            </motion.div>
          )}
          {currentPage === 'about' && (
            <motion.div
              key="about"
              custom={direction}
              variants={slideVariants}
              initial={isInitialLoad ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={slideTransition}
              onAnimationComplete={(def) => { if (def === 'center') handleSlideComplete(); }}
              className="w-full"
            >
              <AboutPage />
            </motion.div>
          )}
          {currentPage === 'projects' && (
            <motion.div
              key="projects"
              custom={direction}
              variants={slideVariants}
              initial={isInitialLoad ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={slideTransition}
              onAnimationComplete={(def) => { if (def === 'center') handleSlideComplete(); }}
              className="w-full"
            >
              <ProjectsListing />
            </motion.div>
          )}
          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              custom={direction}
              variants={slideVariants}
              initial={isInitialLoad ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={slideTransition}
              onAnimationComplete={(def) => { if (def === 'center') handleSlideComplete(); }}
              className="w-full"
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <CopyrightNotice />
    </div>
  );
}

export default function Home() {
  return (
    <NavigationProvider>
      <PageContent />
    </NavigationProvider>
  );
}
