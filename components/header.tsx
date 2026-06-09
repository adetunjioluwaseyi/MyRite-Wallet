"use client"

import { useEffect, useState } from "react"
import { Search, Bell, ChevronDown } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/mobile-sidebar"

export function Header() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const storedName = localStorage.getItem("userName")
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  return (
    <header className="bg-card border-b border-border px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        <MobileSidebar />
        <div className="hidden sm:block relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-6">
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Nigeria (NGA)</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="hidden sm:flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/user-avatar.jpg" />
            <AvatarFallback>{userName ? userName[0] : "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">
              {userName || "Guest"}
            </span>
            <span className="text-xs text-muted-foreground">Admin</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Mobile user menu */}
        <div className="sm:hidden">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/user-avatar.jpg" />
            <AvatarFallback>{userName ? userName[0] : "U"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
