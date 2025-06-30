const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface User {
  id: string
  name: string
  email: string
}

export interface Comment {
  id: string
  content: string
  userId: string
  userName: string
  characterCount: number
  parentId?: string | null
  createdAt: string
}

export interface TypingUser {
  userId: string
  name: string
  charCount: number
}

// Auth API
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Registration failed')
    return response.json()
  },

  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Login failed')
    return response.json()
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })
    if (!response.ok) throw new Error('Logout failed')
  },

  me: async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: 'include',
    })
    if (!response.ok) throw new Error('Failed to get user')
    return response.json()
  },
}

// Comments API
export const commentsAPI = {
  getComments: async (): Promise<Comment[]> => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      credentials: 'include',
    })
    if (!response.ok) throw new Error('Failed to fetch comments')
    const data = await response.json()
    // Map backend keys to frontend keys
    return data.map((c: any) => ({
      id: c.id,
      content: c.content,
      userId: c.userId || c.user_id,
      userName: c.userName || c.user_name,
      characterCount: c.characterCount || c.character_count,
      parentId: c.parentId ?? c.parent_id ?? null,
      createdAt: c.createdAt || c.created_at,
    }))
  },

  createComment: async (data: { content: string; parentId?: string | null }): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to create comment')
    return response.json()
  },
} 