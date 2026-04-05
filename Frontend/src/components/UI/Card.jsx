import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#ffffff] rounded-[14px] border border-[#e5e7eb] shadow-[0px_1px_2px_#00000019] ${className}`}>
      {children}
    </div>
  );
};

export const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  valueClassName = 'text-gray-900',
  iconClassName = 'text-gray-600',
  helperText 
}) => {
  return (
    <Card className="p-4 lg:p-[22px] flex flex-col items-start gap-2 lg:gap-5 justify-between">
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-normal text-[#4a5565] leading-snug">
          {label}
        </span>
        {Icon && <Icon className={`w-12 h-12 ${iconClassName}`} strokeWidth={1.5} />}
      </div>
      <div className="flex flex-col items-start">
        <p className={`text-2xl lg:text-3xl font-bold ${valueClassName}`}>
          {value}
        </p>
        {helperText && (
          <p className="text-xs text-gray-800 mt-1">{helperText}</p>
        )}
      </div>
    </Card>
  );
};
