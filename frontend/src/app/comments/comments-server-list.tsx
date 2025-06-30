// Do not import CommentList at the top level to avoid Next.js treating this as a Client Component

async function fetchComments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/comments`, {
    // No credentials needed since no auth required
    cache: 'no-store',
  })
  if (!res.ok) return []
  return res.json()
}

export default async function CommentsServerList() {
  const comments = await fetchComments()
  const { CommentList } = await import('@/components/comments/comment-list')
  return <CommentList initialComments={comments} />
} 