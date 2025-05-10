"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowLeft, Trophy, Medal, Star, Award, Sparkles, Zap, Clock, BookOpen } from "lucide-react"

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-fuchsia-300 to-pink-300 animate-gradient-x overflow-hidden relative">
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
              <Trophy className="h-8 w-8 mr-2 text-purple-600" />
              Achievements
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-purple-400 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Star className="h-6 w-6 mr-2 text-purple-600 fill-purple-600" />
                <h2 className="text-xl font-bold text-purple-700">Your Achievements</h2>
              </div>
              <div className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                8/24 Unlocked
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="grid grid-cols-3 h-12 rounded-xl bg-purple-100 p-1 mb-6">
                <TabsTrigger
                  value="all"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="unlocked"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
                >
                  Unlocked
                </TabsTrigger>
                <TabsTrigger
                  value="locked"
                  className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md"
                >
                  Locked
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Unlocked Achievements */}
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-4 border-2 border-amber-300 shadow-md">
                    <div className="flex items-center mb-2">
                      <div className="bg-amber-300 p-2 rounded-full mr-3">
                        <Star className="h-6 w-6 text-amber-700 fill-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-amber-800">First Steps</h3>
                        <p className="text-xs text-amber-700">Complete your first lesson</p>
                      </div>
                    </div>
                    <div className="bg-amber-300/50 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Unlocked
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 border-2 border-purple-300 shadow-md">
                    <div className="flex items-center mb-2">
                      <div className="bg-purple-300 p-2 rounded-full mr-3">
                        <BookOpen className="h-6 w-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-purple-800">Vowel Master</h3>
                        <p className="text-xs text-purple-700">Learn all vowels</p>
                      </div>
                    </div>
                    <div className="bg-purple-300/50 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Unlocked
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 border-2 border-blue-300 shadow-md">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-300 p-2 rounded-full mr-3">
                        <Zap className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-800">Quick Learner</h3>
                        <p className="text-xs text-blue-700">Complete 5 lessons in one day</p>
                      </div>
                    </div>
                    <div className="bg-blue-300/50 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Unlocked
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 border-2 border-green-300 shadow-md">
                    <div className="flex items-center mb-2">
                      <div className="bg-green-300 p-2 rounded-full mr-3">
                        <Clock className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-green-800">Consistent</h3>
                        <p className="text-xs text-green-700">Practice for 7 days in a row</p>
                      </div>
                    </div>
                    <div className="bg-green-300/50 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Unlocked
                    </div>
                  </div>

                  {/* Locked Achievements */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-2 border-gray-300 shadow-md opacity-70">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-300 p-2 rounded-full mr-3">
                        <Award className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700">Consonant Expert</h3>
                        <p className="text-xs text-gray-600">Master all consonants</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-300/50 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                        In Progress
                      </div>
                      <div className="text-xs text-gray-600">12/25</div>
                    </div>
                    <Progress value={48} className="h-1.5 mt-2" />
                  </div>

                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-2 border-gray-300 shadow-md opacity-70">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-300 p-2 rounded-full mr-3">
                        <Medal className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700">Top Scorer</h3>
                        <p className="text-xs text-gray-600">Score 500+ in Challenge Mode</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-300/50 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                        In Progress
                      </div>
                      <div className="text-xs text-gray-600">320/500</div>
                    </div>
                    <Progress value={64} className="h-1.5 mt-2" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="unlocked">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl p-4 border-2 border-amber-300 shadow-md">
                    <div className="flex items-center mb-2">
                      <div className="bg-amber-300 p-2 rounded-full mr-3">
                        <Star className="h-6 w-6 text-amber-700 fill-amber-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-amber-800">First Steps</h3>
                        <p className="text-xs text-amber-700">Complete your first lesson</p>
                      </div>
                    </div>
                    <div className="bg-amber-300/50 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Unlocked
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 border-2 border-purple-300 shadow-md">
                    <div className="flex items-center mb-2">
                      <div className="bg-purple-300 p-2 rounded-full mr-3">
                        <BookOpen className="h-6 w-6 text-purple-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-purple-800">Vowel Master</h3>
                        <p className="text-xs text-purple-700">Learn all vowels</p>
                      </div>
                    </div>
                    <div className="bg-purple-300/50 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Unlocked
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 border-2 border-blue-300 shadow-md">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-300 p-2 rounded-full mr-3">
                        <Zap className="h-6 w-6 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-800">Quick Learner</h3>
                        <p className="text-xs text-blue-700">Complete 5 lessons in one day</p>
                      </div>
                    </div>
                    <div className="bg-blue-300/50 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Unlocked
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 border-2 border-green-300 shadow-md">
                    <div className="flex items-center mb-2">
                      <div className="bg-green-300 p-2 rounded-full mr-3">
                        <Clock className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-bold text-green-800">Consistent</h3>
                        <p className="text-xs text-green-700">Practice for 7 days in a row</p>
                      </div>
                    </div>
                    <div className="bg-green-300/50 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                      Unlocked
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="locked">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-2 border-gray-300 shadow-md opacity-70">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-300 p-2 rounded-full mr-3">
                        <Award className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700">Consonant Expert</h3>
                        <p className="text-xs text-gray-600">Master all consonants</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-300/50 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                        In Progress
                      </div>
                      <div className="text-xs text-gray-600">12/25</div>
                    </div>
                    <Progress value={48} className="h-1.5 mt-2" />
                  </div>

                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-2 border-gray-300 shadow-md opacity-70">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-300 p-2 rounded-full mr-3">
                        <Medal className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700">Top Scorer</h3>
                        <p className="text-xs text-gray-600">Score 500+ in Challenge Mode</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-300/50 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                        In Progress
                      </div>
                      <div className="text-xs text-gray-600">320/500</div>
                    </div>
                    <Progress value={64} className="h-1.5 mt-2" />
                  </div>

                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 border-2 border-gray-300 shadow-md opacity-70">
                    <div className="flex items-center mb-2">
                      <div className="bg-gray-300 p-2 rounded-full mr-3">
                        <Sparkles className="h-6 w-6 text-gray-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700">Word Builder</h3>
                        <p className="text-xs text-gray-600">Form 20 words correctly</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-300/50 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full w-fit">
                        In Progress
                      </div>
                      <div className="text-xs text-gray-600">8/20</div>
                    </div>
                    <Progress value={40} className="h-1.5 mt-2" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <p className="text-gray-600 mb-4">Keep practicing to unlock more achievements!</p>
              <Link href="/practice">
                <Button className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-8">
                  Continue Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

