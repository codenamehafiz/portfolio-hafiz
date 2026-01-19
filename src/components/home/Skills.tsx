'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills, skillCategories } from '@/data/skills';

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding relative bg-white/50 dark:bg-accent-900/20">
      <div className="container-custom max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-ink dark:text-primary-50"
          >
            Skills
          </motion.h2>

          {/* Skills by Category */}
          <div className="space-y-10">
            {skillCategories.map((category, categoryIndex) => {
              const categorySkills = skills.filter((skill) => skill.category === category);

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.3 + categoryIndex * 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-ink-medium dark:text-primary-200">
                    {category}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill, index) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ delay: 0.4 + categoryIndex * 0.1 + index * 0.02 }}
                        className="px-3 py-1.5 text-sm font-medium bg-primary-100 dark:bg-accent-900/40 text-ink-soft dark:text-primary-300 rounded-full hover:bg-primary-200 dark:hover:bg-accent-900/60 transition-colors"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
