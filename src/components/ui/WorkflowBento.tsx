'use client';

import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { HiOutlineCode, HiOutlineClipboardList, HiOutlineCloudUpload, HiOutlineDesktopComputer } from 'react-icons/hi';

function KanbanCard() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="relative h-32 w-full bg-primary-50 dark:bg-slate-800/50 rounded-xl overflow-hidden flex items-center p-4 border border-primary-200 dark:border-primary-800/50">
      {/* Kanban columns */}
      <div className="flex gap-2 w-full h-full opacity-60">
        <div className="flex-1 bg-primary-100 dark:bg-slate-700/30 rounded-lg p-2 space-y-2">
          <div className="w-10 h-2 bg-primary-200 dark:bg-slate-600 rounded-full mb-3" />
          <div className="w-full h-8 bg-primary-200/50 dark:bg-slate-600/50 rounded-md" />
        </div>
        <div className="flex-1 bg-primary-100 dark:bg-slate-700/30 rounded-lg p-2 space-y-2">
          <div className="w-12 h-2 bg-primary-200 dark:bg-slate-600 rounded-full mb-3" />
        </div>
        <div className="flex-1 bg-primary-100 dark:bg-slate-700/30 rounded-lg p-2 space-y-2">
          <div className="w-8 h-2 bg-primary-200 dark:bg-slate-600 rounded-full mb-3" />
          <div className="w-full h-8 bg-primary-200/50 dark:bg-slate-600/50 rounded-md" />
          <div className="w-full h-8 bg-primary-200/50 dark:bg-slate-600/50 rounded-md" />
        </div>
      </div>

      {/* Animated Task */}
      <motion.div
        initial={prefersReducedMotion ? { x: '210%' } : { x: '0%' }}
        animate={prefersReducedMotion ? { x: '210%' } : { x: ['0%', '105%', '210%', '210%', '0%'] }}
        transition={prefersReducedMotion ? {} : { duration: 6, ease: 'easeInOut', repeat: Infinity, times: [0, 0.3, 0.6, 0.9, 1] }}
        className="absolute left-6 top-[3.25rem] w-[calc(33%-1.5rem)] h-8 bg-accent-500 rounded-md shadow-lg shadow-accent-500/20"
      />
    </div>
  );
}

function CodeGraph() {
  const prefersReducedMotion = useReducedMotion();
  const cols = 12;
  const rows = 4;
  const blocks = Array.from({ length: cols * rows }).map((_, i) => {
    const isActive = Math.random() > 0.6;
    const isVeryActive = Math.random() > 0.85;
    return { id: i, isActive, isVeryActive };
  });

  return (
    <div className="relative h-32 w-full bg-primary-50 dark:bg-slate-800/50 rounded-xl overflow-hidden flex flex-col justify-center p-4 border border-primary-200 dark:border-primary-800/50">
      <div className="grid grid-cols-12 gap-1.5 w-full">
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            initial={{ opacity: 0.3 }}
            animate={prefersReducedMotion ? { opacity: block.isActive ? 0.8 : 0.2 } : {
              opacity: block.isActive ? [0.4, 0.8, 0.4] : 0.2,
              scale: block.isVeryActive ? [1, 1.05, 1] : 1
            }}
            transition={prefersReducedMotion ? {} : {
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2
            }}
            className={`h-3 rounded-sm ${block.isVeryActive ? 'bg-accent-400' : block.isActive ? 'bg-accent-600' : 'bg-primary-200 dark:bg-slate-700'}`}
          />
        ))}
      </div>
    </div>
  );
}

function PipelineCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative h-32 w-full bg-primary-50 dark:bg-slate-800/50 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-primary-200 dark:border-primary-800/50">
      <div className="grid grid-cols-[auto_1fr_auto_1fr_auto] items-center w-full px-2 gap-1">
        {/* Node 0 */}
        <div className="relative w-8 h-8 shrink-0 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center z-10">
          <div className="absolute inset-0 rounded-full border-2 border-primary-200 dark:border-slate-700" />
          <motion.div initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }} animate={prefersReducedMotion ? {} : { opacity: [0, 1, 1, 0] }} transition={prefersReducedMotion ? {} : { duration: 4, times: [0, 0.1, 0.3, 1], repeat: Infinity, delay: 0 }} className="absolute inset-0 rounded-full border-2 border-[#F7C948]" />
          <motion.div animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 0] }} transition={prefersReducedMotion ? {} : { duration: 4, times: [0, 0.1, 0.3, 1], repeat: Infinity, delay: 0 }}>
            <svg className="w-4 h-4 text-[#F7C948]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </motion.div>
        </div>

        {/* Line 0 */}
        <div className="w-full h-1 bg-primary-200 dark:bg-slate-700 rounded-full relative overflow-hidden mx-1">
          <motion.div initial={prefersReducedMotion ? { x: '100%' } : { x: '-100%' }} animate={prefersReducedMotion ? {} : { x: ['-100%', '100%', '100%'] }} transition={prefersReducedMotion ? {} : { duration: 4, times: [0, 0.3, 1], repeat: Infinity, delay: 0.2 }} className="absolute inset-0 bg-[#F7C948] rounded-full" />
        </div>

        {/* Node 1 */}
        <div className="relative w-8 h-8 shrink-0 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center z-10">
          <div className="absolute inset-0 rounded-full border-2 border-primary-200 dark:border-slate-700" />
          <motion.div initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }} animate={prefersReducedMotion ? {} : { opacity: [0, 1, 1, 0] }} transition={prefersReducedMotion ? {} : { duration: 4, times: [0, 0.1, 0.3, 1], repeat: Infinity, delay: 0.8 }} className="absolute inset-0 rounded-full border-2 border-[#F7C948]" />
          <motion.div animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 0] }} transition={prefersReducedMotion ? {} : { duration: 4, times: [0, 0.1, 0.3, 1], repeat: Infinity, delay: 0.8 }}>
            <svg className="w-4 h-4 text-[#F7C948]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </motion.div>
        </div>

        {/* Line 1 */}
        <div className="w-full h-1 bg-primary-200 dark:bg-slate-700 rounded-full relative overflow-hidden mx-1">
          <motion.div initial={prefersReducedMotion ? { x: '100%' } : { x: '-100%' }} animate={prefersReducedMotion ? {} : { x: ['-100%', '100%', '100%'] }} transition={prefersReducedMotion ? {} : { duration: 4, times: [0, 0.3, 1], repeat: Infinity, delay: 1.0 }} className="absolute inset-0 bg-[#F7C948] rounded-full" />
        </div>

        {/* Node 2 */}
        <div className="relative w-8 h-8 shrink-0 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center z-10">
          <div className="absolute inset-0 rounded-full border-2 border-primary-200 dark:border-slate-700" />
          <motion.div initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }} animate={prefersReducedMotion ? {} : { opacity: [0, 1, 1, 0] }} transition={prefersReducedMotion ? {} : { duration: 4, times: [0, 0.1, 0.3, 1], repeat: Infinity, delay: 1.6 }} className="absolute inset-0 rounded-full border-2 border-[#F7C948]" />
          <motion.div animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0, 1, 1, 0] }} transition={prefersReducedMotion ? {} : { duration: 4, times: [0, 0.1, 0.3, 1], repeat: Infinity, delay: 1.6 }}>
            <svg className="w-4 h-4 text-[#F7C948]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function RocketCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative h-32 w-full bg-primary-50 dark:bg-slate-800/50 rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 border border-primary-200 dark:border-primary-800/50 group">
      <motion.div
        animate={prefersReducedMotion ? {} : { y: [0, -5, 0] }}
        transition={prefersReducedMotion ? {} : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <HiOutlineDesktopComputer className="w-12 h-12 text-accent-400 group-hover:text-accent-300 transition-colors" />
      </motion.div>
      <motion.div
        animate={prefersReducedMotion ? {} : { scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={prefersReducedMotion ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-accent-500/20 rounded-full blur-xl pointer-events-none"
      />
      <div className="mt-4 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F7C948] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F7C948]"></span>
        </span>
        <span className="text-xs font-medium text-[#F7C948] tracking-wider uppercase">Live in Production</span>
      </div>
    </div>
  );
}

const steps = [
  {
    icon: <HiOutlineClipboardList className="w-5 h-5 text-[#F7C948]" />,
    label: '1. Plan',
    card: <KanbanCard />,
  },
  {
    icon: <HiOutlineCode className="w-5 h-5 text-[#F7C948]" />,
    label: '2. Build',
    card: <CodeGraph />,
  },
  {
    icon: <HiOutlineCloudUpload className="w-5 h-5 text-[#F7C948]" />,
    label: '3. Test & CI',
    card: <PipelineCard />,
  },
  {
    icon: <HiOutlineDesktopComputer className="w-5 h-5 text-[#F7C948]" />,
    label: '4. Ship',
    card: <RocketCard />,
  },
];

const AUTOPLAY_INTERVAL = 3000;

function MobileCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setActive(index);
  }, []);

  const next = useCallback(() => {
    const nextIndex = (active + 1) % steps.length;
    goTo(nextIndex, 1);
  }, [active, goTo]);

  const prev = useCallback(() => {
    const prevIndex = (active - 1 + steps.length) % steps.length;
    goTo(prevIndex, -1);
  }, [active, goTo]);

  // Auto-advance
  useEffect(() => {
    if (prefersReducedMotion) return;
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next, prefersReducedMotion]);

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  const step = steps[active];

  return (
    <div className="flex flex-col gap-4">
      {/* Step progress bar */}
      <div className="flex gap-1.5">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full overflow-hidden bg-primary-200 dark:bg-slate-700"
            aria-label={s.label}
          >
            <motion.div
              className="h-full bg-accent-500 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: i === active ? 1 : i < active ? 1 : 0 }}
              transition={
                i === active
                  ? { duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }
                  : { duration: 0.25 }
              }
            />
          </div>
        ))}
      </div>

      {/* Card with slide animation */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="bg-white dark:bg-[#1e1e2e] border border-primary-200 dark:border-primary-800 rounded-2xl p-5 shadow-lg flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary-100/50 dark:bg-primary-100/10 rounded-lg">
                {step.icon}
              </div>
              <h4 className="font-semibold text-ink dark:text-primary-50">{step.label}</h4>
              <span className="ml-auto text-xs text-ink-muted dark:text-primary-400 tabular-nums">{active + 1} / {steps.length}</span>
            </div>
            {step.card}
          </motion.div>
        </AnimatePresence>
      </div>


    </div>
  );
}

export default function WorkflowBento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <div ref={ref} className="container-custom max-w-4xl py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-ink dark:text-primary-50 mb-2">Build With Care</h3>
        <p className="text-base md:text-lg text-ink-soft dark:text-primary-300 leading-relaxed">My end-to-end process for taking ideas from initial planning all the way to a live, production-ready product.</p>
      </motion.div>

      {/* Mobile: Carousel — Desktop: Bento grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {/* Mobile carousel (hidden on md+) */}
        <div className="md:hidden">
          <MobileCarousel />
        </div>

        {/* Desktop bento grid (hidden below md) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.label}
              variants={itemVariants}
              className="bg-white dark:bg-[#1e1e2e] border border-primary-200 dark:border-primary-800 rounded-2xl p-5 shadow-lg flex flex-col hover:border-accent-500/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-100/50 dark:bg-primary-100/10 rounded-lg">
                  {step.icon}
                </div>
                <h4 className="font-semibold text-ink dark:text-primary-50">{step.label}</h4>
              </div>
              {step.card}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
