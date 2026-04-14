'use client';

import { cn } from '@/lib/utils';

interface ProjectTechStackProps {
  technologies: string[];
  className?: string;
  itemClassName?: string;
  maxItems?: number;
  showOverflowCount?: boolean;
  overflowClassName?: string;
}

export default function ProjectTechStack({
  technologies,
  className,
  itemClassName,
  maxItems,
  showOverflowCount = true,
  overflowClassName,
}: ProjectTechStackProps) {
  const visibleTechnologies = maxItems ? technologies.slice(0, maxItems) : technologies;
  const hiddenTechnologies = maxItems ? technologies.slice(maxItems) : [];
  const hiddenCount = hiddenTechnologies.length;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {visibleTechnologies.map((tech) => (
        <span
          key={tech}
          className={cn(
            'px-3 py-1.5 text-xs sm:text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg',
            itemClassName,
          )}
        >
          {tech}
        </span>
      ))}
      {showOverflowCount && hiddenCount > 0 && (
        <div className="relative group/stack">
          <span
            className={cn(
              'inline-flex cursor-default px-3 py-1.5 text-xs sm:text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg',
              overflowClassName,
            )}
          >
            +{hiddenCount}
          </span>
          <div className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-max max-w-[220px] rounded-lg border border-slate-200/80 bg-white/95 p-2 opacity-0 shadow-lg transition-all duration-200 group-hover/stack:translate-y-0 group-hover/stack:opacity-100 group-focus-within/stack:translate-y-0 group-focus-within/stack:opacity-100 dark:border-slate-700 dark:bg-slate-900/95 translate-y-1">
            <div className="flex flex-wrap gap-1.5">
              {hiddenTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

