'use client';

import { motion } from 'framer-motion';
import { HiChevronUp } from 'react-icons/hi';

export default function ScrollToTop() {
  const handleScrollToTop = () => {
    // Try the overflow container first (if it's actually scrolling)
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer && scrollContainer.scrollTop > 0) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // Otherwise scroll the window/document
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-center py-8">
      <motion.button
        onClick={handleScrollToTop}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.9 }}
        className="group flex flex-col items-center gap-1 text-ink-soft/50 dark:text-primary-400/50 hover:text-ink dark:hover:text-primary-100 transition-colors"
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiChevronUp className="w-5 h-5" />
        </motion.div>
        <span className="text-xs uppercase tracking-widest">Back to top</span>
      </motion.button>
    </div>
  );
}
