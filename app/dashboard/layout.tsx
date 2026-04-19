"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Users, Send, Settings, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

// MemberSignal Logo Component
function MemberSignalLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <rect x="4" y="22" width="8" height="14" rx="2" fill="currentColor" />
      <rect x="16" y="14" width="8" height="22" rx="2" fill="currentColor" />
      <rect x="28" y="6" width="8" height="30" rx="2" fill="currentColor" />
    </svg>
  )
}

const navItems = [
  { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
  { href: "/dashboard/members", icon: Users, label: "Members" },
  { href: "/dashboard/outreach", icon: Send, label: "Outreach" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex bg-[#2d2926]">
      {/* Sidebar */}
      <aside className="w-20 bg-[#2d2926] border-r border-[#3d3936] flex flex-col items-center py-6">
        {/* Logo */}
        <Link href="/dashboard" className="mb-8">
          <MemberSignalLogo className="w-8 h-8 text-primary" />
        </Link>
        
        {/* Navigation */}
        <nav className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  isActive ? "text-primary" : "text-white/50 hover:text-white/80"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  isActive && "bg-primary/20"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-14 bg-[#2d2926] border-b border-[#3d3936] px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MemberSignalLogo className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold text-lg">MemberSignal</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Grid Icon */}
            <button className="w-6 h-6 grid grid-cols-3 gap-0.5 opacity-60 hover:opacity-100 transition-opacity">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
              ))}
            </button>
            {/* Notification Bell */}
            <button className="relative">
              <Bell className="w-5 h-5 text-white/60 hover:text-white/80 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
            </button>
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-cream" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-[#f0ebe4] overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
