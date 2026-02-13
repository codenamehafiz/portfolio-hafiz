'use client';

import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export type Page = 'home' | 'about' | 'projects' | 'contact';

const PAGE_ORDER: Record<Page, number> = {
  home: 0,
  about: 1,
  projects: 2,
  contact: 3,
};

const PATH_TO_PAGE: Record<string, Page> = {
  '/': 'home',
  '/about': 'about',
  '/projects': 'projects',
  '/contact': 'contact',
};

const PAGE_TO_PATH: Record<Page, string> = {
  home: '/',
  about: '/about',
  projects: '/projects',
  contact: '/contact',
};

interface NavigationContextType {
  currentPage: Page;
  direction: number;
  isInitialLoad: boolean;
  slideComplete: boolean;
  setSlideComplete: (value: boolean) => void;
  navigateTo: (page: Page) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  currentPage: 'home',
  direction: 1,
  isInitialLoad: true,
  slideComplete: true,
  setSlideComplete: () => {},
  navigateTo: () => {},
});

export function useNavigation() {
  return useContext(NavigationContext);
}

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [direction, setDirection] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [slideComplete, setSlideComplete] = useState(true);
  const isInitialized = useRef(false);

  // Read pathname on mount to determine initial page
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const page = PATH_TO_PAGE[window.location.pathname] || 'home';
    setCurrentPage(page);
    setDirection(1);

    // Replace current history entry so back works correctly
    window.history.replaceState({ page }, '', PAGE_TO_PATH[page]);
    setIsReady(true);
  }, []);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setIsInitialLoad(false);
      setSlideComplete(false);
      const page: Page = event.state?.page || PATH_TO_PAGE[window.location.pathname] || 'home';
      const dir = PAGE_ORDER[page] - PAGE_ORDER[currentPage];
      setDirection(dir >= 0 ? 1 : -1);
      setCurrentPage(page);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  const navigateTo = useCallback((page: Page) => {
    setIsInitialLoad(false);
    setSlideComplete(false);
    setCurrentPage((prev) => {
      const dir = PAGE_ORDER[page] - PAGE_ORDER[prev];
      setDirection(dir >= 0 ? 1 : -1);
      return page;
    });
    window.history.pushState({ page }, '', PAGE_TO_PATH[page]);
    window.scrollTo(0, 0);
  }, []);

  if (!isReady) return null;

  return (
    <NavigationContext.Provider value={{ currentPage, direction, isInitialLoad, slideComplete, setSlideComplete, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}
