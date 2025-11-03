import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const stats = [
  {
    label: "Average Total",
    value: "200m",
    change: "+8% from yesterday",
    icon: "📊",
    bgColor: "bg-red-100",
    iconBg: "bg-red-500",
  },
  {
    label: "Average Wallet",
    value: "300",
    change: "+5% from yesterday",
    icon: "👤",
    bgColor: "bg-orange-100",
    iconBg: "bg-orange-500",
  },
  {
    label: "Active Clients",
    value: "700+",
    change: "+12% from yesterday",
    icon: "✓",
    bgColor: "bg-green-100",
    iconBg: "bg-green-500",
  },
  {
    label: "New Clients",
    value: "100",
    change: "0.6% from yesterday",
    icon: "👥",
    bgColor: "bg-purple-100",
    iconBg: "bg-purple-500",
  },
]

export function WalletsOverview() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Wallets Overview</h2>
          <p className="text-sm text-muted-foreground">Wallet Summary</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.bgColor} rounded-lg p-4`}>
            <div className={`${stat.iconBg} w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-foreground mb-1">{stat.label}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
