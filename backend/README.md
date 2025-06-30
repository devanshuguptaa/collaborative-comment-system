# Collaborative Comment System - Backend

Express.js + TypeScript backend for the real-time collaborative commenting platform.

## Features

- 🔐 **Session-based Authentication** - Secure login/register with Redis sessions
- 💬 **Comments API** - Create and retrieve comments with caching
- ⚡ **Real-time Updates** - WebSocket for live typing indicators and comment updates
- 🗄️ **PostgreSQL** - Reliable data storage
- 🚀 **Redis** - Session storage and caching
- 🛡️ **Security** - CORS, Helmet, rate limiting

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Cache/Sessions**: Redis
- **Real-time**: Socket.IO
- **Security**: bcryptjs, helmet, cors

## Setup

### Prerequisites

- Node.js 18+
- Docker (for PostgreSQL and Redis)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp env.example .env
   ```

3. Start PostgreSQL and Redis with Docker:
   ```bash
   docker-compose up -d
   ```

4. Initialize the database:
   ```bash
   npm run init-db
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user

### Comments
- `GET /comments` - Get all comments (cached)
- `POST /comments` - Create new comment

## WebSocket Events

- `typing` - User is typing
- `stop-typing` - User stopped typing
- `comment:created` - New comment created
- `typing:update` - Update typing indicators

## Environment Variables

- `PGHOST` - PostgreSQL host
- `PGPORT` - PostgreSQL port
- `PGUSER` - PostgreSQL user
- `PGPASSWORD` - PostgreSQL password
- `PGDATABASE` - PostgreSQL database
- `REDIS_URL` - Redis connection URL
- `SESSION_SECRET` - Session secret key
- `PORT` - Server port

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run init-db` - Initialize database tables 