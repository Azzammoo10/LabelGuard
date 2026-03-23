/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { account } from '../lib/appwrite'
import type { Models } from 'appwrite'

interface AuthContextType {
  user: Models.User<Models.Preferences> | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        // Minimum loaded delay of 600ms as requested to prevent flash
        const [userData] = await Promise.all([
          account.get(),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ])
        setUser(userData)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    init()
  }, [])

  const login = async (email: string, password: string) => {
    await account.createEmailPasswordSession(email, password)
    const userData = await account.get()
    setUser(userData)
  }

  const logout = async () => {
    await account.deleteSession('current')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
