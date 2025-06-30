'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAtomValue } from 'jotai'
import { isAuthenticatedAtom } from '@/store/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaComments } from 'react-icons/fa'

export default function HomePage() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/comments')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated) return null

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#18122B] via-[#393053] to-[#635985] flex flex-col overflow-hidden">
      {/* Blue glow accents */}
      <div className="absolute top-[-60px] left-[-60px] w-60 h-60 bg-blue-400 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-80px] right-[-40px] w-80 h-80 bg-blue-300 opacity-10 rounded-full blur-3xl z-0" />
      {/* Header with Login/Register */}
      <header className="w-full flex justify-end items-center p-4 gap-2 z-10 relative">
        <Link href="/login">
          <Button size="sm" className="font-semibold bg-gradient-to-r from-blue-400 to-blue-300 text-gray-900 border-0 shadow-md hover:from-blue-300 hover:to-blue-400">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm" variant="outline" className="font-semibold border-blue-400 text-blue-300 hover:bg-blue-400/10">
            Create Account
          </Button>
        </Link>
      </header>
      {/* Luxurious Hero Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 relative">
        <div className="backdrop-blur-2xl bg-white/10 border border-blue-400/30 rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col items-center max-w-lg w-full mx-auto" style={{boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.25)'}}>
          <span className="text-7xl md:text-8xl text-blue-400 mb-4 drop-shadow-lg"><FaComments /></span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-300 mb-2 text-center tracking-tight drop-shadow-lg" style={{fontFamily: 'serif, Georgia, Times'}}>
            CoCo
          </h1>
          <p className="text-lg md:text-xl text-blue-100 text-center max-w-lg mb-6 font-medium">
            Go Ahead and Make a Comment...
          </p>
        </div>
      </main>
    </div>
  )
}
