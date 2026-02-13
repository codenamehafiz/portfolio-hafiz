'use client';

import { skills } from '@/data/skills';

const topRow = skills.filter((_, i) => i % 2 === 0);
const bottomRow = skills.filter((_, i) => i % 2 === 1);

function MarqueeRow({
  items,
  direction = 'left',
  duration = 30,
}: {
  items: typeof skills;
  direction?: 'left' | 'right';
  duration?: number;
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white dark:from-ink to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white dark:from-ink to-transparent pointer-events-none" />

      <div
        className={`flex gap-6 w-max ${
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <div
              key={`${skill.name}-${i}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100/60 dark:bg-accent-900/30 shrink-0"
            >
              <Icon className="w-4 h-4 text-ink-soft dark:text-primary-300" />
              <span className="text-sm font-medium text-ink-soft dark:text-primary-300 whitespace-nowrap">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="py-8 space-y-4 select-none">
      <MarqueeRow items={topRow} direction="left" duration={35} />
      <MarqueeRow items={bottomRow} direction="right" duration={40} />
    </div>
  );
}
