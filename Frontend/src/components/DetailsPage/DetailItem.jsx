/* eslint-disable react/prop-types */

export default function DetailItem({ label, value, icon, className = "" }) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${className}`}
    >
      <div className="flex items-center space-x-3">
        {icon && <div className="text-blue-600 opacity-80">{icon}</div>}
        <p className="text-sm font-medium text-gray-600 uppercase tracking-tight">
          {label}
        </p>
      </div>
      <p className="text-md font-semibold text-gray-900 text-right">{value}</p>
    </div>
  );
}
