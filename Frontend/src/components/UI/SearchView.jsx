import React from 'react';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const searchClasses = cva(
  'w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      size: {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const SearchView = ({
  // Required parameters with defaults
  placeholder = "Search by name or email...",
  text_font_size = "text-base",
  text_font_family = "Inter",
  text_font_weight = "font-normal",
  text_line_height = "leading-base",
  text_text_align = "left",
  text_color = "text-search-placeholder",
  border_border = "border-search-border",
  border_border_radius = "rounded-md",
  
  // Optional parameters (no defaults)
  layout_gap,
  layout_width,
  padding,
  position,
  
  // Standard React props
  size,
  disabled = false,
  className,
  value,
  onChange,
  onFocus,
  onBlur,
  type = "text",
  ...props
}) => {
  // Safe validation for optional parameters
  const hasValidGap = layout_gap && typeof layout_gap === 'string' && layout_gap?.trim() !== '';
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width?.trim() !== '';
  const hasValidPadding = padding && typeof padding === 'string' && padding?.trim() !== '';
  const hasValidPosition = position && typeof position === 'string' && position?.trim() !== '';

  // Build optional Tailwind classes
  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
    hasValidGap ? `gap-[${layout_gap}]` : '',
  ]?.filter(Boolean)?.join(' ');

  // Build inline styles for required parameters
  const inputStyles = {
    fontSize: text_font_size === "text-base" ? "16px" : text_font_size,
    fontFamily: text_font_family || 'Inter',
    fontWeight: text_font_weight === "font-normal" ? "400" : text_font_weight,
    lineHeight: text_line_height === "leading-base" ? "20px" : text_line_height,
    textAlign: text_text_align || 'left',
    color: text_color === "text-search-placeholder" ? "#ffffff7f" : text_color,
    borderColor: border_border === "border-search-border" ? "#d1d5dc" : border_border,
    borderRadius: border_border_radius === "rounded-md" ? "10px" : border_border_radius,
    borderWidth: '1px',
    borderStyle: 'solid',
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        style={inputStyles}
        className={twMerge(
          searchClasses({ size }),
          'bg-white placeholder:text-gray-400 focus:ring-blue-500',
          optionalClasses,
          className
        )}
        aria-disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default SearchView;