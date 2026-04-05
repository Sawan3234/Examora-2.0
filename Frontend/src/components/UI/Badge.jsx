import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  className = ''
}) => {
  const variants = {
    default: 'bg-[#f3f4f6] text-[#364153]',
    primary: 'bg-[#f3f4f6] text-[#364153]',
    success: 'bg-[#dcfce7] text-[#008236]',
    warning: 'bg-[#dbeafe] text-[#1447e6]',
    danger: 'bg-[#ffe2e2] text-[#c10007]',
    info: 'bg-[#dbeafe] text-[#1447e6]',
  };

  const sizes = {
    small: 'px-3 py-1 text-xs font-semibold rounded-lg',
    medium: 'px-3 py-1.5 text-sm font-medium',
    large: 'px-4 py-2 text-base font-medium',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${variants[variant]} ${sizes[size]} ${className}`}>
      {variant === 'warning' && <span className="w-1.5 h-1.5 rounded-full bg-[#155dfc84]" />}
      {children}
    </span>
  );
};
