# Collaborative Comment System - Frontend

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




