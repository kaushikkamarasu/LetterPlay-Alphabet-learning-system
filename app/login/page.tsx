"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FloatingElements } from "@/components/floating-elements"
import { LogIn, Github, ChromeIcon as Google } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useUser()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
  
    try {
      setIsLoading(true);
  
      // 1. Get stored users from localStorage (expecting an array of users)
      const storedUsersString = localStorage.getItem("letterplay_users");
  
      if (!storedUsersString) {
        toast({
          title: "No accounts found",
          description: "Please sign up first",
          variant: "destructive",
        });
        return;
      }
  
      const users = JSON.parse(storedUsersString); // should be an array
  
      if (!Array.isArray(users)) {
        throw new Error("Invalid data format in localStorage");
      }
  
      // 2. Try to find a user with matching credentials
      const matchedUser = users.find(
        (user: any) =>
          user.email === email.trim() && user.password === password.trim()
      );
  
      if (matchedUser) {
        localStorage.setItem("isLoggedIn", "true")
        // Optional: store logged-in status
        localStorage.setItem("letterplay_logged_in", "true");
        localStorage.setItem("letterplay_current_user", JSON.stringify(matchedUser)); // Optional: store current user
  
        toast({
          title: "Login successful",
          description: `Welcome back, ${matchedUser.name}!`,
          variant: "success",
        });
  
        router.push("/");
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} login`,
      description: "Social login is not implemented in this demo",
      variant: "info",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 via-fuchsia-400 to-amber-300 animate-gradient-x overflow-hidden relative pt-2">
      <FloatingElements />

      <div className="mt-20 container mx-auto py-12 px-4 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-purple-400">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Welcome Back!
              </h1>
              <p className="text-gray-600 mt-2">Sign in to continue your learning journey</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl border-2 border-purple-200 focus:border-purple-400 h-12"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Password
                  </Label>
                  {/* <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                    Forgot password?
                  </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl border-2 border-purple-200 focus:border-purple-400 h-12"
                />
              </div>

              <div className="flex items-center space-x-2">
                {/* <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me for 30 days
                </Label> */}
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold text-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-100"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <Google className="h-5 w-5 mr-2 text-red-500" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-2 border-gray-300 hover:bg-gray-100"
                  onClick={() => handleSocialLogin("GitHub")}
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-purple-600 hover:text-purple-800 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

