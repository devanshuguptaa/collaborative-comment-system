'use client'

import { useAtomValue } from 'jotai'
import { typingUsersAtom } from '@/store/comments'

export function TypingIndicator() {
  const typingUsers = useAtomValue(typingUsersAtom)

  if (typingUsers.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-3 max-w-xs z-50">
      <div className="space-y-2">
        {typingUsers.map((user) => (
          <div key={user.userId} className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-gray-600">
              {user.name} is typing...
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 