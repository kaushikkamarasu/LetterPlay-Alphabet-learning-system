"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/user-context"
import { Menu, Home, BookOpen, Palette, HelpCircle, Trophy, User, Gamepad2, Layers, LogOut, LogIn } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useUser()

  const handleLogout = () => {
    logout()
    setOpen(false)
  }

  const navItems = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5 mr-3" /> },
    { href: "/dashboard", label: "Dashboard", icon: <User className="h-5 w-5 mr-3" /> },
    { href: "/practice", label: "Practice", icon: <BookOpen className="h-5 w-5 mr-3" /> },
    { href: "/custom", label: "Custom", icon: <Palette className="h-5 w-5 mr-3" /> },
    { href: "/tracks", label: "Tracks", icon: <Layers className="h-5 w-5 mr-3" /> },
    { href: "/games", label: "Games", icon: <Gamepad2 className="h-5 w-5 mr-3" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <Trophy className="h-5 w-5 mr-3" /> },
    { href: "/help", label: "Help", icon: <HelpCircle className="h-5 w-5 mr-3" /> },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-2 md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col h-full">
          <div className="py-4 border-b">
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                LetterPlay
              </span>
            </Link>
          </div>

          <nav className="flex-1 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center py-2 px-3 rounded-lg transition-colors ${
                      pathname === item.href ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="py-4 border-t">
            {isAuthenticated ? (
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  <LogIn className="h-5 w-5 mr-3" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

