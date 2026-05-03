export default function KpiCard({ title, value, subtitle, icon, color = 'blue' }) {
  const colors = {
    blue:   'from-blue-600 to-blue-700',
    green:  'from-emerald-500 to-emerald-600',
    amber:  'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className={`bg-gradient-to-br ${colors[color]} p-4`}>
        <div className="flex items-center justify-between">
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl">
            {icon}
          </div>
        </div>
        <p className="text-white text-2xl font-bold mt-2">{value}</p>
      </div>
      {subtitle && (
        <div className="px-4 py-2 bg-gray-50">
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
      )}
    </div>
  )
}
