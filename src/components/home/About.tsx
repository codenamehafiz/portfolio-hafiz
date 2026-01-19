'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-ink dark:text-primary-50"
          >
            About
          </motion.h2>

          {/* Content Grid with Image */}
          <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3 }}
              className="relative w-full aspect-square rounded-2xl overflow-hidden bg-primary-200 dark:bg-accent-800"
            >
              <Image
                src="/images/me-about2.png"
                alt="Hafiz Idris"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Text Content */}
            <div className="space-y-6">
              {/* Professional Statement */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl font-medium text-ink-medium dark:text-primary-200 leading-relaxed"
              >
                I build accessible, performant, and user-friendly digital experiences for the web and mobile platforms.
              </motion.p>

              {/* Narrative Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 text-base md:text-lg text-ink-soft dark:text-primary-300 leading-relaxed"
              >
                <p>
                  My career started with a simple question: "How does this website actually work?"
                </p>

                <p>
                  That curiosity led me from fixing broken layouts to orchestrating microservices, from wrestling with jQuery to building React applications used by thousands daily, from "deploy and pray" to CI/CD pipelines that ship with confidence.
                </p>

                <p>
                  Today, I architect full-stack solutions in <span className="text-ink dark:text-primary-100 font-medium">Johor, Malaysia</span>, where every project is another question worth answering.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
