"use client";

import { motion } from "@/lib/motion";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showText?: boolean;
  color?: 'primary' | 'white' | 'secondary';
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  showText = true,
  color = 'primary'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const colorClasses = {
    primary: {
      border: 'border-primary-200',
      spinner: 'border-t-primary-600',
      text: 'text-primary-600'
    },
    white: {
      border: 'border-white/30',
      spinner: 'border-t-white',
      text: 'text-white'
    },
    secondary: {
      border: 'border-secondary-200',
      spinner: 'border-t-secondary-600',
      text: 'text-secondary-600'
    }
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        <motion.div 
          className={`${sizeClasses[size]} border-4 ${colorClasses[color].border} rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent ${colorClasses[color].spinner} rounded-full`}></div>
        </motion.div>
      </div>
      
      {showText && (
        <motion.p 
          className={`${textSizeClasses[size]} ${colorClasses[color].text} font-medium`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Simplified version for inline use
export function InlineSpinner({ size = 'sm', color = 'primary' }: Pick<LoadingSpinnerProps, 'size' | 'color'>) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    primary: {
      border: 'border-primary-200',
      spinner: 'border-t-primary-600'
    },
    white: {
      border: 'border-white/30',
      spinner: 'border-t-white'
    },
    secondary: {
      border: 'border-secondary-200',
      spinner: 'border-t-secondary-600'
    }
  };

  return (
    <motion.div 
      className={`${sizeClasses[size]} border-2 ${colorClasses[color].border} rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <div className={`absolute top-0 left-0 ${sizeClasses[size]} border-2 border-transparent ${colorClasses[color].spinner} rounded-full`}></div>
    </motion.div>
  );
} 