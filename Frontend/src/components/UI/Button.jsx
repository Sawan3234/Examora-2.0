export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  ...props
}) {
  const baseStyles =
    "font-semibold rounded-lg transition-colors focus:outline-none";

  const variantStyles = {
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
    tab: "bg-transparent text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300",
    tabActive: "bg-transparent text-violet-600 border-b-2 border-violet-600",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export function IconButton({ icon: Icon, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} />}
    </button>
  );
}
