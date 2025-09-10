# Environment Variables Setup

## Required Environment Variables for Vercel Deployment

You need to set these environment variables in your Vercel dashboard:

### 1. Database Configuration

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/1000ideas?retryWrites=true&w=majority
```

### 2. JWT Configuration

```
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=7d
```

### 3. Environment

```
NODE_ENV=production
```

## How to Set Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the appropriate value
5. Make sure to set them for "Production" environment

## MongoDB Atlas Setup:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel
5. Get your connection string and use it as MONGODB_URI

## JWT Secret:

Generate a strong JWT secret (at least 32 characters):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
