'use client';

import { motion } from 'framer-motion';
import About from '@/components/home/About';
import Experience from '@/components/home/Experience';
import Skills from '@/components/home/Skills';
import SquigglyDivider from '@/components/ui/SquigglyDivider';
import TypingTerminal from '@/components/ui/TypingTerminal';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useNavigation } from '@/context/NavigationContext';

export default function AboutPage() {
  const { slideComplete } = useNavigation();

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
            About <span className="heading-gradient">Me</span>
          </motion.h1>
        </div>
      </div>

      <About />

      <TypingTerminal />

      <Experience />

      <SquigglyDivider />

      <Skills />

      <ScrollToTop />
    </div>
  );
}
