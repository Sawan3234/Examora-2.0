import React from 'react';

export const ProgressBar = ({ 
  value = 0, 
  max = 100,
  variant = 'violet',
  height = 'h-2',
  showPercentage = false,
  className = ''
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const variantColors = {
    violet: 'bg-[#4f39f6]',
    blue: 'bg-[#4f39f6]',
    emerald: 'bg-[#4f39f6]',
    danger: 'bg-[#4f39f6]',
    amber: 'bg-[#4f39f6]',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full ${height} bg-[#e5e7eb] rounded-sm overflow-hidden`}>
        <div
          className={`${height} ${variantColors[variant]} rounded-sm transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <p className="text-sm font-medium text-[#4a5565] mt-1">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  );
};