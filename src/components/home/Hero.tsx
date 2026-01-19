'use client';

import { motion } from 'framer-motion';
import { HiDownload } from 'react-icons/hi';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { usePageNavigation } from '@/app/page';
import ParticleBackground from '@/components/effects/ParticleBackground';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function Hero() {
  const [showSmile, setShowSmile] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(greetingMessages[0]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const { navigateToMain, currentPage } = usePageNavigation();

  const triggerAnimation = () => {
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
  };

  useEffect(() => {
    triggerAnimation();

    // Cleanup on unmount
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const handleViewWork = () => {
    navigateToMain();
  };

  const handleGetInTouch = () => {
    navigateToMain();
    // After transition, scroll to contact
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }, 700);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-16">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-400/12 dark:bg-accent-600/18 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/12 dark:bg-primary-600/18 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-300/8 dark:bg-accent-700/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container-custom">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto text-center space-y-8 pb-16"
        >
          {/* Profile Icon */}
          <motion.div variants={item} className="flex justify-center">
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer"
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
                width={160}
                height={160}
                className="object-cover rounded-full"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-ink dark:text-primary-50"
          >
            Hi, I'm{' '}
            <span className="heading-gradient">Hafiz</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-xl md:text-2xl text-ink-medium dark:text-primary-200 max-w-3xl mx-auto"
          >
            A Full Stack Developer from{' '}
            <span className="text-ink dark:text-primary-100 font-semibold">
              Johor, Malaysia.
            </span>{' '}
            {/* creating websites and mobile applications since 2015. */}
          </motion.p>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-base md:text-lg text-ink-soft dark:text-primary-300 max-w-2xl mx-auto"
          >
            End-to-end developer with over <span className="text-ink dark:text-primary-100 font-semibold">10 years of experience</span>,
            across frontend, backend, and server systems, with a strong focus on <u className="underline-offset-4">performance, reliability, and clean code</u>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={handleViewWork}
              className="btn-primary w-full sm:w-auto"
            >
              View My Work
            </button>

            <button
              onClick={handleGetInTouch}
              className="btn-outline w-full sm:w-auto"
            >
              Get In Touch
            </button>

            <a
              href="/resume.pdf"
              download
              className="btn-secondary w-full sm:w-auto"
            >
              <HiDownload className="mr-2 w-5 h-5 inline" />
              Download Resume
            </a>
          </motion.div>

          {/* Tech Stack Preview */}
          <motion.div
            variants={item}
            className="pt-8"
          >
            <p className="text-sm text-ink-muted dark:text-primary-400 mb-4">
              Technologies I work with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['React', 'Azure', 'TypeScript', 'C#', 'PHP', 'CodeIgniter'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-white/60 dark:bg-accent-900/40 text-ink-soft dark:text-primary-200 rounded-full border border-primary-300/30 dark:border-accent-700/30 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      {/* Copyright Notice */}
      {currentPage === 'hero' && (
        <div className="absolute bottom-4 right-4 text-right z-40">
          <p className="text-xs text-ink-medium dark:text-primary-300">
            &copy; 2025 Hafiz Idris. All rights reserved.
          </p>
          <p className="text-xs text-ink-muted dark:text-primary-400 mt-1">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      )}
    </section>
  );
}
