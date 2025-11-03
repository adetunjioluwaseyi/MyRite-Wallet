"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)

  // Simple client-side test credentials for demo/testing
  // Email: demo@myrite.test
  // Password: password123
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (email === "admin@myrite.com" && password === "password123!") {
      router.push("/dashboard")
      return
    }

    setError("Invalid email or password. Try admin@myrite.com / password123!")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left side - Logo */}
      <div className="hidden md:flex md:w-1/2 bg-white flex-col items-center justify-center p-8">
        <div className="flex items-center gap-3">
          <img 
          src="/logo.png" 
          alt="MyRite Wallet Logo" 
          className="h-50 w-500"
        />
          {/* <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
            <div className="text-white text-2xl font-bold">◆</div>
          </div> */}
          <div>
            
            {/* <h1 className="text-4xl font-black text-black">MyRite</h1>
            <p className="text-purple-600 font-semibold text-lg">WALLET</p> */}
          </div>
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-900 to-purple-800 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          {/* <img 
          src="/logo.png" 
          alt="MyRite Wallet Logo" 
          className="h-10 w-auto"
        /> */}
          {/* <div className="md:hidden flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <div className="text-white text-lg font-bold">◆</div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">MyRite</h1>
              <p className="text-purple-300 font-semibold text-sm">WALLET</p>
            </div>
          </div> */}

          {/* Form Header */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-white">Nice to see you!</h2>
            <p className="text-purple-200">Enter your email and password to sign in</p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-purple-800 border border-purple-700 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-purple-800 border border-purple-700 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-purple-500"
              />
              <label htmlFor="remember" className="text-sm text-purple-200">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-purple-900 font-bold rounded-lg hover:bg-purple-50 transition"
            >
              SIGN IN
            </button>
          </form>

          {error && (
            <div className="text-sm text-red-400 text-center">{error}</div>
          )}

          

          {/* Sign Up Link */}
          <div className="text-center text-sm text-purple-200">
            Don't have an account?{" "}
            <a href="#" className="text-white font-semibold hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
