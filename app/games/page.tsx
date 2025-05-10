"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FloatingElements } from "@/components/floating-elements"
import { Gamepad2, ArrowLeft, Zap, Clock, Brain, Puzzle, Sparkles, ArrowUpDown, Keyboard } from "lucide-react"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useEffect } from "react"
export default function GamesPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-300 via-teal-300 to-cyan-300 animate-gradient-x overflow-hidden relative pt-20">
      <FloatingElements />

      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-emerald-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center">
              <Gamepad2 className="h-8 w-8 mr-2 text-emerald-600" />
              Fun Learning Games
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-emerald-400 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-emerald-700 text-center">Learn Devanagari Through Play</h2>
            <p className="text-lg mb-8 text-gray-700 text-center max-w-3xl mx-auto">
              Explore our collection of fun games designed to help you master Devanagari letters while having a great
              time!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              <Link href="/challenge" className="block transform transition-all duration-300 hover:scale-105">
                <Card className="rounded-2xl border-2 border-amber-300 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center text-amber-700">
                      <Zap className="h-6 w-6 mr-2 text-amber-600" />
                      Time Challenge
                    </CardTitle>
                    <CardDescription>Race against the clock</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Draw as many letters as you can before time runs out! Test your speed and accuracy.
                    </p>
                    <div className="flex gap-2">
                      <div className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        All Levels
                      </div>
                      <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Timed
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600">
                      Play Now
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link href="/games/memory" className="block transform transition-all duration-300 hover:scale-105">
                <Card className="rounded-2xl border-2 border-purple-300 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center text-purple-700">
                      <Brain className="h-6 w-6 mr-2 text-purple-600" />
                      Memory Match
                    </CardTitle>
                    <CardDescription>Match letters with sounds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Flip cards to match Devanagari letters with their correct pronunciation and meaning.
                    </p>
                    <div className="flex gap-2">
                      <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Beginner
                      </div>
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Memory
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-violet-600">
                      Play Now
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link href="/games/word-builder" className="block transform transition-all duration-300 hover:scale-105">
                <Card className="rounded-2xl border-2 border-emerald-300 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center text-emerald-700">
                      <Puzzle className="h-6 w-6 mr-2 text-emerald-600" />
                      Word Builder
                    </CardTitle>
                    <CardDescription>Create words from letters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Drag and drop letters to form words. Learn vocabulary while practicing letter recognition.
                    </p>
                    <div className="flex gap-2">
                      <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Intermediate
                      </div>
                      <div className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Vocabulary
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600">
                      Play Now
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              <Link href="/games/letter-sort" className="block transform transition-all duration-300 hover:scale-105">
                <Card className="rounded-2xl border-2 border-pink-300 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center text-pink-700">
                      <ArrowUpDown className="h-6 w-6 mr-2 text-pink-600" />
                      Letter Sort
                    </CardTitle>
                    <CardDescription>Arrange in correct order</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Sort Devanagari letters in their correct alphabetical order. Learn the sequence of the alphabet!
                    </p>
                    <div className="flex gap-2">
                      <div className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        All Levels
                      </div>
                      <div className="bg-rose-100 text-rose-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Sorting
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">Play Now</Button>
                  </CardFooter>
                </Card>
              </Link>
              <Link href="/games/spelling-bee" className="block transform transition-all duration-300 hover:scale-105">
                <Card className="rounded-2xl border-2 border-yellow-300 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center text-yellow-700">
                      <Keyboard className="h-6 w-6 mr-2 text-yellow-600" />
                      Spelling Bee
                    </CardTitle>
                    <CardDescription>Spell words correctly</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Listen to words and spell them correctly using Devanagari letters. Test your listening skills!
                    </p>
                    <div className="flex gap-2">
                      <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Intermediate
                      </div>
                      <div className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Spelling
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600">
                      Play Now
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-teal-400 transform transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-teal-700 flex items-center">
                <Clock className="h-6 w-6 mr-2 text-teal-600" />
                Coming Soon
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-100 rounded-xl">
                  <div className="bg-teal-100 p-3 rounded-lg mr-3">
                    <Sparkles className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Sentence Scramble</h4>
                    <p className="text-sm text-gray-600">Rearrange words to form correct sentences</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-100 rounded-xl">
                  <div className="bg-cyan-100 p-3 rounded-lg mr-3">
                    <Sparkles className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Pronunciation Quiz</h4>
                    <p className="text-sm text-gray-600">Test your knowledge of letter sounds</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-100 rounded-xl">
                  <div className="bg-blue-100 p-3 rounded-lg mr-3">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Crossword Puzzles</h4>
                    <p className="text-sm text-gray-600">Solve crosswords with Devanagari vocabulary</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-4 border-cyan-400 transform transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-xl font-bold mb-4 text-cyan-700">Game Benefits</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-cyan-100 p-2 rounded-full mr-3 mt-1">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Improved Retention</h4>
                    <p className="text-gray-600">
                      Games make learning more memorable and help you retain information longer
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-cyan-100 p-2 rounded-full mr-3 mt-1">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Increased Motivation</h4>
                    <p className="text-gray-600">
                      Fun challenges and rewards keep you engaged and motivated to continue learning
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-cyan-100 p-2 rounded-full mr-3 mt-1">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Practical Application</h4>
                    <p className="text-gray-600">Games provide context for using letters in real-world scenarios</p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-cyan-100 p-2 rounded-full mr-3 mt-1">
                    <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Track Progress</h4>
                    <p className="text-gray-600">
                      Game scores and achievements help you monitor your improvement over time
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

