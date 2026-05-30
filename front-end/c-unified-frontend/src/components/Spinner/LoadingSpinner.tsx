import clsx from 'clsx';

/**
 * LoadingSpinner Component - PlanE 高奢极简风格
 */
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const thickness = {
    sm: 'border-[1.5px]',
    md: 'border-2',
    lg: 'border-[2.5px]',
  };

  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-light-gray border-t-ink-black',
        sizeClasses[size],
        thickness[size],
        className
      )}
    />
  );
}

export { LoadingSpinner as Spinner };
export type { LoadingSpinnerProps as SpinnerProps };
