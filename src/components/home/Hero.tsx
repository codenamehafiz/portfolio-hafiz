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

let hasPlayedHeroAnimation = false;

export default function Hero() {
  const [showSmile, setShowSmile] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(greetingMessages[0]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const { navigateTo, slideComplete, scrollContainerRef } = useNavigation();

  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate] = useState(!hasPlayedHeroAnimation);

  // Scroll parallax — hero content drifts up as user scrolls
  const { scrollY } = useScroll({ container: scrollContainerRef });
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  // Helper so every element has the same reduced-motion shortcut
  const d = (delay: number) => (prefersReducedMotion || !shouldAnimate) ? 0 : delay;

  // Helpers to completely bypass animations on subsequent loads
  const getInitial = (hiddenState: any) => shouldAnimate ? hiddenState : false;
  const getAnimate = (hiddenState: any, visibleState: any) => shouldAnimate ? (show ? visibleState : hiddenState) : visibleState;

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

  const show = slideComplete;

  useEffect(() => {
    if (show && shouldAnimate) {
      hasPlayedHeroAnimation = true;
      const timer = setTimeout(() => {
        triggerAnimation();
      }, prefersReducedMotion ? 0 : 2400); // Wait for avatar to fade in (1.8s delay + 0.5s duration)
      
      return () => {
        clearTimeout(timer);
        timersRef.current.forEach(t => clearTimeout(t));
      };
    }
  }, [show, prefersReducedMotion, triggerAnimation, shouldAnimate]);

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
            initial={getInitial({ opacity: 0, y: 20 })}
            animate={getAnimate({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })}
            transition={{ duration: 0.5, delay: d(1.8) }}
          >
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 cursor-pointer mx-auto"

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
                animate={animationKey === 0
                  ? { opacity: 0, y: 10 }
                  : (prefersReducedMotion
                    ? { opacity: [0, 1, 1, 0], y: [-10, -10, -10, -10] }
                    : { opacity: [0, 1, 1, 0], y: [10, -10, -10, 10] })
                }
                transition={prefersReducedMotion
                  ? { duration: 2, times: [0, 0.2, 0.8, 1] }
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

              {/* Circle base — character pops up out of this */}
              <div className="absolute inset-4 md:inset-8 rounded-full border-4 border-primary-300 dark:border-primary-100/70 bg-ink dark:bg-transparent" />

              {/* Character — extends above the circle for a 3D cutout feel */}
              <div className="absolute -inset-x-[20%] bottom-0 h-[140%] pointer-events-none">
                <Image
                  src={showSmile ? '/images/avatar-smile.png' : '/images/avatar.png'}
                  alt="Profile"
                  fill
                  sizes="(min-width: 1024px) 270px, (min-width: 768px) 224px, 180px"
                  quality={90}
                  className="object-contain object-bottom select-none [-webkit-user-drag:none]"
                  draggable={false}
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* ── "Hi, I'm Hafiz" — "Hi," lands first, then "I'm Hafiz" blurs in ── */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink dark:text-primary-50 leading-tight !mt-2 md:!mt-3 lg:!mt-4">
            {/* "Hi," — appears first */}
            <motion.span
              className="inline-block mr-3"
              initial={getInitial({ opacity: 0, y: 20 })}
              animate={getAnimate({ opacity: 0, y: 20 }, { opacity: 1, y: 0 })}
              transition={{ duration: 0.45, delay: d(0.5) }}
            >
              Hi,
            </motion.span>

            {/* "I'm " — blurs in after the pause */}
            <motion.span
              className="inline-block mr-3"
              initial={getInitial({ opacity: 0, y: 32, filter: 'blur(10px)' })}
              animate={getAnimate({ opacity: 0, y: 32, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)' })}
              transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: d(1.1), ease: [0.16, 1, 0.3, 1] }}
            >
              I&apos;m
            </motion.span>

            {/* "Hafiz" — serif italic with hand-drawn underline + sparkle */}
            <span className="relative inline-flex">
              <span className="inline-flex">
                {HAFIZ_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={getInitial({ opacity: 0, y: 24 })}
                    animate={getAnimate({ opacity: 0, y: 24 }, { opacity: 1, y: 0 })}
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

              {/* Hand-drawn squiggle underline */}
              <motion.svg
                aria-hidden
                className="absolute left-0 -bottom-1 md:-bottom-2 w-full h-3 md:h-4 text-[#F7C948] overflow-visible"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                fill="none"
                initial={getInitial({ opacity: 0 })}
                animate={getAnimate({ opacity: 0 }, { opacity: 1 })}
                transition={{ duration: 0.2, delay: d(1.5) }}
              >
                <motion.path
                  d="M2 7 Q 25 1 50 7 T 100 7 T 150 7 T 198 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={getInitial({ pathLength: 0 })}
                  animate={getAnimate({ pathLength: 0 }, { pathLength: 1 })}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: d(1.55), ease: [0.16, 1, 0.3, 1] }}
                />
              </motion.svg>

              {/* Sparkle decoration — entrance via motion, continuous slow spin via CSS */}
              <motion.div
                aria-hidden
                className="absolute -top-2 -right-3 md:-top-3 md:-right-5 w-4 h-4 md:w-5 md:h-5"
                initial={getInitial({ opacity: 0, scale: 0 })}
                animate={getAnimate({ opacity: 0, scale: 0 }, { opacity: 1, scale: 1 })}
                transition={{ duration: 0.5, delay: d(1.75), ease: [0.34, 1.56, 0.64, 1] }}
              >
                <div className="w-full h-full motion-safe:animate-[star-float_4.5s_ease-in-out_infinite]">
                  <svg
                    className="w-full h-full text-[#F7C948] motion-safe:animate-[spin_12s_linear_infinite]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0 L13.5 9 L24 12 L13.5 15 L12 24 L10.5 15 L0 12 L10.5 9 Z" />
                  </svg>
                </div>
              </motion.div>
            </span>
          </h1>

          {/* ── Tagline ── */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-ink-medium dark:text-primary-200 max-w-3xl mx-auto px-6 md:px-0 !mt-2 md:!mt-3 lg:!mt-4"
            initial={getInitial({ opacity: 0, y: 16 })}
            animate={getAnimate({ opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
            transition={{ duration: 0.5, delay: d(1.7) }}
          >
            A Full Stack Developer with{' '}
            <span className="text-ink dark:text-primary-100 font-semibold">10+ years of experience.</span>
          </motion.p>

          {/* ── Location ── */}
          <motion.p
            className="inline-flex items-center justify-center gap-2 text-sm md:text-base text-ink-muted dark:text-primary-400 !mt-1 md:!mt-2"
            initial={getInitial({ opacity: 0, y: 16 })}
            animate={getAnimate({ opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
            transition={{ duration: 0.5, delay: d(1.9) }}
          >
            Building from Johor, Malaysia.
          </motion.p>

          {/* ── Nav items ── */}
          <motion.div
            className="space-y-2 pt-2"
            initial={getInitial({ opacity: 0, y: 16 })}
            animate={getAnimate({ opacity: 0, y: 16 }, { opacity: 1, y: 0 })}
            transition={{ duration: 0.5, delay: d(2.1) }}
          >
            {heroNavItems.map((navItem, i) => (
              <motion.button
                key={navItem.page}
                initial={getInitial({ opacity: 0, y: 12 })}
                animate={getAnimate({ opacity: 0, y: 12 }, { opacity: 1, y: 0 })}
                transition={{ duration: 0.4, delay: d(2.1 + i * 0.08) }}
                onClick={() => navigateTo(navItem.page)}
                className="group flex flex-col items-center w-full text-center"
              >
                <span className="inline-flex items-center justify-center gap-3 md:gap-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105">
                  {/* Slot — number at rest, squiggly arrow on hover */}
                  <span className="relative inline-flex items-center justify-center w-7 md:w-9 lg:w-11 h-7 md:h-9 lg:h-11 flex-shrink-0">
                    <span className="absolute font-mono text-base md:text-lg lg:text-xl font-medium text-ink-soft dark:text-primary-300 tabular-nums transition-opacity duration-300 group-hover:opacity-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <svg
                      aria-hidden
                      className="absolute w-full h-3 md:h-4 lg:h-5 text-[#F7C948] overflow-visible"
                      viewBox="0 0 36 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        d="M2 7 Q 10 4 18 7 T 32 7"
                        pathLength="1"
                        className="[stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-500 ease-out"
                      />
                      <path
                        d="M26 2 L 32 7 L 26 12"
                        pathLength="1"
                        className="[stroke-dasharray:1] [stroke-dashoffset:1] group-hover:[stroke-dashoffset:0] transition-[stroke-dashoffset] duration-300 ease-out [transition-delay:250ms]"
                      />
                    </svg>
                  </span>
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink dark:text-primary-100">
                    {navItem.label}
                  </span>
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
            initial={getInitial({ opacity: 0 })}
            animate={getAnimate({ opacity: 0 }, { opacity: 1 })}
            transition={{ duration: 0.5, delay: d(2.3) }}
          >
            <a
              href="/resume-hafiz-idris.pdf"
              download
              className="group relative inline-flex items-center text-sm text-ink-soft/60 dark:text-primary-300/60 hover:text-ink dark:hover:text-primary-100 transition-colors"
            >
              <HiDownload className="mr-1.5 w-4 h-4" />
              <span className="relative">
                Download Resume
                <svg
                  aria-hidden
                  className="absolute left-0 -bottom-1 w-full h-1.5 text-[#F7C948] overflow-visible opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M1 3 Q 12 0 25 3 T 50 3 T 75 3 T 99 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
