'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAtomValue } from 'jotai'
import { isAuthenticatedAtom } from '@/store/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Collaborative Comment System
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time collaborative commenting platform with live typing indicators, 
            character counts, and seamless user experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Collaboration</CardTitle>
              <CardDescription>
                See who's typing in real-time with live character counts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Live typing indicators</li>
                <li>• Character count tracking</li>
                <li>• Instant message updates</li>
                <li>• User presence detection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Authentication</CardTitle>
              <CardDescription>
                Session-based authentication with secure cookies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Session-based auth</li>
                <li>• CSRF protection</li>
                <li>• Secure password hashing</li>
                <li>• Redis session storage</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-x-4">
          <Link href="/login">
            <Button size="lg" className="px-8">
              Get Started - Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="px-8">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
