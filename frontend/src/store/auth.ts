import { atom } from 'jotai'
import { User } from '@/lib/api'
 
export const userAtom = atom<User | null>(null)
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null)
export const isLoadingAtom = atom(false) 