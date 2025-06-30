import { Request, Response, NextFunction } from 'express'
import { CommentModel } from './comment.model'
import { redisClient } from '../redis'
import { getIO } from '../ws'

export async function getComments(req: Request, res: Response, next: NextFunction) {
  try {
    // Check cache first
    const cachedComments = await redisClient.get('comments')
    if (cachedComments){
      // Parse and ensure createdAt is ISO string
      const comments = JSON.parse(cachedComments).map((c: any) => ({
        ...c,
        createdAt: new Date(c.createdAt || c.created_at).toISOString(),
      }))
      return res.json(comments)
    }

    // Get from database
    const comments = await CommentModel.findAll()
    // Ensure createdAt is ISO string
    const commentsWithISO = comments.map((c: any) => ({
      ...c,
      createdAt: new Date(c.created_at).toISOString(),
    }))
    // Cache for 10 seconds
    await redisClient.setEx('comments', 10, JSON.stringify(commentsWithISO))
    res.json(commentsWithISO)
  } catch (error) {
    console.error('Get comments error:', error)
    res.status(500).json({ error: 'Failed to fetch comments' })
  }
}

export async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.session.userId
    const userName = req.session.userName
    
    if (!userId || !userName) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const { content, parentId } = req.body
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Content is required' })
    }

    const comment = await CommentModel.create({
      content: content.trim(),
      userId,
      userName,
      parentId: parentId || null,
    })

    // Invalidate cache
    await redisClient.del('comments')

    // Emit WebSocket event for real-time update
    getIO().emit('comment:created', {
      id: comment.id,
      content: comment.content,
      userId: comment.user_id,
      userName: comment.user_name,
      characterCount: comment.character_count,
      parentId: comment.parent_id,
      createdAt: new Date(comment.created_at).toISOString(),
    })

    res.status(201).json({
      id: comment.id,
      content: comment.content,
      userId: comment.user_id,
      userName: comment.user_name,
      characterCount: comment.character_count,
      parentId: comment.parent_id,
      createdAt: new Date(comment.created_at).toISOString(),
    })
  } catch (error) {
    console.error('Create comment error:', error)
    res.status(500).json({ error: 'Failed to create comment' })
  }
} 