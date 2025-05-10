'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Palette, Zap, Trophy, Clock, Gamepad2, Sparkles } from "lucide-react"
import { FloatingElements } from "@/components/floating-elements"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const openRoutes = ["/login", "/signup"]

    if (!isLoggedIn && !openRoutes.includes(pathname)) {
      router.push("/login")
    }
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-400 via-fuchsia-400 to-amber-300 animate-gradient-x overflow-hidden relative">
      <FloatingElements />

      <div className="container mx-auto py-12 px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              <span className="inline-block animate-bounce delay-100">L</span>
              <span className="inline-block animate-bounce delay-200">e</span>
              <span className="inline-block animate-bounce delay-300">t</span>
              <span className="inline-block animate-bounce delay-400">t</span>
              <span className="inline-block animate-bounce delay-500">e</span>
              <span className="inline-block animate-bounce delay-600">r</span>
              <span className="inline-block animate-bounce delay-700">P</span>
              <span className="inline-block animate-bounce delay-800">l</span>
              <span className="inline-block animate-bounce delay-900">a</span>
              <span className="inline-block animate-bounce delay-1000">y</span>
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <p className="text-2xl md:text-3xl mb-10 text-purple-900 font-bold drop-shadow-md">
            Learn to write Devanagari letters in a fun and interactive way!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <Link href="/practice" className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1">
              <Button className="w-full h-24 text-lg rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg border-4 border-blue-300 flex flex-col">
                <BookOpen className="h-8 w-8 mb-1" />
                Practice Mode
              </Button>
            </Link>
            <Link href="/custom" className="transform transition-all duration-300 hover:scale-105 hover:rotate-1">
              <Button className="w-full h-24 text-lg rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg border-4 border-pink-300 flex flex-col">
                <Palette className="h-8 w-8 mb-1" />
                Custom Mode
              </Button>
            </Link>
            <Link href="/dynamic-practice" className="transform transition-all duration-300 hover:scale-105 hover:-rotate-1">
              <Button className="w-full h-24 text-lg rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg border-4 border-amber-300 flex flex-col">
                <Zap className="h-8 w-8 mb-1" />
                Dynamic Practice
              </Button>
            </Link>
            <Link href="/games" className="transform transition-all duration-300 hover:scale-105 hover:rotate-1">
              <Button className="w-full h-24 text-lg rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg border-4 border-emerald-300 flex flex-col">
                <Gamepad2 className="h-8 w-8 mb-1" />
                Fun Games
              </Button>
            </Link>
          </div>

          <div className="flex justify-center mt-20 mb-12">
            <Link href="/practice" className="transform transition-all duration-300 hover:scale-105">
              <Button className="text-lg py-6 px-10 rounded-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 shadow-xl border-4 border-purple-400">
                <Sparkles className="h-6 w-6 mr-2" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-purple-400 transform transition-all duration-500 hover:shadow-purple-300/50 hover:shadow-2xl">
            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Explore Our Learning Tracks
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-100 to-emerald-200 p-6 rounded-2xl border-2 border-emerald-300 shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-3">🌱</div>
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Beginner</h3>
                <p className="font-medium text-emerald-700">Start your journey with basic vowels and consonants</p>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-sky-200 p-6 rounded-2xl border-2 border-sky-300 shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-xl font-bold text-sky-800 mb-2">Intermediate</h3>
                <p className="font-medium text-sky-700">Build words and improve your writing speed</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-violet-200 p-6 rounded-2xl border-2 border-violet-300 shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="text-xl font-bold text-violet-800 mb-2">Advanced</h3>
                <p className="font-medium text-violet-700">Master complex characters and sentence formation</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-primary">How to Play</h2>
            <div className="grid md:grid-cols-4 gap-4 text-left">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-4 rounded-xl border-2 border-indigo-300 shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-2">1️⃣</div>
                <p className="font-medium text-indigo-800">
                  Choose a learning mode or track that matches your skill level
                </p>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-rose-200 p-4 rounded-xl border-2 border-rose-300 shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-2">2️⃣</div>
                <p className="font-medium text-rose-800">Study the reference letter and its pronunciation</p>
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-orange-200 p-4 rounded-xl border-2 border-orange-300 shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-2">3️⃣</div>
                <p className="font-medium text-orange-800">Practice drawing the letter following the animated guide</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-teal-200 p-4 rounded-xl border-2 border-teal-300 shadow-md transform transition-all duration-300 hover:scale-105">
                <div className="text-3xl mb-2">4️⃣</div>
                <p className="font-medium text-teal-800">Earn points and badges as you master each character!</p>
              </div>
            </div>
          </div> */}
{/* 
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/leaderboard" className="transform transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-200 p-6 rounded-2xl border-2 border-yellow-400 shadow-lg flex flex-col items-center">
                <Trophy className="h-12 w-12 text-amber-600 mb-2" />
                <h3 className="text-xl font-bold text-amber-800">Leaderboard</h3>
                <p className="text-amber-700 text-center">See who's at the top!</p>
              </div>
            </Link>
            <Link href="/achievements" className="transform transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-purple-100 to-fuchsia-200 p-6 rounded-2xl border-2 border-fuchsia-400 shadow-lg flex flex-col items-center">
                <Sparkles className="h-12 w-12 text-purple-600 mb-2" />
                <h3 className="text-xl font-bold text-purple-800">Achievements</h3>
                <p className="text-purple-700 text-center">Collect badges and rewards</p>
              </div>
            </Link>
            <Link href="/tracks" className="transform transition-all duration-300 hover:scale-105">
              <div className="bg-gradient-to-br from-sky-100 to-blue-200 p-6 rounded-2xl border-2 border-blue-400 shadow-lg flex flex-col items-center">
                <Clock className="h-12 w-12 text-sky-600 mb-2" />
                <h3 className="text-xl font-bold text-sky-800">Learning Tracks</h3>
                <p className="text-sky-700 text-center">Structured learning paths</p>
              </div>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

