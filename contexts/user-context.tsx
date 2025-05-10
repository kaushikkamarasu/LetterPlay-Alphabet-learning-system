"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define the user type
export type User = {
  id: string
  name: string
  email: string
  avatar: string
  progress: {
    vowels: number
    consonants: number
    words: number
  }
  stats: {
    daysStreak: number
    lettersLearned: number
    pointsEarned: number
    lastActive: string
  }
  achievements: {
    unlocked: string[]
    inProgress: {
      [key: string]: {
        current: number
        total: number
      }
    }
  }
}

// Define the context type
type UserContextType = {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProgress: (track: keyof User["progress"], value: number) => void
  addPoints: (points: number) => void
  unlockAchievement: (achievementId: string) => void
  updateAchievementProgress: (achievementId: string, current: number, total: number) => void
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined)

// Mock user data
const mockUser: User = {
  id: "user-1",
  name: "Demo User",
  email: "demo@example.com",
  avatar: "👨‍🎓",
  progress: {
    vowels: 75,
    consonants: 25,
    words: 0,
  },
  stats: {
    daysStreak: 7,
    lettersLearned: 12,
    pointsEarned: 320,
    lastActive: new Date().toISOString(),
  },
  achievements: {
    unlocked: ["first-steps", "vowel-master", "quick-learner", "consistent"],
    inProgress: {
      "consonant-expert": {
        current: 12,
        total: 25,
      },
      "top-scorer": {
        current: 320,
        total: 500,
      },
    },
  },
}

// Create the provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem("letterplay_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    // Simulate network delay
    setTimeout(checkAuth, 1000)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, any email/password will work
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem("letterplay_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create a new user based on the mock but with the provided name and email
    const newUser = {
      ...mockUser,
      name,
      email,
    }

    setUser(newUser)
    setIsAuthenticated(true)
    localStorage.setItem("letterplay_user", JSON.stringify(newUser))
    setIsLoading(false)
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("letterplay_user")
  }

  // Update progress function
  const updateProgress = (track: keyof User["progress"], value: number) => {
    if (!user) return

    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        [track]: value,
      },
    }

    setUser(updatedUser)
    localStorage.setItem("letterplay_user", JSON.stringify(updatedUser))
  }

  // Add points function
  const addPoints = (points: number) => {
    if (!user) return

    const updatedUser = {
      ...user,
      stats: {
        ...user.stats,
        pointsEarned: user.stats.pointsEarned + points,
      },
    }

    setUser(updatedUser)
    localStorage.setItem("letterplay_user", JSON.stringify(updatedUser))
  }

  // Unlock achievement function
  const unlockAchievement = (achievementId: string) => {
    if (!user) return

    // Check if already unlocked
    if (user.achievements.unlocked.includes(achievementId)) return

    const updatedUser = {
      ...user,
      achievements: {
        ...user.achievements,
        unlocked: [...user.achievements.unlocked, achievementId],
        inProgress: {
          ...user.achievements.inProgress,
        },
      },
    }

    // Remove from in-progress if it was there
    if (updatedUser.achievements.inProgress[achievementId]) {
      delete updatedUser.achievements.inProgress[achievementId]
    }

    setUser(updatedUser)
    localStorage.setItem("letterplay_user", JSON.stringify(updatedUser))
  }

  // Update achievement progress function
  const updateAchievementProgress = (achievementId: string, current: number, total: number) => {
    if (!user) return

    // If already completed, unlock it
    if (current >= total) {
      unlockAchievement(achievementId)
      return
    }

    const updatedUser = {
      ...user,
      achievements: {
        ...user.achievements,
        inProgress: {
          ...user.achievements.inProgress,
          [achievementId]: {
            current,
            total,
          },
        },
      },
    }

    setUser(updatedUser)
    localStorage.setItem("letterplay_user", JSON.stringify(updatedUser))
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProgress,
        addPoints,
        unlockAchievement,
        updateAchievementProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Create a hook to use the context
export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

