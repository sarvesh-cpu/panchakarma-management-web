"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Calendar, TrendingUp, MessageCircle, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { href: "/patient/dashboard", label: "Dashboard", icon: Home },
  { href: "/patient/sessions", label: "Sessions", icon: Calendar },
  { href: "/patient/progress", label: "Progress", icon: TrendingUp },
  { href: "/patient/feedback", label: "Feedback", icon: MessageCircle },
  { href: "/patient/profile", label: "Profile", icon: User },
  { href: "/patient/settings", label: "Settings", icon: Settings },
]

export function PatientSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-card border-r border-border h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-bold text-foreground">Patient Portal</h2>
        <p className="text-sm text-muted-foreground">Welcome back, Sarah</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-12",
                pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20",
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive">
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  )
}
