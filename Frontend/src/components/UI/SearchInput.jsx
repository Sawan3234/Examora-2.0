import React from 'react';
import { Search } from 'lucide-react';

export const SearchInput = ({ 
  placeholder = 'Search...', 
  value = '', 
  onChange,
  className = ''
}) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6a7282] pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{ fontFamily: 'Inter, sans-serif' }}
        className={`w-full pl-10 pr-4 py-2 text-base font-normal leading-5 border border-[#d1d5dc] rounded-[10px] bg-[#ffffff] text-[#101828] placeholder:text-[#6a7282] focus:outline-none focus:ring-2 focus:ring-[#4f39f6] focus:border-transparent transition-colors ${className}`}
      />
    </div>
  );
};
