export function Badge({ label, variant = "default", className = "" }) {
  const variantStyles = {
    default: "bg-gray-100 text-gray-700",
    primary: "bg-blue-100 text-blue-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-2 bg-current"></span>
      {label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const statusMap = {
    "In Progress": "primary",
    Completed: "success",
    Flagged: "danger",
    "Not Started": "default",
  };

  return <Badge label={status} variant={statusMap[status] || "default"} />;
}
