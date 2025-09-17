# Backend Setup Instructions

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database - Replace with your actual MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/10000ideas

# JWT Configuration - Replace with a strong secret key
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_at_least_32_characters
JWT_EXPIRE=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)
- `POST /api/auth/change-password` - Change password (requires auth)
- `POST /api/auth/logout` - Logout user (requires auth)

### Health Check

- `GET /api/health` - Server health check

## Running the Backend

1. Make sure MongoDB is running
2. Create the `.env` file with your configuration
3. Run the development server:

```bash
npm run server
```

Or run both frontend and backend together:

```bash
npm run dev
```

## Features

- ✅ User registration and login
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Security headers with Helmet
- ✅ Error handling
- ✅ MongoDB integration
- ✅ User profile management


