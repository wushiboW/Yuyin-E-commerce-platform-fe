import React from 'react';
import clsx from 'clsx';

/**
 * Badge Component - PlanE 高奢极简风格
 */
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-light-gray text-warm-gray',
    success: 'bg-bamboo-green/10 text-bamboo-green border border-bamboo-green/20',
    warning: 'bg-gold-sand/10 text-paper-brown border border-gold-sand/20',
    error: 'bg-red-50 text-red-600 border border-red-200',
    accent: 'bg-gold-sand text-ink-black',
  };
  
  const sizes = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      style={{ borderRadius: '2px' }}
    >
      {children}
    </span>
  );
}

export default Badge;
