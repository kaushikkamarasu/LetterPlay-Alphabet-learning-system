"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowLeft, Trophy, Medal, Crown, Users } from "lucide-react"

// Sample leaderboard data
const weeklyLeaders = [
  { rank: 1, name: "Arjun S.", score: 1250, avatar: "👨‍🎓" },
  { rank: 2, name: "Priya M.", score: 1120, avatar: "👩‍🎓" },
  { rank: 3, name: "Rahul K.", score: 980, avatar: "👨‍💼" },
  { rank: 4, name: "Ananya P.", score: 920, avatar: "👩‍💻" },
  { rank: 5, name: "Vikram J.", score: 890, avatar: "👨‍🔬" },
  { rank: 6, name: "Meera R.", score: 850, avatar: "👩‍🏫" },
  { rank: 7, name: "Karan T.", score: 820, avatar: "👨‍🎨" },
  { rank: 8, name: "Divya S.", score: 780, avatar: "👩‍🚀" },
  { rank: 9, name: "Nikhil G.", score: 750, avatar: "👨‍⚕️" },
  { rank: 10, name: "Sneha D.", score: 720, avatar: "👩‍⚖️" },
]

const allTimeLeaders = [
  { rank: 1, name: "Priya M.", score: 15680, avatar: "👩‍🎓" },
  { rank: 2, name: "Arjun S.", score: 14250, avatar: "👨‍🎓" },
  { rank: 3, name: "Vikram J.", score: 12890, avatar: "👨‍🔬" },
  { rank: 4, name: "Ananya P.", score: 11920, avatar: "👩‍💻" },
  { rank: 5, name: "Rahul K.", score: 10980, avatar: "👨‍💼" },
  { rank: 6, name: "Divya S.", score: 9780, avatar: "👩‍🚀" },
  { rank: 7, name: "Nikhil G.", score: 9750, avatar: "👨‍⚕️" },
  { rank: 8, name: "Meera R.", score: 8850, avatar: "👩‍🏫" },
  { rank: 9, name: "Karan T.", score: 7820, avatar: "👨‍🎨" },
  { rank: 10, name: "Sneha D.", score: 6720, avatar: "👩‍⚖️" },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-300 via-orange-300 to-red-300 animate-gradient-x overflow-hidden relative">
      <FloatingElements />

      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-amber-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 flex items-center">
              <Trophy className="h-8 w-8 mr-2 text-amber-600" />
              Leaderboard
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-amber-400 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="h-6 w-6 mr-2 text-amber-600" />
                <h2 className="text-xl font-bold text-amber-700">Top Learners</h2>
              </div>
              <div className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                Your Rank: #42
              </div>
            </div>

            <Tabs defaultValue="weekly" className="mb-6">
              <TabsList className="grid grid-cols-2 h-12 rounded-xl bg-amber-100 p-1 mb-6">
                <TabsTrigger
                  value="weekly"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-md"
                >
                  This Week
                </TabsTrigger>
                <TabsTrigger
                  value="alltime"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-md"
                >
                  All Time
                </TabsTrigger>
              </TabsList>

              <TabsContent value="weekly">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* 2nd Place */}
                    <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl p-4 text-center border-2 border-gray-300 transform translate-y-4">
                      <div className="relative">
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                          <Medal className="h-8 w-8 text-gray-500" />
                        </div>
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl mx-auto mt-2">
                          {weeklyLeaders[1].avatar}
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 mt-2">{weeklyLeaders[1].name}</p>
                      <p className="text-amber-600 font-bold">{weeklyLeaders[1].score} pts</p>
                      <div className="bg-gray-300 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full mx-auto w-fit mt-1">
                        2nd Place
                      </div>
                    </div>

                    {/* 1st Place */}
                    <div className="bg-gradient-to-b from-amber-100 to-amber-200 rounded-2xl p-4 text-center border-2 border-amber-400 transform -translate-y-2">
                      <div className="relative">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                          <Crown className="h-10 w-10 text-amber-500 fill-amber-500" />
                        </div>
                        <div className="w-20 h-20 bg-amber-300 rounded-full flex items-center justify-center text-3xl mx-auto mt-2">
                          {weeklyLeaders[0].avatar}
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 mt-2">{weeklyLeaders[0].name}</p>
                      <p className="text-amber-600 font-bold">{weeklyLeaders[0].score} pts</p>
                      <div className="bg-amber-300 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mx-auto w-fit mt-1">
                        1st Place
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="bg-gradient-to-b from-orange-100 to-orange-200 rounded-2xl p-4 text-center border-2 border-orange-300 transform translate-y-4">
                      <div className="relative">
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                          <Medal className="h-8 w-8 text-orange-500" />
                        </div>
                        <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center text-2xl mx-auto mt-2">
                          {weeklyLeaders[2].avatar}
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 mt-2">{weeklyLeaders[2].name}</p>
                      <p className="text-amber-600 font-bold">{weeklyLeaders[2].score} pts</p>
                      <div className="bg-orange-300 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full mx-auto w-fit mt-1">
                        3rd Place
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl overflow-hidden border border-amber-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-amber-100">
                          <th className="py-3 px-4 text-left text-amber-800">Rank</th>
                          <th className="py-3 px-4 text-left text-amber-800">User</th>
                          <th className="py-3 px-4 text-right text-amber-800">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {weeklyLeaders.slice(3).map((user) => (
                          <tr key={user.rank} className="border-t border-amber-200 hover:bg-amber-100/50">
                            <td className="py-3 px-4 text-gray-700">{user.rank}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center mr-2">
                                  {user.avatar}
                                </div>
                                <span className="font-medium text-gray-800">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-amber-600">{user.score} pts</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="alltime">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {/* 2nd Place */}
                    <div className="bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl p-4 text-center border-2 border-gray-300 transform translate-y-4">
                      <div className="relative">
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                          <Medal className="h-8 w-8 text-gray-500" />
                        </div>
                        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl mx-auto mt-2">
                          {allTimeLeaders[1].avatar}
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 mt-2">{allTimeLeaders[1].name}</p>
                      <p className="text-amber-600 font-bold">{allTimeLeaders[1].score} pts</p>
                      <div className="bg-gray-300 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full mx-auto w-fit mt-1">
                        2nd Place
                      </div>
                    </div>

                    {/* 1st Place */}
                    <div className="bg-gradient-to-b from-amber-100 to-amber-200 rounded-2xl p-4 text-center border-2 border-amber-400 transform -translate-y-2">
                      <div className="relative">
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                          <Crown className="h-10 w-10 text-amber-500 fill-amber-500" />
                        </div>
                        <div className="w-20 h-20 bg-amber-300 rounded-full flex items-center justify-center text-3xl mx-auto mt-2">
                          {allTimeLeaders[0].avatar}
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 mt-2">{allTimeLeaders[0].name}</p>
                      <p className="text-amber-600 font-bold">{allTimeLeaders[0].score} pts</p>
                      <div className="bg-amber-300 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mx-auto w-fit mt-1">
                        1st Place
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="bg-gradient-to-b from-orange-100 to-orange-200 rounded-2xl p-4 text-center border-2 border-orange-300 transform translate-y-4">
                      <div className="relative">
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                          <Medal className="h-8 w-8 text-orange-500" />
                        </div>
                        <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center text-2xl mx-auto mt-2">
                          {allTimeLeaders[2].avatar}
                        </div>
                      </div>
                      <p className="font-bold text-gray-800 mt-2">{allTimeLeaders[2].name}</p>
                      <p className="text-amber-600 font-bold">{allTimeLeaders[2].score} pts</p>
                      <div className="bg-orange-300 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full mx-auto w-fit mt-1">
                        3rd Place
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-xl overflow-hidden border border-amber-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-amber-100">
                          <th className="py-3 px-4 text-left text-amber-800">Rank</th>
                          <th className="py-3 px-4 text-left text-amber-800">User</th>
                          <th className="py-3 px-4 text-right text-amber-800">Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allTimeLeaders.slice(3).map((user) => (
                          <tr key={user.rank} className="border-t border-amber-200 hover:bg-amber-100/50">
                            <td className="py-3 px-4 text-gray-700">{user.rank}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center mr-2">
                                  {user.avatar}
                                </div>
                                <span className="font-medium text-gray-800">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-amber-600">{user.score} pts</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <p className="text-gray-600 mb-4">Keep practicing to climb the leaderboard!</p>
              <Link href="/practice">
                <Button className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8">Practice Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

