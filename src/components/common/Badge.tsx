import React from 'react';

export interface BadgeProps {
  status?: 'healthy' | 'low' | 'critical' | 'info' | 'success';
  children: React.ReactNode;
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  status = 'healthy', 
  children, 
  size = 'md', 
  pulse = false,
  className = '' 
}) => {
  const styles = {
    healthy: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    low: 'bg-amber-50 text-amber-800 border-amber-200/80',
    critical: 'bg-rose-50 text-rose-700 border-rose-200/80',
    info: 'bg-sky-50 text-sky-700 border-sky-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
  };

  const dots = {
    healthy: 'bg-emerald-500',
    low: 'bg-amber-500',
    critical: 'bg-rose-500',
    info: 'bg-sky-500',
    success: 'bg-emerald-500'
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-medium px-2.5 py-1 gap-1.5'
  };

  return (
    <span className={`inline-flex items-center rounded-full border ${styles[status]} ${sizeStyles[size]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]} ${pulse ? 'animate-ping' : ''}`} />
      <span>{children}</span>
    </span>
  );
};
