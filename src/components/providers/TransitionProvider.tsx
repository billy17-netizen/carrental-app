"use client";

import { createContext, useContext, ReactNode } from "react";
import { AnimatePresence } from "@/lib/motion";
import { useRouterEvents } from "@/lib/hooks/useRouterEvents";
import { PageLoadingOverlay } from "../ui/PageTransition";

interface TransitionContextType {
  isLoading: boolean;
  isNavigating: boolean;
  currentPath: string;
}

const TransitionContext = createContext<TransitionContextType>({
  isLoading: false,
  isNavigating: false,
  currentPath: "/"
});

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within TransitionProvider");
  }
  return context;
}

interface TransitionProviderProps {
  children: ReactNode;
  enableGlobalLoading?: boolean;
}

export default function TransitionProvider({ 
  children, 
  enableGlobalLoading = false 
}: TransitionProviderProps) {
  const { isLoading, isNavigating, currentPath } = useRouterEvents();

  return (
    <TransitionContext.Provider 
      value={{ 
        isLoading, 
        isNavigating, 
        currentPath 
      }}
    >
      {/* Global Loading Overlay - Optional */}
      {enableGlobalLoading && (
        <AnimatePresence>
          {isNavigating && <PageLoadingOverlay />}
        </AnimatePresence>
      )}
      
      {children}
    </TransitionContext.Provider>
  );
}

// HOC for wrapping components with transition
export function withTransition<T extends object>(
  Component: React.ComponentType<T>
) {
  return function TransitionWrappedComponent(props: T) {
    return (
      <TransitionProvider>
        <Component {...props} />
      </TransitionProvider>
    );
  };
} 