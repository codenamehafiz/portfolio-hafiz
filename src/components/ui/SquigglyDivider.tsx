'use client';

import { motion } from 'framer-motion';

export default function SquigglyDivider() {
  return (
    <div className="container-custom max-w-4xl">
      <div className="flex items-center justify-center gap-3">
        {/* Left line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-12 h-px bg-gradient-to-l from-ink-soft/30 to-transparent dark:from-primary-300/30"
        />

        {/* Code icon */}
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-xs text-ink-soft/40 dark:text-primary-300/40 font-mono"
        >
          {'</>'}
        </motion.span>

        {/* Right line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-12 h-px bg-gradient-to-r from-ink-soft/30 to-transparent dark:from-primary-300/30"
        />
      </div>
    </div>
  );
}
