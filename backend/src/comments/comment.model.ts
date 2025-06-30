import { pool } from '../db'

export interface Comment {
  id: string
  content: string
  user_id: string
  user_name: string
  character_count: number
  parent_id: string | null
  created_at: Date
}

export interface CreateCommentData {
  content: string
  userId: string
  userName: string
  parentId?: string | null
}

export class CommentModel {
  static async create(data: CreateCommentData): Promise<Comment> {
    const characterCount = data.content.length
    
    const query = `
      INSERT INTO comments (content, user_id, user_name, character_count, parent_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `
    
    const result = await pool.query(query, [
      data.content,
      data.userId,
      data.userName,
      characterCount,
      data.parentId || null,
    ])
    
    return result.rows[0]
  }

  static async findAll(): Promise<Comment[]> {
    const query = `
      SELECT * FROM comments 
      ORDER BY created_at ASC
    `
    const result = await pool.query(query)
    return result.rows
  }

  static async findById(id: string): Promise<Comment | null> {
    const query = 'SELECT * FROM comments WHERE id = $1'
    const result = await pool.query(query, [id])
    return result.rows[0] || null
  }
} 