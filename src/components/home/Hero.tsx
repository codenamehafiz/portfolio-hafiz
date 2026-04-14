'use client';

import { motion, useReducedMotion, useTransform, useScroll } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigation, type Page } from '@/context/NavigationContext';

const greetingMessages = [
  "Hello! 👋",
  "How are you doing? 😊",
  "Nice to see you! 🎉",
  "Hey there! ✨",
  "Welcome! 🌟",
  "What's up? 🚀",
  "Howdy! 🤠",
  "Hi friend! 💙",
];

const heroNavItems: { page: Page; label: string; subtitle: string }[] = [
  { page: 'about', label: 'About', subtitle: 'Experience, skills & background' },
  { page: 'projects', label: 'Projects', subtitle: 'Things I\'ve built & shipped' },
  { page: 'contact', label: 'Contact', subtitle: 'Let\'s work together' },
];

// Letters of the name — each animates in individually
const HAFIZ_LETTERS = ['H', 'a', 'f', 'i', 'z'];

export default function Hero() {
  const [showSmile, setShowSmile] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(greetingMessages[0]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const { navigateTo, slideComplete, scrollContainerRef } = useNavigation();

  const prefersReducedMotion = useReducedMotion();

  // Scroll parallax — hero content drifts up as user scrolls
  const { scrollY } = useScroll({ container: scrollContainerRef });
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  // Helper so every element has the same reduced-motion shortcut
  const d = (delay: number) => prefersReducedMotion ? 0 : delay;

  const triggerAnimation = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
    setShowSmile(false);
    const randomMessage = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
    setCurrentMessage(randomMessage);
    setAnimationKey(prev => prev + 1);
    const smileTimer = setTimeout(() => setShowSmile(true), 200);
    timersRef.current.push(smileTimer);
    const normalTimer = setTimeout(() => setShowSmile(false), 1800);
    timersRef.current.push(normalTimer);
  }, []);

  useEffect(() => {
    triggerAnimation();
    return () => { timersRef.current.forEach(timer => clearTimeout(timer)); };
  }, []);

  const show = slideComplete;

  return (
    <section id="home" className="relative flex-1 flex items-center justify-center overflow-hidden md:pt-8 xl:pt-16">
      <div className="container-custom -mt-24 md:mt-0">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: heroY }}
          className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 pb-8 xl:pb-12"
        >

          {/* ── Avatar ── */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: d(1.8) }}
          >
            <motion.div
              className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 cursor-pointer mx-auto"
              animate={showSmile && !prefersReducedMotion ? { rotate: [0, -3, 3, -3, 3, 0] } : {}}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onClick={triggerAnimation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Chat Bubble */}
              <motion.div
                key={animationKey}
                initial={{ opacity: 0, y: 10 }}
                animate={prefersReducedMotion
                  ? { opacity: 1, y: -10 }
                  : { opacity: [0, 1, 1, 0], y: [10, -10, -10, 10] }}
                transition={prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 2, times: [0, 0.2, 0.8, 1], ease: 'easeInOut' }}
                className="absolute -top-3 left-[70%] md:left-[75%] whitespace-nowrap pointer-events-none z-10"
              >
                <div className="relative bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-primary-200 dark:border-accent-700">
                  <span className="text-lg font-semibold text-ink dark:text-primary-100">
                    {currentMessage}
                  </span>
                  <svg className="absolute -bottom-[9px] left-2 w-5 h-2" viewBox="0 0 20 12" fill="none">
                    <path d="M10 12L0 0H20L10 12Z" fill="currentColor" className="text-primary-200 dark:text-accent-700" />
                  </svg>
                  <svg className="absolute -bottom-[8px] left-2 w-5 h-2" viewBox="0 0 20 12" fill="none">
                    <path d="M10 11L1 0H19L10 11Z" fill="currentColor" className="text-white dark:text-slate-800" />
                  </svg>
                </div>
              </motion.div>

              <div className="absolute inset-3 rounded-full border-4 border-primary-300 dark:border-accent-600" />
              <Image
                src={showSmile ? '/images/avatar-smile.png' : '/images/avatar.png'}
                alt="Profile"
                fill
                className="object-cover rounded-full p-1"
                priority
              />
            </motion.div>
          </motion.div>

          {/* ── "Hi, I'm Hafiz" — "Hi," lands first, then "I'm Hafiz" blurs in ── */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink dark:text-primary-50 leading-tight !mt-2 md:!mt-3 lg:!mt-4">
            {/* "Hi," — appears first */}
            <motion.span
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 20 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.45, delay: d(0.5) }}
            >
              Hi,
            </motion.span>

            {/* "I'm " — blurs in after the pause */}
            <motion.span
              className="inline-block mr-3"
              initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
              animate={show
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 32, filter: 'blur(10px)' }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: d(1.1), ease: [0.16, 1, 0.3, 1] }}
            >
              I&apos;m
            </motion.span>

            {/* "Hafiz" — each letter staggers in */}
            <span className="heading-gradient inline-flex">
              {HAFIZ_LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 24 }}
                  animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.4,
                    delay: d(1.1 + 0.06 * i),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* ── Tagline ── */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-ink-medium dark:text-primary-200 max-w-3xl mx-auto !mt-2 md:!mt-3 lg:!mt-4"
            initial={{ opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: d(1.7) }}
          >
            A Full Stack Developer from{' '}
            <span className="text-ink dark:text-primary-100 font-semibold">Johor, Malaysia.</span>
          </motion.p>

          {/* ── Description ── */}
          <motion.p
            className="text-sm md:text-base lg:text-lg text-ink-soft dark:text-primary-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: d(1.9) }}
          >
            End-to-end developer with over{' '}
            <span className="text-ink dark:text-primary-100 font-semibold">10 years of experience</span>,
            across frontend, backend, and server systems, with a strong focus on{' '}
            <u className="underline-offset-4">performance, reliability, and clean code</u>.
          </motion.p>

          {/* ── Nav items ── */}
          <motion.div
            className="space-y-2 pt-2"
            initial={{ opacity: 0, y: 16 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, delay: d(2.1) }}
          >
            {heroNavItems.map((navItem, i) => (
              <motion.button
                key={navItem.page}
                initial={{ opacity: 0, y: 12 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.4, delay: d(2.1 + i * 0.08) }}
                onClick={() => navigateTo(navItem.page)}
                className="group flex flex-col items-center w-full text-center"
              >
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-soft/50 dark:text-primary-300/50 transition-all duration-300 group-hover:text-ink dark:group-hover:text-primary-100 group-hover:translate-x-2 group-hover:scale-105">
                  {navItem.label}
                </span>
                <span className="text-xs md:text-sm text-ink-muted dark:text-primary-400 mt-1 transition-all duration-300 group-hover:text-ink-soft dark:group-hover:text-primary-300">
                  {navItem.subtitle}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* ── Download Resume ── */}
          <motion.div
            className="pt-2 xl:pt-4"
            initial={{ opacity: 0 }}
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: d(2.3) }}
          >
            <a
              href="/resume-hafiz-idris.pdf"
              download
              className="inline-flex items-center text-sm text-ink-soft/60 dark:text-primary-300/60 hover:text-ink dark:hover:text-primary-100 transition-colors"
            >
              <HiDownload className="mr-1.5 w-4 h-4" />
              Download Resume
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
