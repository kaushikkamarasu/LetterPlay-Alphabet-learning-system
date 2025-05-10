"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowLeft, User, Settings, Award, BarChart3, Calendar, Clock, Trophy, Star } from "lucide-react"
import { useUser } from "@/contexts/user-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // If loading or not authenticated, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
          <p className="text-primary font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    router.push("/login")
    toast({
      title: "Authentication required",
      description: "Please log in to view your profile",
      variant: "info",
    })
    return null
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
      variant: "default",
    })
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 overflow-hidden relative">
      <FloatingElements />

      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-purple-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 flex items-center">
              <User className="h-8 w-8 mr-2 text-purple-600" />
              My Profile
            </h1>
            <Button
              variant="outline"
              className="rounded-full border-2 border-red-300 text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-purple-400 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full p-6 border-4 border-purple-300 shadow-lg">
                <div className="text-6xl">{user.avatar}</div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-purple-800 mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-100 rounded-xl p-3 border-2 border-blue-200 flex items-center">
                    <Clock className="h-6 w-6 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm text-blue-800">Days Streak</p>
                      <p className="text-xl font-bold text-blue-700">{user.stats.daysStreak}</p>
                    </div>
                  </div>

                  <div className="bg-purple-100 rounded-xl p-3 border-2 border-purple-200 flex items-center">
                    <Trophy className="h-6 w-6 text-purple-600 mr-3" />
                    <div>
                      <p className="text-sm text-purple-800">Points</p>
                      <p className="text-xl font-bold text-purple-700">{user.stats.pointsEarned}</p>
                    </div>
                  </div>

                  <div className="bg-pink-100 rounded-xl p-3 border-2 border-pink-200 flex items-center">
                    <Star className="h-6 w-6 text-pink-600 mr-3" />
                    <div>
                      <p className="text-sm text-pink-800">Achievements</p>
                      <p className="text-xl font-bold text-pink-700">{user.achievements.unlocked.length}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Settings className="h-5 w-5 mr-2" />
                    Edit Profile
                  </Button>
                  <Link href="/achievements">
                    <Button variant="outline" className="rounded-xl border-2 border-purple-200 hover:bg-purple-100">
                      <Award className="h-5 w-5 mr-2" />
                      View Achievements
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-3 h-12 rounded-xl bg-purple-100 p-1 mb-6">
                <TabsTrigger
                  value="overview"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="progress"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
                >
                  Learning Progress
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
                >
                  Statistics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="rounded-xl border-2 border-purple-200 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                        Learning Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Vowels</span>
                            <span className="font-medium text-purple-600">{user.progress.vowels}%</span>
                          </div>
                          <Progress value={user.progress.vowels} className="h-2 bg-purple-100" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Consonants</span>
                            <span className="font-medium text-purple-600">{user.progress.consonants}%</span>
                          </div>
                          <Progress value={user.progress.consonants} className="h-2 bg-purple-100" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Words</span>
                            <span className="font-medium text-purple-600">{user.progress.words}%</span>
                          </div>
                          <Progress value={user.progress.words} className="h-2 bg-purple-100" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-xl border-2 border-purple-200 shadow-md">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold flex items-center">
                        <Award className="h-5 w-5 mr-2 text-purple-600" />
                        Recent Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {user.achievements.unlocked.slice(0, 3).map((achievement, index) => (
                          <div key={index} className="flex items-center p-2 bg-purple-50 rounded-lg">
                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                              <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-purple-800">
                                {achievement.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                              </p>
                            </div>
                          </div>
                        ))}

                        <Link href="/achievements" className="block">
                          <Button variant="outline" className="w-full mt-2 rounded-lg border-purple-200">
                            View All Achievements
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="progress">
                <Card className="rounded-xl border-2 border-purple-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                      Detailed Learning Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-purple-800 mb-2">Vowels</h3>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Overall Progress</span>
                          <span className="font-medium text-purple-600">{user.progress.vowels}%</span>
                        </div>
                        <Progress value={user.progress.vowels} className="h-2 bg-purple-100 mb-3" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="bg-green-100 p-2 rounded-lg text-center border border-green-200">
                            <p className="text-xl font-bold text-green-800">अ</p>
                            <p className="text-xs text-green-700">Completed</p>
                          </div>
                          <div className="bg-green-100 p-2 rounded-lg text-center border border-green-200">
                            <p className="text-xl font-bold text-green-800">आ</p>
                            <p className="text-xs text-green-700">Completed</p>
                          </div>
                          <div className="bg-green-100 p-2 rounded-lg text-center border border-green-200">
                            <p className="text-xl font-bold text-green-800">इ</p>
                            <p className="text-xs text-green-700">Completed</p>
                          </div>
                          <div className="bg-yellow-100 p-2 rounded-lg text-center border border-yellow-200">
                            <p className="text-xl font-bold text-yellow-800">ई</p>
                            <p className="text-xs text-yellow-700">In Progress</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-purple-800 mb-2">Consonants</h3>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Overall Progress</span>
                          <span className="font-medium text-purple-600">{user.progress.consonants}%</span>
                        </div>
                        <Progress value={user.progress.consonants} className="h-2 bg-purple-100 mb-3" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          <div className="bg-green-100 p-2 rounded-lg text-center border border-green-200">
                            <p className="text-xl font-bold text-green-800">क</p>
                            <p className="text-xs text-green-700">Completed</p>
                          </div>
                          <div className="bg-green-100 p-2 rounded-lg text-center border border-green-200">
                            <p className="text-xl font-bold text-green-800">ख</p>
                            <p className="text-xs text-green-700">Completed</p>
                          </div>
                          <div className="bg-yellow-100 p-2 rounded-lg text-center border border-yellow-200">
                            <p className="text-xl font-bold text-yellow-800">ग</p>
                            <p className="text-xs text-yellow-700">In Progress</p>
                          </div>
                          <div className="bg-gray-100 p-2 rounded-lg text-center border border-gray-200">
                            <p className="text-xl font-bold text-gray-800">घ</p>
                            <p className="text-xs text-gray-700">Not Started</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-purple-800 mb-2">Words</h3>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Overall Progress</span>
                          <span className="font-medium text-purple-600">{user.progress.words}%</span>
                        </div>
                        <Progress value={user.progress.words} className="h-2 bg-purple-100 mb-3" />

                        <div className="p-4 bg-gray-100 rounded-lg text-center">
                          <p className="text-gray-700">Complete consonants track to unlock words</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats">
                <Card className="rounded-xl border-2 border-purple-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                      Learning Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-blue-100 rounded-xl p-4 border-2 border-blue-200 text-center">
                        <Calendar className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                        <p className="text-sm text-blue-800">Days Active</p>
                        <p className="text-3xl font-bold text-blue-700">14</p>
                      </div>

                      <div className="bg-purple-100 rounded-xl p-4 border-2 border-purple-200 text-center">
                        <Clock className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                        <p className="text-sm text-purple-800">Total Time</p>
                        <p className="text-3xl font-bold text-purple-700">5h 23m</p>
                      </div>

                      <div className="bg-pink-100 rounded-xl p-4 border-2 border-pink-200 text-center">
                        <Trophy className="h-8 w-8 mx-auto text-pink-600 mb-2" />
                        <p className="text-sm text-pink-800">Challenges Won</p>
                        <p className="text-3xl font-bold text-pink-700">7</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-bold text-purple-800 mb-2">Activity Breakdown</h3>

                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Practice Mode</span>
                            <span className="font-medium text-purple-600">65%</span>
                          </div>
                          <Progress value={65} className="h-2 bg-purple-100" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Custom Mode</span>
                            <span className="font-medium text-purple-600">20%</span>
                          </div>
                          <Progress value={20} className="h-2 bg-purple-100" />
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Challenge Mode</span>
                            <span className="font-medium text-purple-600">15%</span>
                          </div>
                          <Progress value={15} className="h-2 bg-purple-100" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

