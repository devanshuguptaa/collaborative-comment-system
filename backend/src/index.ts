import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import session from './session'
import authRoutes from './auth/routes'
import commentRoutes from './comments/routes'
import { createServer } from 'http'
import { setupWebSocket } from './ws'

const app = express()
const httpServer = createServer(app)

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))
app.use(helmet())
app.use(express.json())
app.use(session)

app.use('/auth', authRoutes)
app.use('/comments', commentRoutes)

setupWebSocket(httpServer)

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
}) 