"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FloatingElements } from "@/components/floating-elements"
import { ArrowLeft, BookOpen, GraduationCap, Layers, Clock, CheckCircle, Star } from "lucide-react"

export default function TracksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-purple-300 animate-gradient-x overflow-hidden relative pt-20">
      <FloatingElements />

      <div className="container mx-auto py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/dashboard">
              <Button variant="outline" className="rounded-full bg-white/80 hover:bg-white border-blue-300">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center">
              <Layers className="h-8 w-8 mr-2 text-blue-600" />
              Learning Tracks
            </h1>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-blue-400 mb-8">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-700">Beginner Track</h2>
                <p className="text-gray-600">Start your journey with Devanagari letters</p>
              </div>
              <div className="ml-auto">
                <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  In Progress
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-2 border-blue-200 rounded-2xl p-4 bg-blue-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-blue-800 flex items-center">
                    <span className="bg-blue-200 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                      1
                    </span>
                    Vowels
                  </h3>
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    75% Complete
                  </div>
                </div>
                <Progress value={75} className="h-2 mb-4" />
                <p className="text-gray-600 mb-4">Learn all the vowels in Devanagari script.</p>
                <Link href="/practice">
                  <Button className="w-full rounded-xl bg-blue-500 hover:bg-blue-600">Continue Learning</Button>
                </Link>
              </div>

              <div className="border-2 border-indigo-200 rounded-2xl p-4 bg-indigo-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-indigo-800 flex items-center">
                    <span className="bg-indigo-200 text-indigo-800 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                      2
                    </span>
                    Consonants
                  </h3>
                  <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <Star className="h-3 w-3 mr-1" />
                    25% Complete
                  </div>
                </div>
                <Progress value={25} className="h-2 mb-4" />
                <p className="text-gray-600 mb-4">Learn the most common consonants.</p>
                <Link href="/practice">
                  <Button className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600">Continue Learning</Button>
                </Link>
              </div>

              <div className="border-2 border-purple-200 rounded-2xl p-4 bg-purple-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-purple-800 flex items-center">
                    <span className="bg-purple-200 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                      3
                    </span>
                    Simple Words
                  </h3>
                  <div className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Coming Soon
                  </div>
                </div>
                <Progress value={0} className="h-2 mb-4" />
                <p className="text-gray-600 mb-4">Form basic words by combining vowels and consonants.</p>
                <Button className="w-full rounded-xl bg-gray-300 text-gray-600 cursor-not-allowed">
                  Complete Consonants First
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-indigo-400">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-indigo-700">Intermediate Track</h2>
                <p className="text-gray-600">For learners who know the basics</p>
              </div>
              <div className="ml-auto">
                <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Coming Soon</div>
              </div>
            </div>

            <div className="text-center py-8">
              <Clock className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">Coming Soon!</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We're working on developing the Intermediate track. Check back soon for new content!
              </p>
              <Link href="/practice">
                <Button className="rounded-xl bg-indigo-500 hover:bg-indigo-600 px-8">Practice Beginner Content</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

