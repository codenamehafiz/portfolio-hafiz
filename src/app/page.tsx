'use client';

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationProvider, useNavigation } from '@/context/NavigationContext';
import Navbar from '@/components/navigation/Navbar';
import CopyrightNotice from '@/components/navigation/CopyrightNotice';
import Hero from '@/components/home/Hero';
import AboutPage from '@/components/pages/AboutPage';
import ProjectsListing from '@/components/pages/ProjectsListing';
import ContactPage from '@/components/pages/ContactPage';

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

  return (
    <div className={`flex flex-col ${layoutPage === 'home' ? 'h-screen' : 'min-h-screen'}`}>
      <Navbar />
      <div className="relative w-full flex-1 overflow-hidden overflow-y-auto">
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
