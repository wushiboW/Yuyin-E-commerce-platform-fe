import React from 'react';
import clsx from 'clsx';

/**
 * EmptyState Component - PlanE 高奢极简风格
 */
export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={clsx('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      {icon && (
        <div 
          className="w-16 h-16 flex items-center justify-center mb-4 text-warm-gray bg-light-gray"
          style={{ borderRadius: '50%' }}
        >
          {icon}
        </div>
      )}
      <h3 
        className="text-lg font-medium text-ink-black" 
        style={{ fontFamily: "'Noto Serif SC', serif" }}
      >
        {title}
      </h3>
      {description && (
        <p className="mt-2 max-w-sm text-warm-gray text-sm">{description}</p>
      )}
      {action && (
        <div className="mt-4">{action}</div>
      )}
    </div>
  );
}

export default EmptyState;
