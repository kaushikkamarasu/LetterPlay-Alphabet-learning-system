'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: any) => u.email === email && u.password === password)

    if (!user) {
      alert("Invalid credentials!")
      return
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user))
    alert("Logged in successfully!")
    router.push("/") // Go to homepage
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input placeholder="Email" className="w-full mb-2 p-2 border" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" className="w-full mb-2 p-2 border" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
    </div>
  )
}
