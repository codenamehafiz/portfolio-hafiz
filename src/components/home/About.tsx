'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useNavigation } from '@/context/NavigationContext';

export default function About() {
  const { slideComplete } = useNavigation();
  const imageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(imageRef, { once: true, margin: '-100px' });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -50]);

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
              className="relative float-right ml-4 mb-4 w-32 h-32 sm:w-40 sm:h-40 md:float-none md:ml-0 md:mb-0 md:w-[300px] md:h-[300px] md:absolute md:right-0 md:top-0 rounded-2xl overflow-hidden"
            >
              {/* Photo fades in after outline draws */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.55 }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/me-about2.png"
                  alt="Hafiz Idris"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              {/* SVG border draws itself */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
                <motion.rect
                  x="4"
                  y="4"
                  width="292"
                  height="292"
                  rx="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-neutral-500"
                  initial={{ pathLength: 0 }}
                  animate={ready ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
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
            <motion.div style={{ y: textY }} className="md:pr-[332px] space-y-6">
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
