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
  Settings,
  UserPlus,
} from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export function Sidebar({ currentPage }: { currentPage?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState<string[]>(["wallet-management"])

  const isDashboard = pathname === "/dashboard"

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const isExpanded = (section: string) => expandedSections.includes(section)

  return (
    <aside className="w-64 bg-card border-r border-border p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <img src="/logo.png" alt="MyRite Wallet Logo" className="h-10 w-auto" />
      </div>

      <nav className="space-y-2 flex-1">
        {/* Dashboard Link */}
        <a
          href="/dashboard"
          className={`w-full justify-start gap-3 rounded-full flex items-center px-4 py-2 transition-colors ${
            isDashboard
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </a>

        {/* SECTION 1: WALLET MANAGEMENT */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("wallet-management")}
            className="w-full justify-between flex items-center px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <span>Wallet Management</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded("wallet-management") ? "rotate-180" : ""}`}
            />
          </button>

          {isExpanded("wallet-management") && (
            <div className="space-y-1 ml-2 mt-2 pl-4 border-l border-muted">
              {/* Wealth Rotation */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleSection("wealth-rotation")}
                  className={`w-full justify-between flex items-center px-4 py-2 rounded-lg transition-colors text-sm ${
                    pathname.includes("wealth-rotation")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Wealth Rotation
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${isExpanded("wealth-rotation") ? "rotate-180" : ""}`}
                  />
                </button>

                {isExpanded("wealth-rotation") && (
                  <div className="space-y-1 ml-2 pl-3">
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

              {/* SaveCave */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleSection("save-cave")}
                  className={`w-full justify-between flex items-center px-4 py-2 rounded-lg transition-colors text-sm ${
                    pathname.includes("save-cave")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    SaveCave
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${isExpanded("save-cave") ? "rotate-180" : ""}`}
                  />
                </button>

                {isExpanded("save-cave") && (
                  <div className="space-y-1 ml-2 pl-3">
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
                      Flex Me
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
            </div>
          )}
        </div>

        {/* SECTION 2: USER MANAGEMENT */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("user-management")}
            className="w-full justify-between flex items-center px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <span>User Management</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded("user-management") ? "rotate-180" : ""}`}
            />
          </button>

          {isExpanded("user-management") && (
            <div className="space-y-1 ml-2 mt-2 pl-4 border-l border-muted">
              <a
                href="/view-wallets"
                className={`w-full justify-start gap-3 flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                  pathname.includes("view-wallets")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>View User Wallet</span>
              </a>

              <a
                href="/payment-approval"
                className={`w-full justify-start gap-3 flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                  pathname.includes("payment-approval")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Payment Approval</span>
              </a>

              <a
                href="/add-to-group"
                className={`w-full justify-start gap-3 flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                  pathname.includes("add-to-group")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Add to Group</span>
              </a>

              <a
                href="/notifications"
                className={`w-full justify-start gap-3 flex items-center px-4 py-2 rounded-lg text-sm transition-colors ${
                  pathname.includes("notifications")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Bell className="w-4 h-4" />
                <span>Notifications/Complains</span>
              </a>
            </div>
          )}
        </div>

        {/* SECTION 3: REPORTS & PROFILE */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection("reports-profile")}
            className="w-full justify-between flex items-center px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <span>Reports & Profile</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isExpanded("reports-profile") ? "rotate-180" : ""}`}
            />
          </button>

          {isExpanded("reports-profile") && (
            <div className="space-y-1 ml-2 mt-2 pl-4 border-l border-muted">
              {/* Reports */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleSection("reports")}
                  className={`w-full justify-between flex items-center px-4 py-2 rounded-lg transition-colors text-sm ${
                    pathname.includes("reports")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Reports
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${isExpanded("reports") ? "rotate-180" : ""}`}
                  />
                </button>

                {isExpanded("reports") && (
                  <div className="space-y-1 ml-2 pl-3">
                    <a
                      href="/reports"
                      className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
                    >
                      All Types of Wallets
                    </a>
                    <a
                      href="/reports"
                      className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
                    >
                      Users Report
                    </a>
                    <a
                      href="/reports"
                      className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
                    >
                      Payment Approval Reports
                    </a>
                    <a
                      href="/reports"
                      className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
                    >
                      Credit Approval Reports
                    </a>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="space-y-1">
                <button
                  onClick={() => toggleSection("profile")}
                  className={`w-full justify-between flex items-center px-4 py-2 rounded-lg transition-colors text-sm ${
                    pathname.includes("profile")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Profile
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform ${isExpanded("profile") ? "rotate-180" : ""}`}
                  />
                </button>

                {isExpanded("profile") && (
                  <div className="space-y-1 ml-2 pl-3">
                    <a
                      href="/admin-edit"
                      className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
                    >
                      Admin Edit
                    </a>
                    <a
                      href="/create-admin"
                      className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
                    >
                      Create New Admin/User
                    </a>
                    <a
                      href="/sign-out"
                      className="text-xs text-muted-foreground hover:text-foreground block px-2 py-1 rounded hover:bg-muted"
                    >
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </aside>
  )
}
