import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

interface TypingUser {
  userId: string
  name: string
  charCount: number
}

const typingUsers = new Map<string, TypingUser>()
let io: SocketIOServer | null = null

export function setupWebSocket(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId
    const userName = socket.handshake.auth.userName

    if (!userId || !userName) {
      socket.disconnect()
      return
    }

    console.log(`${userName} connected`)

    // Handle typing events
    socket.on('typing', (data: { userId: string; name: string; charCount: number }) => {
      typingUsers.set(data.userId, data)
      socket.broadcast.emit('typing:update', Array.from(typingUsers.values()))
    })

    socket.on('stop-typing', (data: { userId: string }) => {
      typingUsers.delete(data.userId)
      socket.broadcast.emit('typing:update', Array.from(typingUsers.values()))
    })

    // Handle comment creation
    socket.on('comment:created', (comment) => {
      socket.broadcast.emit('comment:created', comment)
    })

    // Handle disconnect
    socket.on('disconnect', () => {
      typingUsers.delete(userId)
      socket.broadcast.emit('typing:update', Array.from(typingUsers.values()))
      console.log(`${userName} disconnected`)
    })
  })

  return io
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialized')
  return io
} 