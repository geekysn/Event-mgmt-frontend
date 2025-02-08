import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { login as apiLogin, register as apiRegister, loginAsGuest as apiLoginAsGuest } from "../services/api"

interface User {
  id: string
  name: string
  email: string
  role?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginAsGuest: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    const userData = await apiLogin(email, password)
    setUser(userData.user)
    localStorage.setItem("user", JSON.stringify(userData.user))
    localStorage.setItem("token", userData.token)
  }

  const register = async (name: string, email: string, password: string) => {
    const userData = await apiRegister(name, email, password)
    setUser(userData.user)
    localStorage.setItem("user", JSON.stringify(userData.user))
    localStorage.setItem("token", userData.token)
  }

  const loginAsGuest = async () => {
    const userData = await apiLoginAsGuest()
    setUser(userData.user)
    localStorage.setItem("user", JSON.stringify(userData.user))
    localStorage.setItem("token", userData.token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
  }

  return <AuthContext.Provider value={{ user, login, register, loginAsGuest, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

