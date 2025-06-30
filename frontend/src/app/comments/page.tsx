// No 'use client'
import CommentsClient from './CommentsClient'

export default async function CommentsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/comments`, { cache: 'no-store' })
  const comments = await res.json()
  return <CommentsClient initialComments={comments} />
} 