'use client';

import { useTheme } from '@/providers/theme-provider';
import { useNavigation } from '@/context/NavigationContext';
import SunMoonToggle from '@/components/ui/SunMoonToggle';

export default function CopyrightNotice() {
  const currentYear = new Date().getFullYear();
  const { theme, toggleTheme } = useTheme();
  const { currentPage } = useNavigation();

  return (
    <div className="hidden md:flex items-end justify-between py-4 px-4">
      <div />
      <div className="flex items-center gap-4">
        <SunMoonToggle isDark={theme === 'dark'} onClick={toggleTheme} />
        <div className="text-right">
          <p className="text-xs text-ink-soft/40 dark:text-primary-400/50">
            &copy; {currentYear} Hafiz Idris. All rights reserved.
          </p>
          <p className="text-xs text-ink-soft/40 dark:text-primary-400/40 mt-1">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
