import { atom } from 'jotai'
import { Comment, TypingUser } from '@/lib/api'
 
export const commentsAtom = atom<Comment[]>([])
export const typingUsersAtom = atom<TypingUser[]>([])
export const currentCommentAtom = atom('') 