# IdeaForge - Full Stack Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

#### Backend Environment

Create `backend/.env` file:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database - Replace with your actual MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/ideaforge

# JWT Configuration - Replace with a strong secret key
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend Environment

Create `.env.local` file in the root directory:

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start the Application

Run both frontend and backend together:

```bash
npm run dev
```

Or run them separately:

```bash
# Backend only
npm run server

# Frontend only
npm run client
```

## Features Implemented

### ✅ Backend Features

- **Express.js server** with security middleware
- **MongoDB integration** with Mongoose
- **JWT authentication** with secure token handling
- **User registration and login** with validation
- **Password hashing** using bcrypt
- **Rate limiting** to prevent abuse
- **CORS configuration** for frontend integration
- **Input validation** with express-validator
- **Error handling** and logging
- **User profile management**

### ✅ Frontend Features

- **React authentication context** for state management
- **API client** with automatic token handling
- **Login/Signup page** with form validation
- **Error handling** and loading states
- **Responsive design** matching the theme
- **Automatic redirects** for authenticated users
- **Token persistence** in localStorage

### ✅ Security Features

- **Password hashing** with bcrypt (salt rounds: 12)
- **JWT tokens** with expiration
- **Rate limiting** on authentication endpoints
- **Input validation** and sanitization
- **CORS protection**
- **Security headers** with Helmet
- **Environment variable** protection

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `POST /api/auth/change-password` - Change password (protected)
- `POST /api/auth/logout` - Logout (protected)

### Health Check

- `GET /api/health` - Server status

## Database Schema

### User Model

```javascript
{
  name: String (required, 2-50 chars)
  email: String (required, unique, validated)
  password: String (required, min 6 chars, hashed)
  role: String (enum: 'user', 'admin', default: 'user')
  isEmailVerified: Boolean (default: false)
  lastLogin: Date
  profile: {
    avatar: String
    bio: String (max 500 chars)
    location: String (max 100 chars)
    website: String (max 200 chars)
  }
  preferences: {
    newsletter: Boolean (default: true)
    notifications: Boolean (default: true)
  }
  timestamps: true
}
```

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 3000
- MongoDB connection string should be updated in backend/.env
- JWT secret should be a strong, random string
- All authentication is handled via JWT tokens
- No OTP verification implemented (as requested)
- Full CRUD operations for user management
- Responsive design with green theme matching the main site

## Next Steps

1. Set up your MongoDB database
2. Update the MONGODB_URI in backend/.env
3. Generate a strong JWT_SECRET
4. Run the application with `npm run dev`
5. Test the authentication flow at `/auth`
