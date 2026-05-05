'use client';

import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useNavigation } from '@/context/NavigationContext';

export default function About() {
  const { slideComplete } = useNavigation();
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(imageRef, { once: true, margin: '-100px' });
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  // #8 — disable parallax when reduced motion preferred
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [30, -50]);

  const ready = slideComplete && inView;

  return (
    <section ref={sectionRef} id="about" className="section-padding relative">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={slideComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.45 }}
          className="space-y-10"
        >

          {/* Content with floating image */}
          <div className="relative">
            {/* Profile Image — floats right on mobile, grid column on desktop */}
            <motion.div
              ref={imageRef}
              style={{ y: imageY }}
              className="relative float-right ml-4 mb-4 w-32 h-32 sm:w-40 sm:h-40 md:float-none md:ml-0 md:mb-0 md:w-[250px] md:h-[250px] md:absolute md:right-0 md:top-0 rounded-2xl overflow-hidden"
            >
              {/* Photo fades in after outline draws */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/me-about.png"
                  alt="Hafiz Idris"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              {/* SVG border — hand-drawn squiggly rectangle that draws itself in */}
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="-5 -5 310 310">
                <motion.path
                  d="M 20 4 Q 30 0 40 4 T 60 4 T 80 4 T 100 4 T 120 4 T 140 4 T 160 4 T 180 4 T 200 4 T 220 4 T 240 4 T 260 4 T 280 4 Q 296 4 296 20 Q 300 30 296 40 T 296 60 T 296 80 T 296 100 T 296 120 T 296 140 T 296 160 T 296 180 T 296 200 T 296 220 T 296 240 T 296 260 T 296 280 Q 296 296 280 296 Q 270 300 260 296 T 240 296 T 220 296 T 200 296 T 180 296 T 160 296 T 140 296 T 120 296 T 100 296 T 80 296 T 60 296 T 40 296 T 20 296 Q 4 296 4 280 Q 0 270 4 260 T 4 240 T 4 220 T 4 200 T 4 180 T 4 160 T 4 140 T 4 120 T 4 100 T 4 80 T 4 60 T 4 40 T 4 20 Q 4 4 20 4 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F7C948]"
                  initial={{ pathLength: 0 }}
                  animate={ready ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />
              </svg>
              {/* Background while drawing */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={ready ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.25, delay: 0.45 }}
                className="absolute inset-0 bg-neutral-300 dark:bg-neutral-700 rounded-2xl"
              />
            </motion.div>

            {/* Text Content */}
            <motion.div style={{ y: textY }} className="md:pr-[300px] space-y-6">
              {/* Professional Statement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={slideComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="text-xl md:text-2xl font-medium text-ink-medium dark:text-primary-200 leading-relaxed"
              >
                Hi, I'm Hafiz — a builder at heart and a developer by craft.
              </motion.p>

              {/* Narrative Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={slideComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="space-y-4 text-base md:text-lg text-ink-soft dark:text-primary-300 leading-relaxed"
              >
                <p>
                  My career started with a simple question: &ldquo;How does this website actually work?&rdquo;
                </p>

                <p>
                  That curiosity led me from fixing broken layouts to orchestrating microservices, from wrestling with jQuery to building React applications used by thousands daily, from &ldquo;deploy and pray&rdquo; to CI/CD pipelines that ship with confidence.
                </p>

                <p>
                  Today, I architect full-stack solutions in <span className="text-ink dark:text-primary-100 font-medium">Johor, Malaysia</span>, where every project is another question worth answering.
                </p>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
