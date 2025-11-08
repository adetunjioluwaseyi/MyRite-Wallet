"use client"

import { useState } from "react"
import {
  TrendingUp,
  ShoppingCart,
  FileText,
  Bell,
  LayoutDashboard,
  Users,
  ChevronDown,
  LogOut,
  Mail,
  Gift,
} from "lucide-react"
import { usePathname } from "next/navigation"

export function Sidebar({ currentPage }: { currentPage?: string }) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["wealth-rotation", "save-cave"])

  const isDashboard = pathname === "/dashboard"

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const isExpanded = (item: string) => expandedItems.includes(item)

  return (
    <aside className="w-64 bg-card border-r border-border p-6 flex flex-col h-screen">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <img src="/logo.png" alt="MyRite Wallet Logo" className="h-10 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1 overflow-y-auto">
        <a
          href="/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
            isDashboard
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </a>

        <div>
          <button
            onClick={() => toggleExpand("wealth-rotation")}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
              pathname.includes("wealth-rotation")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Wealth Rotation</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded("wealth-rotation") ? "rotate-180" : ""}`}
            />
          </button>

          {isExpanded("wealth-rotation") && (
            <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted">
              <a
                href="/wealth-rotation#overview"
                className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
              >
                Overview
              </a>
              <a
                href="/wealth-rotation#daily"
                className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
              >
                Daily Group
              </a>
              <a
                href="/wealth-rotation#weekly"
                className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
              >
                Weekly Group
              </a>
              <a
                href="/wealth-rotation#monthly"
                className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
              >
                Monthly Group
              </a>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleExpand("save-cave")}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors text-sm ${
              pathname.includes("save-cave")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <span className="flex items-center gap-3">
              <Gift className="w-5 h-5" />
              {/* <ShoppingCart className="w-5 h-5" /> */}
              <span className="font-medium">SaveCave</span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded("save-cave") ? "rotate-180" : ""}`} />
          </button>

          {isExpanded("save-cave") && (
            <div className="space-y-1 mt-1 ml-2 pl-3 border-l border-muted">
              <a
                href="/save-cave#overview"
                className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
              >
                Overview
              </a>
              <a
                href="/save-cave#flex-me"
                className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
              >
                Flexible Savings
              </a>
              <a
                href="/save-cave#target-achievers"
                className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
              >
                Target Achievers
              </a>
              <a
                href="/save-cave#instant-access"
                className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
              >
                Instant Access
              </a>
            </div>
          )}
        </div>

        <a
          href="/view-wallets"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("view-wallets")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">View Wallets</span>
        </a>

        <a
          href="/payment-approval"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("payment-approval")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Payment Approvals</span>
        </a>

        <a
          href="/add-to-group"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("add-to-group")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="font-medium">Add to Group</span>
        </a>

        <a
          href="/reports"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("reports")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium">Reports</span>
        </a>

        <a
          href="/admin-edit"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("send-messages")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Users  className="w-5 h-5" />
          <span className="font-medium">Profile</span>
        </a>

        <a
          href="/notifications"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
            pathname.includes("notifications")
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Bell className="w-5 h-5" />
          <span className="font-medium">Notifications</span>
        </a>
      </nav>

      {/* Sign Out Button */}
      <a
        href="/"
        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Sign Out</span>
      </a>
    </aside>
  )
}
