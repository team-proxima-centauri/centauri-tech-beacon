# Setup Guide - Centauri Tech Beacon with Authentication & Intercom

This guide will help you set up the complete authentication system with Intercom integration.

## Prerequisites

1. Node.js (v18 or higher)
2. PostgreSQL database
3. Intercom account with App ID and Identity Verification Secret

## Backend Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `backend/.env` with your values:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/centauri_tech_beacon?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
INTERCOM_SECRET_KEY="your-intercom-identity-verification-secret"
PORT=3001
NODE_ENV=development
FRONTEND_URL="http://localhost:5173"
```

**Important:**
- For `DATABASE_URL`: Use your PostgreSQL connection string
- For `JWT_SECRET`: Generate a secure random string (32+ characters)
- For `INTERCOM_SECRET_KEY`: Get this from Intercom Dashboard → Settings → Identity Verification

### 3. Set Up Database

```bash
npm run db:push
```

This will create the `users` table in your PostgreSQL database.

### 4. Start Backend Server

```bash
npm run dev
```

Backend will run on `http://localhost:3001`

## Frontend Setup

### 1. Install Frontend Dependencies (if not already done)

```bash
cd ..  # Go back to root
npm install
```

### 2. Configure Frontend Environment

Create `.env.local` in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

For production, update this to your backend API URL.

### 3. Start Frontend Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Intercom Setup

### 1. Get Your Intercom Identity Verification Secret

1. Go to [Intercom Dashboard](https://app.intercom.com)
2. Navigate to Settings → Installation → Identity Verification
3. Enable Identity Verification
4. Copy the Secret Key
5. Add it to `backend/.env` as `INTERCOM_SECRET_KEY`

### 2. Verify Installation

The Intercom widget is already installed in `index.html`. When users log in, they will be automatically identified in Intercom with:
- User ID
- Email
- Name
- Creation date
- Secure identity verification (HMAC hash)

## Testing the Setup

### 1. Register a New User

1. Open `http://localhost:5173/register`
2. Fill in the registration form
3. Click "Register"

### 2. Verify Intercom Integration

After logging in:
1. Look for the Intercom messenger icon in the bottom-right corner
2. Click it to open the messenger
3. Your user information should be automatically populated
4. In your Intercom dashboard, you should see the user as "logged in"

### 3. Test Login/Logout

- Navigate to `/login` to log in
- Log out and verify that Intercom resets to visitor mode

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth token)

See `backend/README.md` for detailed API documentation.

## Deployment

### Backend Deployment (Render/Railway)

1. Create a new Web Service
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Set environment variables in the dashboard
5. Deploy!

### Frontend Deployment (Netlify)

1. Update `.env.production` with your production backend URL:
   ```env
   VITE_API_URL=https://your-backend-api.com
   ```
2. Deploy to Netlify as usual
3. The frontend will automatically connect to your backend API

## Database Hosting

For PostgreSQL hosting, you can use:
- **Render** - Free 90-day PostgreSQL (then $7/month)
- **Railway** - Free tier with PostgreSQL included
- **Supabase** - Free PostgreSQL with 500MB storage
- **Neon** - Free tier with 10GB storage

## Troubleshooting

### CORS Issues
Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL.

### Database Connection
Verify your `DATABASE_URL` is correct and PostgreSQL is running.

### Intercom Not Identifying Users
1. Check that `INTERCOM_SECRET_KEY` is set correctly in backend
2. Verify Identity Verification is enabled in Intercom dashboard
3. Check browser console for any errors

### JWT Token Issues
Make sure `JWT_SECRET` is the same value and not changed between deployments.

## Next Steps

- Add password reset functionality
- Implement email verification
- Add social login (Google, Facebook)
- Create protected routes using `<ProtectedRoute>`
- Customize Intercom messages based on user data

## Support

For issues, check:
1. Backend logs: `backend/npm run dev` output
2. Frontend console: Browser DevTools
3. Network tab: Check API requests/responses
