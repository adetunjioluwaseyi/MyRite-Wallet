"use client"

import { Card } from "@/components/ui/card"

export function WealthRotationInsights() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">Wealth Rotation Insights</h2>
      <div className="w-full h-80 flex items-end justify-between gap-2 px-4">
        <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <line x1="50" y1="250" x2="1150" y2="250" stroke="#e0e1e2" strokeWidth="1" />
          <line x1="50" y1="200" x2="1150" y2="200" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50" y1="150" x2="1150" y2="150" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50" y1="100" x2="1150" y2="100" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="50" y1="50" x2="1150" y2="50" stroke="#e0e1e2" strokeWidth="1" strokeDasharray="3,3" />

          {/* Daily Group line (purple) */}
          <polyline
            points="80,180 150,160 220,130 290,150 360,100 430,70 500,50 570,40 640,70 710,100 780,130 850,160 920,180 990,200 1060,220 1130,240"
            fill="none"
            stroke="#800080"
            strokeWidth="3"
          />

          {/* Weekly Group line (coral) */}
          <polyline
            points="80,200 150,180 220,150 290,160 360,120 430,90 500,70 570,60 640,80 710,110 780,140 850,170 920,190 990,210 1060,230 1130,250"
            fill="none"
            stroke="#ff947a"
            strokeWidth="3"
          />

          {/* Monthly Group line (green) */}
          <polyline
            points="80,220 150,200 220,170 290,180 360,140 430,110 500,90 570,80 640,100 710,130 780,160 850,190 920,210 990,230 1060,245 1130,260"
            fill="none"
            stroke="#3cd856"
            strokeWidth="3"
          />

          {/* X-axis labels */}
          <text x="80" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Jan
          </text>
          <text x="220" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Mar
          </text>
          <text x="360" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            May
          </text>
          <text x="500" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Jul
          </text>
          <text x="640" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Sept
          </text>
          <text x="780" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Nov
          </text>
          <text x="920" y="280" textAnchor="middle" fontSize="12" fill="#737791">
            Dec
          </text>
        </svg>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#800080" }}></div>
          <span className="text-sm text-muted-foreground">Daily Group</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff947a" }}></div>
          <span className="text-sm text-muted-foreground">Weekly Group</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3cd856" }}></div>
          <span className="text-sm text-muted-foreground">Monthly Group</span>
        </div>
      </div>
    </Card>
  )
}
