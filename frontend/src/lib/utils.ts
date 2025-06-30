import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Predefined colors for usernames
const usernameColors = [
  'text-red-500',
  'text-blue-500', 
  'text-green-500',
  'text-yellow-500',
  'text-purple-500',
  'text-pink-500',
  'text-indigo-500',
  'text-teal-500',
  'text-orange-500',
  'text-cyan-500',
  'text-emerald-500',
  'text-violet-500',
  'text-rose-500',
  'text-sky-500',
  'text-lime-500',
  'text-amber-500'
]

// Function to get consistent color for a username
export function getUsernameColor(username: string): string {
  if (!username) return 'text-gray-500'
  
  // Generate a hash from the username to get consistent color
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Use the hash to select a color
  const colorIndex = Math.abs(hash) % usernameColors.length
  return usernameColors[colorIndex]
} 