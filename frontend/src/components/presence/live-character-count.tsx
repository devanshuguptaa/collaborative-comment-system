'use client'

import { useAtomValue } from 'jotai'
import { typingUsersAtom } from '@/store/comments'

export function LiveCharacterCount() {
  const typingUsers = useAtomValue(typingUsersAtom)

  if (typingUsers.length === 0) {
    return null
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
      <h3 className="text-sm font-medium text-blue-900 mb-2">Live Character Counts:</h3>
      <div className="space-y-2">
        {typingUsers.map((user) => (
          <div key={user.userId} className="flex items-center justify-between">
            <span className="text-sm text-blue-700">{user.name}</span>
            <span className="text-sm font-medium text-blue-900">
              {user.charCount} chars
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 