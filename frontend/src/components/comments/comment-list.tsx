'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { commentsAtom } from '@/store/comments'
import { userAtom } from '@/store/auth'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { format, formatDistanceToNow, differenceInMinutes } from 'date-fns'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CommentForm } from './comment-form'

function CommentItem({ comment, allComments, depth = 0 }: { comment: any, allComments: any[], depth?: number }) {
  const [showReply, setShowReply] = useState(false)
  // Find replies to this comment
  const replies = allComments.filter(c => c.parentId === comment.id)
  const createdAt = new Date(comment.createdAt)
  const minutesAgo = differenceInMinutes(new Date(), createdAt)

  return (
    <div
      style={{ marginLeft: depth * 32, borderLeft: depth > 0 ? '2px solid #e5e7eb' : 'none', paddingLeft: depth > 0 ? 16 : 0 }}
      className="mb-4"
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow">
          {comment.userName?.charAt(0).toUpperCase() || '?'}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">{comment.userName}</span>
            <span className="text-xs text-gray-500">
              {minutesAgo < 60
                ? `${formatDistanceToNow(createdAt, { addSuffix: true })} • ${format(createdAt, 'yyyy-MM-dd HH:mm')}`
                : format(createdAt, 'yyyy-MM-dd HH:mm')}
            </span>
            <span className="ml-2 text-xs text-gray-400">{comment.characterCount} chars</span>
          </div>
          <div className="mt-1 text-white text-base whitespace-pre-wrap leading-relaxed">
            {comment.content}
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Button size="sm" variant="ghost" className="px-2 py-1 text-blue-600" onClick={() => setShowReply(v => !v)}>
              {showReply ? 'Cancel' : 'Reply'}
            </Button>
            {showReply && (
              <div className="w-full mt-2">
                <CommentForm parentId={comment.id} onSuccess={() => setShowReply(false)} />
              </div>
            )}
          </div>
          {/* Render replies recursively */}
          {replies.length > 0 && (
            <div className="mt-4 border-l-2 border-gray-200 pl-4">
              {replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} allComments={allComments} depth={depth + 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function CommentList({ initialComments }: { initialComments?: any[] } = {}) {
  const comments = useAtomValue(commentsAtom)
  const setComments = useSetAtom(commentsAtom)
  // Hydrate commentsAtom with initialComments if provided
  useEffect(() => {
    if (initialComments && initialComments.length > 0) {
      setComments(initialComments)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialComments])
  // Force re-render every minute for live time updates
  const [, setNow] = useState(Date.now())
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000)
    return () => clearInterval(interval)
  }, [])

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No comments yet. Be the first to share your thoughts!
      </div>
    )
  }
  // Only render top-level comments (parentId == null)
  const topLevel = comments.filter(c => !c.parentId)
  return (
    <div className="space-y-4">
      {topLevel.map((comment) =>
        !comment.userName ? null : (
          <CommentItem key={comment.id} comment={comment} allComments={comments} />
        )
      )}
    </div>
  )
} 