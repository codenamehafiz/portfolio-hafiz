'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SiGithub, SiLinkedin, SiWhatsapp } from 'react-icons/si';
import { useTheme } from '@/providers/theme-provider';
import { useNavigation, type Page } from '@/context/NavigationContext';
import SunMoonToggle from '@/components/ui/SunMoonToggle';

const navLinks: { name: string; page: Page }[] = [
  { name: 'Home', page: 'home' },
  { name: 'About', page: 'about' },
  { name: 'Projects', page: 'projects' },
  { name: 'Contact', page: 'contact' },
];

const subPageLinks = navLinks.filter((l) => l.page !== 'home');

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { currentPage, navigateTo, scrollYProgress } = useNavigation();

  // Transform scroll progress (0 to 1) into a pixel or percentage height
  const scrollHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Desktop: Home page — social links + line */}
      {currentPage === 'home' && (
        <nav
          className="hidden md:flex fixed top-0 bottom-0 left-3 z-50 flex-col items-center pt-16 pb-6 pl-2 pr-3"
          aria-label="Social links"
        >
          <div className="group flex flex-col items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              href="https://github.com/codenamehafiz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 text-ink-soft/70 dark:text-primary-300/70 hover:text-ink dark:hover:text-primary-100 hover:bg-ink/5 dark:hover:bg-primary-100/10 rounded transition-all duration-200"
              aria-label="GitHub"
            >
              <SiGithub className="w-5 h-5" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              href="https://www.linkedin.com/in/muhammad-hafiz-mohd-idris-50b403109/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 text-ink-soft/70 dark:text-primary-300/70 hover:text-ink dark:hover:text-primary-100 hover:bg-ink/5 dark:hover:bg-primary-100/10 rounded transition-all duration-200"
              aria-label="LinkedIn"
            >
              <SiLinkedin className="w-5 h-5" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              href="https://wa.me/60175420192"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 text-ink-soft/70 dark:text-primary-300/70 hover:text-ink dark:hover:text-primary-100 hover:bg-ink/5 dark:hover:bg-primary-100/10 rounded transition-all duration-200"
              aria-label="WhatsApp"
            >
              <SiWhatsapp className="w-5 h-5" />
            </motion.a>

            <div className="w-[2px] h-24 bg-ink-soft/20 dark:bg-primary-300/20 relative rounded-full overflow-hidden transition-all duration-300 mt-2">
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary-500 dark:bg-accent drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]"
                style={{ height: scrollHeight }}
              />
            </div>
          </div>
        </nav>
      )}

      {/* Desktop: Other pages — Home button + line at top, page links at bottom */}
      {currentPage !== 'home' && (
        <nav
          className="hidden md:flex fixed top-0 bottom-0 left-3 z-50 flex-col items-center justify-between pt-16 pb-6 pl-2 pr-3"
          aria-label="Section navigation"
        >
          {/* Top: Home */}
          <div className="group flex flex-col items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="relative flex items-center justify-center"
              aria-label="Home"
              style={{ writingMode: 'vertical-rl' }}
            >
              <span
                className="text-xs uppercase tracking-widest transition-all duration-200 rotate-180 select-none font-normal text-ink-soft/70 dark:text-primary-300/70 group-hover:text-ink dark:group-hover:text-primary-100 py-2 px-1 rounded group-hover:bg-ink/5 dark:group-hover:bg-primary-100/10"
              >
                Home
              </span>
            </button>
            <div className="w-[2px] h-24 bg-ink-soft/20 dark:bg-primary-300/20 relative rounded-full overflow-hidden mt-2">
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary-500 dark:bg-accent drop-shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]"
                style={{ height: scrollHeight }}
              />
            </div>
          </div>

          {/* Bottom: Page links */}
          <div className="flex flex-col items-center gap-6">
            {subPageLinks.map((link) => {
              const isActive = currentPage === link.page;

              return (
                <button
                  key={link.name}
                  onClick={() => navigateTo(link.page)}
                  className="relative flex items-center justify-center group"
                  aria-label={link.name}
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {/* Active indicator — horizontal line to the right of text */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-indicator"
                      className="absolute -right-2 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-ink dark:bg-primary-100 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span
                    className={`text-xs uppercase tracking-widest transition-all duration-200 rotate-180 select-none py-2 px-1 rounded ${isActive
                      ? 'font-semibold text-ink dark:text-primary-100'
                      : 'font-normal text-ink-soft/70 dark:text-primary-300/70 group-hover:text-ink dark:group-hover:text-primary-100 group-hover:bg-ink/5 dark:group-hover:bg-primary-100/10'
                      }`}
                  >
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Mobile: Home page — social links + toggle */}
      {currentPage === 'home' && (
        <nav
          className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-5 py-3 rounded-full bg-white/60 dark:bg-ink/60 backdrop-blur-xl border border-primary-200/30 dark:border-accent-800/30 shadow-lg"
          aria-label="Social links"
        >
          <motion.a
            whileTap={{ scale: 0.9 }}
            href="https://github.com/codenamehafiz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-5 h-5 text-ink-soft/70 dark:text-primary-300/70 hover:text-ink dark:hover:text-primary-100 transition-colors"
            aria-label="GitHub"
          >
            <SiGithub className="w-4 h-4" />
          </motion.a>

          <motion.a
            whileTap={{ scale: 0.9 }}
            href="https://www.linkedin.com/in/muhammad-hafiz-mohd-idris-50b403109/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-5 h-5 text-ink-soft/70 dark:text-primary-300/70 hover:text-ink dark:hover:text-primary-100 transition-colors"
            aria-label="LinkedIn"
          >
            <SiLinkedin className="w-4 h-4" />
          </motion.a>

          <motion.a
            whileTap={{ scale: 0.9 }}
            href="https://wa.me/60175420192"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-5 h-5 text-ink-soft/70 dark:text-primary-300/70 hover:text-ink dark:hover:text-primary-100 transition-colors"
            aria-label="WhatsApp"
          >
            <SiWhatsapp className="w-4 h-4" />
          </motion.a>

          <div className="w-1.5 h-1.5 rounded-full bg-ink-soft/40 dark:bg-primary-300/40" />

          <SunMoonToggle isDark={theme === 'dark'} onClick={toggleTheme} size="sm" />
        </nav>
      )}

      {/* Mobile: Other pages — bottom nav bar */}
      {currentPage !== 'home' && (
        <nav
          className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-white/60 dark:bg-ink/60 backdrop-blur-xl border border-primary-200/30 dark:border-accent-800/30 shadow-lg"
          aria-label="Section navigation"
        >
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;

            return (
              <button
                key={link.name}
                onClick={() => navigateTo(link.page)}
                className="relative flex flex-col items-center px-1 py-0.5"
                aria-label={link.name}
              >
                {/* Active indicator — underline */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-mobile"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-3 bg-ink dark:bg-primary-100 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span
                  className={`text-[10px] uppercase tracking-wide transition-all duration-200 select-none ${isActive
                    ? 'font-semibold text-ink dark:text-primary-100'
                    : 'font-normal text-ink-soft/50 dark:text-primary-300/50'
                    }`}
                >
                  {link.name}
                </span>
              </button>
            );
          })}

          <div className="h-4 w-px bg-primary-200/50 dark:bg-accent-800/50 mx-0.5" />

          <SunMoonToggle isDark={theme === 'dark'} onClick={toggleTheme} size="sm" />
        </nav>
      )}
    </>
  );
}
