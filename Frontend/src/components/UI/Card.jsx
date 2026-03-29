export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({ icon: Icon, label, value, color = "text-gray-400" }) {
  return (
    <Card className="p-6 flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-600 font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
      <div className={`${color} opacity-30`}>
        {Icon && <Icon size={48} />}
      </div>
    </Card>
  );
}
