import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

function Card({ children, className, hover = false, padding = 'md', onClick }: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-surface border border-light-gray',
        paddingStyles[padding],
        hover && 'transition-all duration-normal hover:shadow-soft hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      style={{ borderRadius: '2px' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('mb-4', className)}>
      <h3 className="text-lg font-medium text-ink-black" style={{ fontFamily: "'Noto Serif SC', serif" }}>
        {children}
      </h3>
    </div>
  );
}

function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx(className)}>{children}</div>;
}

function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={clsx('mt-4 pt-4 border-t border-light-gray', className)}>
      {children}
    </div>
  );
}

export default Card;
export { CardHeader, CardContent, CardFooter };
export type { CardProps };