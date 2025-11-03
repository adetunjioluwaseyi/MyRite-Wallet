export function SaveCaveChart() {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">SaveCave Insights</h2>

      {/* SVG Chart */}
      <svg width="100%" height="300" viewBox="0 0 700 300" className="mb-4">
        {/* Grid lines */}
        {[0, 50, 100, 150, 200, 250].map((y) => (
          <line key={y} x1="60" y1={250 - y} x2="680" y2={250 - y} stroke="#e5e7eb" strokeWidth="1" />
        ))}

        {/* Y-axis */}
        <line x1="60" y1="20" x2="60" y2="260" stroke="#d1d5db" strokeWidth="2" />
        {/* X-axis */}
        <line x1="60" y1="260" x2="680" y2="260" stroke="#d1d5db" strokeWidth="2" />

        {/* Y-axis labels */}
        <text x="40" y="265" fontSize="12" fill="#9ca3af" textAnchor="end">
          0
        </text>
        <text x="40" y="215" fontSize="12" fill="#9ca3af" textAnchor="end">
          50k
        </text>
        <text x="40" y="165" fontSize="12" fill="#9ca3af" textAnchor="end">
          100k
        </text>
        <text x="40" y="115" fontSize="12" fill="#9ca3af" textAnchor="end">
          150k
        </text>
        <text x="40" y="65" fontSize="12" fill="#9ca3af" textAnchor="end">
          200k
        </text>
        <text x="40" y="25" fontSize="12" fill="#9ca3af" textAnchor="end">
          250k
        </text>

        {/* X-axis labels */}
        {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"].map((month, i) => (
          <text key={month} x={80 + i * 50} y="280" fontSize="12" fill="#9ca3af" textAnchor="middle">
            {month}
          </text>
        ))}

        {/* Line 1 - Flexible (Red) */}
        <polyline
          points="80,220 130,200 180,190 230,210 280,150 330,170 380,140 430,160 480,200 530,180 580,210 630,220"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
        />

        {/* Line 2 - Target Achievers (Green) */}
        <polyline
          points="80,180 130,160 180,140 230,120 280,100 330,110 380,130 430,100 480,120 530,90 580,130 630,150"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />

        {/* Line 3 - Flexible Weekly (Purple) */}
        <polyline
          points="80,200 130,170 180,160 230,180 280,130 330,150 380,110 430,140 480,180 530,160 580,190 630,200"
          fill="none"
          stroke="#a855f7"
          strokeWidth="2"
        />
      </svg>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-muted-foreground">Flexible</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-muted-foreground">Target Achievers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500" />
          <span className="text-sm text-muted-foreground">Flexible Weekly</span>
        </div>
      </div>
    </div>
  )
}
