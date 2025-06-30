'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { commentSchema, type CommentFormData } from '@/lib/validation'
import { commentsAPI } from '@/lib/api'
import { useSetAtom, useAtomValue } from 'jotai'
import { commentsAtom, currentCommentAtom } from '@/store/comments'
import { useWebSocket } from '@/hooks/use-websocket'
import { useAtomValue as useJotaiValue } from 'jotai'
import { userAtom } from '@/store/auth'

export function CommentForm({ parentId, onSuccess }: { parentId?: string, onSuccess?: () => void } = {}) {
  const [isLoading, setIsLoading] = useState(false)
  const setComments = useSetAtom(commentsAtom)
  const currentComment = useJotaiValue(currentCommentAtom)
  const user = useJotaiValue(userAtom)
  
  // Get WebSocket functions
  const { emitTyping, emitStopTyping } = useWebSocket(user?.id, user?.name)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  })

  const content = watch('content', '')

  // Emit typing events when content changes
  useEffect(() => {
    if (content && user?.id && user?.name) {
      emitTyping(content.length)
    } else if (!content && user?.id) {
      emitStopTyping()
    }
  }, [content, user?.id, user?.name, emitTyping, emitStopTyping])

  const onSubmit = async (data: CommentFormData) => {
    setIsLoading(true)
    try {
      await commentsAPI.createComment({ ...data, parentId })
      // Refetch comments after posting
      const updatedComments = await commentsAPI.getComments()
      setComments(updatedComments)
      reset()
      emitStopTyping() // Stop typing when comment is posted
      toast.success('Comment posted successfully!')
      if (onSuccess) onSuccess()
    } catch (error) {
      toast.error('Failed to post comment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Textarea
            {...register('content')}
            placeholder={parentId ? 'Write a reply...' : 'Share your thoughts...'}
            disabled={isLoading}
            className="min-h-[100px]"
          />
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Characters: {content.length}</span>
            <span>Press Enter to submit</span>
          </div>
        </div>
        <Button type="submit" disabled={isLoading || !content.trim()}>
          {isLoading ? (parentId ? 'Replying...' : 'Posting...') : (parentId ? 'Reply' : 'Post Comment')}
        </Button>
      </form>
    </div>
  )
} 