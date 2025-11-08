import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { WalletsOverview } from "@/components/wallets-overview"
import { WealthRotationInsights } from "@/components/wealth-rotation-insights"
import { WalletRevenue } from "@/components/wallet-revenue"
import { SavingsRotationInsights } from "@/components/savings-rotation-insights"
import { InstanceAccessInsights } from "@/components/instance-access-insights"
import { TopWallets } from "@/components/top-wallets"
import { Notifications } from "@/components/notifications"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

            <WalletsOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <WealthRotationInsights />
              </div>
              {/* <div>
                <InstanceAccessInsights />
              </div> */}
            </div>

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WalletRevenue />
              <SavingsRotationInsights />
            </div> */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopWallets />
              <Notifications />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
