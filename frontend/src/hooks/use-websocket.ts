'use client'

import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSetAtom } from 'jotai'
import { commentsAtom, typingUsersAtom } from '@/store/comments'
import { Comment, TypingUser } from '@/lib/api'

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'

export function useWebSocket(userId?: string, userName?: string) {
  const socketRef = useRef<Socket | null>(null)
  const setComments = useSetAtom(commentsAtom)
  const setTypingUsers = useSetAtom(typingUsersAtom)

  useEffect(() => {
    if (!userId || !userName) return

    // Initialize socket connection
    socketRef.current = io(SOCKET_URL, {
      auth: {
        userId,
        userName,
      },
    })

    const socket = socketRef.current

    // Listen for new comments
    socket.on('comment:created', (comment: Comment) => {
      setComments((prev) => {
        if (prev.some((c) => c.id === comment.id)) return prev // Prevent duplicate
        return [comment, ...prev]
      })
    })

    // Listen for typing updates
    socket.on('typing:update', (typingUsers: TypingUser[]) => {
      setTypingUsers(typingUsers.filter((user) => user.userId !== userId))
    })

    // Listen for user joined
    socket.on('user:joined', (user: { userId: string; name: string }) => {
      console.log(`${user.name} joined the chat`)
    })

    // Listen for user left
    socket.on('user:left', (user: { userId: string; name: string }) => {
      console.log(`${user.name} left the chat`)
    })

    return () => {
      socket.disconnect()
    }
  }, [userId, userName, setComments, setTypingUsers])

  const emitTyping = (charCount: number) => {
    if (socketRef.current && userId && userName) {
      socketRef.current.emit('typing', { userId, name: userName, charCount })
    }
  }

  const emitStopTyping = () => {
    if (socketRef.current && userId) {
      socketRef.current.emit('stop-typing', { userId })
    }
  }

  return {
    emitTyping,
    emitStopTyping,
  }
} 