import React from 'react';

export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  subtitle?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  glow?: boolean;
  dark?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  badge,
  action,
  glow = false,
  dark = false,
  padding = 'md'
}) => {
  const paddingMap = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div className={`
      relative rounded-3xl transition-all duration-300
      ${dark ? 'glass-card-dark text-cream-50' : 'glass-card text-chocolate-900'}
      ${glow ? 'shadow-glow-caramel border-caramel-400/40' : 'shadow-warm hover:shadow-warm-lg'}
      ${paddingMap[padding]}
      ${className}
    `}>
      {(title || badge || action) && (
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="min-w-0">
            {title && (
              <div className="flex items-center gap-2">
                <h3 className={`font-semibold tracking-tight text-base sm:text-lg ${dark ? 'text-cream-50' : 'text-chocolate-900'}`}>
                  {title}
                </h3>
                {badge}
              </div>
            )}
            {subtitle && (
              <p className={`text-xs sm:text-sm mt-0.5 ${dark ? 'text-cream-300/80' : 'text-chocolate-600'}`}>
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
