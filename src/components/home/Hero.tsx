'use client';

import { motion } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigation, type Page } from '@/context/NavigationContext';
import ParticleBackground from '@/components/effects/ParticleBackground';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

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

const floatDelay2s = { animationDelay: '2s' } as const;
const floatDelay4s = { animationDelay: '4s' } as const;

export default function Hero() {
  const [showSmile, setShowSmile] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(greetingMessages[0]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const { navigateTo, slideComplete } = useNavigation();

  const triggerAnimation = useCallback(() => {
    // Clear all existing timers to stop current animation
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];

    // Reset states immediately
    setShowSmile(false);

    // Pick a random message
    const randomMessage = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
    setCurrentMessage(randomMessage);

    // Reset and retrigger animation
    setAnimationKey(prev => prev + 1);

    // Show smile when bubble appears (at 0.2s)
    const smileTimer = setTimeout(() => {
      setShowSmile(true);
    }, 200);
    timersRef.current.push(smileTimer);

    // Hide smile when bubble disappears (at 1.8s)
    const normalTimer = setTimeout(() => {
      setShowSmile(false);
    }, 1800);
    timersRef.current.push(normalTimer);
  }, []);

  useEffect(() => {
    triggerAnimation();

    // Cleanup on unmount
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <section id="home" className="relative flex-1 flex items-center justify-center overflow-hidden md:pt-8 xl:pt-16">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-400/12 dark:bg-accent-600/18 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/12 dark:bg-primary-600/18 rounded-full blur-3xl animate-float" style={floatDelay2s} />
        <div className="absolute inset-0 m-auto w-[600px] h-[600px] bg-accent-300/8 dark:bg-accent-700/15 rounded-full blur-3xl animate-float" style={floatDelay4s} />
      </div>

      <div className="container-custom">
        <motion.div
          variants={container}
          initial="hidden"
          animate={slideComplete ? 'show' : 'hidden'}
          className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 pb-8 xl:pb-12"
        >
          {/* Profile Icon */}
          <motion.div variants={item} className="flex justify-center">
            <motion.div
              className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 cursor-pointer mx-auto"
              animate={showSmile ? {
                rotate: [0, -3, 3, -3, 3, 0],
              } : {}}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
              onClick={triggerAnimation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Chat Bubble Animation */}
              <motion.div
                key={animationKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: [10, -10, -10, 10]
                }}
                transition={{
                  duration: 2,
                  times: [0, 0.2, 0.8, 1],
                  ease: "easeInOut"
                }}
                className="absolute -top-3 left-[70%] md:left-[75%] whitespace-nowrap pointer-events-none z-10"
              >
                <div className="relative bg-white dark:bg-slate-800 px-4 py-2 rounded-2xl border border-primary-200 dark:border-accent-700">
                  <span className="text-lg font-semibold text-ink dark:text-primary-100">
                    {currentMessage}
                  </span>
                  {/* Chat bubble tail - outer border */}
                  <svg
                    className="absolute -bottom-[9px] left-2 w-5 h-2"
                    viewBox="0 0 20 12"
                    fill="none"
                  >
                    <path
                      d="M10 12L0 0H20L10 12Z"
                      fill="currentColor"
                      className="text-primary-200 dark:text-accent-700"
                    />
                  </svg>
                  {/* Chat bubble tail - inner fill */}
                  <svg
                    className="absolute -bottom-[8px] left-2 w-5 h-2"
                    viewBox="0 0 20 12"
                    fill="none"
                  >
                    <path
                      d="M10 11L1 0H19L10 11Z"
                      fill="currentColor"
                      className="text-white dark:text-slate-800"
                    />
                  </svg>
                </div>
              </motion.div>

              {/* Profile Border */}
              <div className="absolute inset-3 rounded-full border-4 border-primary-300 dark:border-accent-600" />

              <Image
                src={showSmile ? "/images/avatar-smile.png" : "/images/avatar.png"}
                alt="Profile"
                fill
                className="object-cover rounded-full p-1"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink dark:text-primary-50 leading-tight !mt-2 md:!mt-3 lg:!mt-4"
          >
            Hi, I'm{' '}
            <span className="heading-gradient">Hafiz</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl lg:text-2xl text-ink-medium dark:text-primary-200 max-w-3xl mx-auto !mt-2 md:!mt-3 lg:!mt-4"
          >
            A Full Stack Developer from{' '}
            <span className="text-ink dark:text-primary-100 font-semibold">
              Johor, Malaysia.
            </span>{' '}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-sm md:text-base lg:text-lg text-ink-soft dark:text-primary-300 max-w-2xl mx-auto leading-relaxed"
          >
            End-to-end developer with over <span className="text-ink dark:text-primary-100 font-semibold">10 years of experience</span>,
            across frontend, backend, and server systems, with a strong focus on <u className="underline-offset-4">performance, reliability, and clean code</u>.
          </motion.p>

          {/* Large Typographic Nav */}
          <motion.div variants={item} className="space-y-2 pt-2">
            {heroNavItems.map((navItem) => (
              <motion.button
                key={navItem.page}
                variants={item}
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

          {/* Download Resume */}
          <motion.div variants={item} className="pt-2 xl:pt-4">
            <a
              href="/resume.pdf"
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
