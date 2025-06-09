"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { motion } from "@/lib/motion";
import { InlineSpinner } from "./LoadingSpinner";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  showSpinner?: boolean;
  external?: boolean;
  prefetch?: boolean;
  replace?: boolean;
  onClick?: () => void;
}

export default function TransitionLink({
  href,
  children,
  className = "",
  showSpinner = true,
  external = false,
  prefetch = true,
  replace = false,
  onClick
}: TransitionLinkProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick();
    }

    // Skip transition for external links
    if (external) {
      return;
    }

    // Skip transition for hash links or same page
    if (href.startsWith('#') || href === window.location.pathname) {
      return;
    }

    e.preventDefault();
    setIsLoading(true);

    // Start transition
    setTimeout(() => {
      if (replace) {
        router.replace(href);
      } else {
        router.push(href);
      }
    }, 100);
  };

  // For external links, use regular anchor tag
  if (external) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      prefetch={prefetch}
      onClick={handleClick}
    >
      <motion.span
        className="flex items-center gap-2"
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.1 }}
      >
        {children}
        {isLoading && showSpinner && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-1"
          >
            <InlineSpinner size="sm" />
          </motion.div>
        )}
      </motion.span>
    </Link>
  );
}

// Specialized version for buttons
export function TransitionButton({
  href,
  children,
  className = "",
  variant = 'primary',
  size = 'md',
  loading = false,
  onClick
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
}) {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 hover:border-white/30",
    ghost: "bg-transparent hover:bg-primary-50 text-primary-600 border border-primary-200 hover:border-primary-300"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <TransitionLink
      href={href}
      className={buttonClassName}
      onClick={onClick}
    >
      {loading ? (
        <>
          <InlineSpinner size="sm" color={variant === 'primary' ? 'white' : 'primary'} />
          <span className="ml-2">Loading...</span>
        </>
      ) : (
        children
      )}
    </TransitionLink>
  );
} 