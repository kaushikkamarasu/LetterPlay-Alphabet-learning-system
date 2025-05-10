"use client"
import { useRouter } from "next/navigation" // make sure this is imported!
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Palette, HelpCircle, User, Gamepad2, Layers, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/hooks/use-toast"
import { Router } from "next/router"

export default function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useUser()
  const { toast } = useToast()
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  // Handle scroll behavior for navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      // Make navbar visible when scrolling up or at the top
      // Hide when scrolling down
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)

      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos])

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false")
  
    logout()
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      variant: "default",
    })
    router.push("/login") // redirect to login after logout
  }

  return (
    <nav
      className={`bg-white/90 backdrop-blur-sm shadow-lg py-3 fixed top-0 left-0 right-0 z-50 border-b-4 border-primary transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MobileNav />
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                LetterPlay
              </span>
            </Link>
          </div>

          <div className="hidden md:flex space-x-1 md:space-x-4">
          
            <Link
              href="/"
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/" ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Link>

            {/* <Link
              href="/dashboard"
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/dashboard" ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </Link> */}

            <Link
              href="/practice"
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/practice" ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-xs mt-1">Practice</span>
            </Link>
            <Link
              href="/dynamic-practice"
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/dynamic-practice" ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-xs mt-1">Dynamic Practice</span>
            </Link>
            <Link
              href="/custom"
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/custom" ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Palette className="h-5 w-5" />
              <span className="text-xs mt-1">Custom</span>
            </Link>
            
            {/* <Link
              href="/tracks"
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/tracks" ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Layers className="h-5 w-5" />
              <span className="text-xs mt-1">Tracks</span>
            </Link> */}

            <Link
              href="/games"
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/games" ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Gamepad2 className="h-5 w-5" />
              <span className="text-xs mt-1">Games</span>
            </Link>
            {pathname !== "/login" && pathname !== "/signup" && (
            <div className="ml-auto hidden md:flex">
              <button
                onClick={() => {
                  setTimeout(() => {
                    handleLogout()
                  }, 1000)
                }}
                className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-xs mt-1">SignOut</span>
              </button>
            </div>
          )}
            {/* <Link
              href="/help"
              className={`flex flex-col items-center p-2 rounded-lg ${
                pathname === "/help" ? "bg-primary/20 text-primary" : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <HelpCircle className="h-5 w-5" />
              <span className="text-xs mt-1">Help</span>
            </Link> */}
          </div>

          <div className="hidden md:block">
            {false ? (
              <div className="flex items-center gap-3">
                <Link href="/profile">
                  <Button variant="ghost" className="rounded-full h-10 w-10 p-0 bg-primary/10">
                    <span className="text-lg">{user?.avatar || "👤"}</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="rounded-full border-2 border-primary text-primary hover:bg-primary/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  className=" hidden rounded-full border-0 border-primary text-primary hover:bg-primary/10"
                >
                  {/* Sign In */}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

