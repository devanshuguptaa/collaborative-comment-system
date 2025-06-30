'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { userAtom } from '@/store/auth'
import { commentsAtom } from '@/store/comments'
import { authAPI, commentsAPI } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useWebSocket } from '@/hooks/use-websocket'
import { CommentForm } from '@/components/comments/comment-form'
import { CommentList } from '@/components/comments/comment-list'
import { TypingIndicator } from '@/components/presence/typing-indicator'
import { LiveCharacterCount } from '@/components/presence/live-character-count'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LogOut, User } from 'lucide-react'
import { toast } from 'sonner'
import { useEffect } from 'react'

export default function CommentsClient({ initialComments }: { initialComments: any[] }) {
  const router = useRouter()
  const user = useAtomValue(userAtom)
  const setUser = useSetAtom(userAtom)
  const setComments = useSetAtom(commentsAtom)

  // Hydrate user state from session on mount
  useEffect(() => {
    authAPI.me()
      .then(setUser)
      .catch(() => setUser(null))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Always fetch comments from backend on mount to ensure fresh data after refresh
  useEffect(() => {
    commentsAPI.getComments().then(setComments)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Initialize WebSocket connection for live features
  useWebSocket(user?.id, user?.name)

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      setUser(null)
      router.push('/')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Failed to logout')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Collaborative Comments
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <User className="w-4 h-4" />
                <span>{user?.name}</span>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Live Character Count */}
          <LiveCharacterCount />
          {/* Comment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Add a Comment</CardTitle>
            </CardHeader>
            <CardContent>
              <CommentForm />
            </CardContent>
          </Card>
          {/* Comments List */}
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <CommentList initialComments={initialComments} />
            </CardContent>
          </Card>
        </div>
      </main>
      {/* Typing Indicator */}
      <TypingIndicator />
    </div>
  )
} 