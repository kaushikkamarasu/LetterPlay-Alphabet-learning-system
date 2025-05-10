"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Zap, Trophy, Clock, Sparkles, Award, BarChart3, Star } from "lucide-react"
import { ConfettiEffect } from "@/components/confetti-effect"
import { useUser } from "@/contexts/user-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [showConfetti, setShowConfetti] = useState(false)
  const { user, isAuthenticated, isLoading } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Show confetti when dashboard loads for authenticated users
    if (isAuthenticated && user) {
      setShowConfetti(true)

      // Hide confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 3000)

      return () => clearTimeout(timer)
    }

    // Redirect to login if not authenticated and not loading
    if (!isAuthenticated && !isLoading) {
      router.push("/login")
      toast({
        title: "Authentication required",
        description: "Please log in to view your dashboard",
        variant: "info",
      })
    }
  }, [isAuthenticated, isLoading, user, router, toast])

  // If loading or not authenticated, show loading state
  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
          <p className="text-primary font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {showConfetti && <ConfettiEffect />}

      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 mt-1">Continue your Devanagari learning journey</p>
            </div>
            <div className="flex gap-3">
              <Link href="/profile">
                <Button variant="outline" className="rounded-xl border-2 border-purple-200 hover:bg-purple-100">
                  View Profile
                </Button>
              </Link>
              <Link href="/practice">
                <Button className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Continue Learning
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vowels</span>
                    <span className="font-medium text-purple-600">{user.progress.vowels}%</span>
                  </div>
                  <Progress value={user.progress.vowels} className="h-2 bg-purple-100" />

                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-600">Consonants</span>
                    <span className="font-medium text-purple-600">{user.progress.consonants}%</span>
                  </div>
                  <Progress value={user.progress.consonants} className="h-2 bg-purple-100" />

                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-600">Words</span>
                    <span className="font-medium text-purple-600">{user.progress.words}%</span>
                  </div>
                  <Progress value={user.progress.words} className="h-2 bg-purple-100" />
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/tracks" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
                  View detailed progress →
                </Link>
              </CardFooter>
            </Card>

            <Card className="rounded-2xl border-2 border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-pink-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 flex-wrap">
                  {user.achievements.unlocked.includes("first-steps") && (
                    <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-2 rounded-lg border border-amber-300">
                      <Star className="h-6 w-6 text-amber-500 fill-amber-500" />
                    </div>
                  )}
                  {user.achievements.unlocked.includes("vowel-master") && (
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 rounded-lg border border-purple-300">
                      <Award className="h-6 w-6 text-purple-500 fill-purple-500" />
                    </div>
                  )}
                  {user.achievements.unlocked.includes("quick-learner") && (
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-lg border border-blue-300">
                      <Zap className="h-6 w-6 text-blue-500 fill-blue-500" />
                    </div>
                  )}
                  {user.achievements.unlocked.includes("consistent") && (
                    <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 rounded-lg border border-green-300">
                      <Clock className="h-6 w-6 text-green-500 fill-green-500" />
                    </div>
                  )}
                  {!user.achievements.unlocked.includes("consonant-expert") && (
                    <div className="bg-gray-100 p-2 rounded-lg border border-gray-300">
                      <Trophy className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                  {!user.achievements.unlocked.includes("top-scorer") && (
                    <div className="bg-gray-100 p-2 rounded-lg border border-gray-300">
                      <Sparkles className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/achievements" className="text-sm text-pink-600 hover:text-pink-800 font-medium">
                  View all achievements →
                </Link>
              </CardFooter>
            </Card>

            <Card className="rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Weekly Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{user.stats.daysStreak}</p>
                    <p className="text-xs text-gray-600">Days Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">{user.stats.lettersLearned}</p>
                    <p className="text-xs text-gray-600">Letters Learned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-pink-600">{user.stats.pointsEarned}</p>
                    <p className="text-xs text-gray-600">Points Earned</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/stats" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View detailed stats →
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="continue" className="mb-8">
            <TabsList className="grid grid-cols-3 h-14 rounded-xl bg-purple-100 p-1">
              <TabsTrigger
                value="continue"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
              >
                Continue Learning
              </TabsTrigger>
              <TabsTrigger
                value="recommended"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
              >
                Recommended
              </TabsTrigger>
              <TabsTrigger
                value="popular"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
              >
                Popular Tracks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="continue" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/practice" className="block">
                  <Card className="rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold">Vowels Mastery</CardTitle>
                      <CardDescription>Continue from where you left off</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">{user.progress.vowels}% Complete</span>
                        </div>
                        <Progress value={user.progress.vowels} className="h-2 bg-purple-100" />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Beginner
                        </div>
                        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Vowels
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/custom" className="block">
                  <Card className="rounded-2xl border-2 border-pink-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold">Custom Practice</CardTitle>
                      <CardDescription>Practice specific letters</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 flex gap-2">
                        <div className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          All Levels
                        </div>
                        <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Customizable
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/challenge" className="block">
                  <Card className="rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold">Daily Challenge</CardTitle>
                      <CardDescription>Complete today's challenge</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 flex gap-2">
                        <div className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Challenge
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          +50 Points
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/tracks" className="block">
                  <Card className="rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold">Consonant Combinations</CardTitle>
                      <CardDescription>Learn complex consonant combinations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 flex gap-2">
                        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Intermediate
                        </div>
                        <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Consonants
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/tracks" className="block">
                  <Card className="rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold">Word Formation</CardTitle>
                      <CardDescription>Start forming basic words</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 flex gap-2">
                        <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Intermediate
                        </div>
                        <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Words
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/tracks" className="block">
                  <Card className="rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold">Complete Beginner's Path</CardTitle>
                      <CardDescription>Most popular track for beginners</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 flex gap-2">
                        <div className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Beginner
                        </div>
                        <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Popular
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/challenge" className="block">
                  <Card className="rounded-2xl border-2 border-violet-200 shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold">Speed Writing Challenge</CardTitle>
                      <CardDescription>Test your writing speed</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mt-4 flex gap-2">
                        <div className="bg-violet-100 text-violet-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Advanced
                        </div>
                        <div className="bg-fuchsia-100 text-fuchsia-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Challenge
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

