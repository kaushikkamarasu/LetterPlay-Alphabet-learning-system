'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("All fields are required!")
      return
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    const userExists = existingUsers.find((user: any) => user.email === email)

    if (userExists) {
      alert("User already exists! Try logging in.")
      return
    }

    // Add new user
    const newUser = { name, email, password }
    const updatedUsers = [...existingUsers, newUser]
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    localStorage.setItem("loggedInUser", JSON.stringify(newUser))

    alert("Registration successful!")
    router.push("/") // Go to homepage
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input placeholder="Name" className="w-full mb-2 p-2 border" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" className="w-full mb-2 p-2 border" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="w-full mb-2 p-2 border" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</button>
    </div>
  )
}
