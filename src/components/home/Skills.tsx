'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { skills, skillCategories } from '@/data/skills';

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="section-padding relative">
      <div ref={ref} className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Section Header */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-ink dark:text-primary-50"
          >
            Skills
          </motion.h2>

          {/* Two-column category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, categoryIndex) => {
              const categorySkills = skills.filter((skill) => skill.category === category);

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ delay: 0.2 + categoryIndex * 0.1 }}
                  className="space-y-3"
                >
                  <h3 className="text-sm uppercase tracking-widest font-semibold text-ink-muted dark:text-primary-400">
                    {category}
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    {categorySkills.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                          transition={{ delay: 0.3 + categoryIndex * 0.1 + index * 0.03 }}
                          className="group flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-100/60 dark:bg-accent-900/30 hover:bg-primary-200/80 dark:hover:bg-accent-800/50 transition-colors"
                        >
                          <Icon className="w-4 h-4 shrink-0 text-ink-soft dark:text-primary-300 group-hover:text-ink dark:group-hover:text-primary-100 transition-colors" />
                          <div className="min-w-0 flex-1">
                            <span className="text-sm font-medium text-ink-soft dark:text-primary-300 group-hover:text-ink dark:group-hover:text-primary-100 transition-colors truncate block">
                              {skill.name}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
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
