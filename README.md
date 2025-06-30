# Collaborative Comment System 

# Frontend

A real-time collaborative commenting platform built with Next.js 14+ App Router, TypeScript, and modern web technologies.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Jotai
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner (currently not using it)
- **Real-time**: Socket.IO Client
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend server running (see backend README)

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. environment file:
   ```bash
   .env file
   ```

5. Update the environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser



## Key Components

### Authentication
- **LoginForm**: User login with email/password
- **RegisterForm**: User registration with validation
- **Session Management**: Secure session-based auth

### Comments
- **CommentForm**: Post new comments with real-time typing
- **CommentList**: Display all comments with user info
- **TypingIndicator**: Show who's currently typing

### Real-time Features
- **WebSocket Integration**: Live updates via Socket.IO
- **Typing Detection**: Real-time typing indicators
- **Character Counting**: Live character count per user

## API Integration

The frontend communicates with the backend through:

- **REST API**: Authentication and CRUD operations
- **WebSocket**: Real-time updates and typing indicators
- **Session Cookies**: Secure authentication

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_SOCKET_URL` - WebSocket server URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request


# Backend

Express.js + TypeScript backend for the real-time collaborative commenting platform.

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

2. environment file:
   ```
  .env
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


