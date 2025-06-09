"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface RouterState {
  isLoading: boolean;
  currentPath: string;
  isNavigating: boolean;
}

export function useRouterEvents(): RouterState {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    // Detect path change
    if (currentPath !== pathname) {
      setIsLoading(true);
      setIsNavigating(true);
      setCurrentPath(pathname);

      // Simulate loading time for smoother transition
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsNavigating(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  useEffect(() => {
    // Also listen to search params changes
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchParams]);

  return {
    isLoading,
    currentPath: pathname,
    isNavigating
  };
}

// Hook for page loading states
export function usePageLoading() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    // Short delay to show loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return isLoading;
} 