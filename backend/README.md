# Centauri Tech Beacon API

Backend API for authentication and Intercom integration.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Then edit `.env` with your actual values:
- `DATABASE_URL`: Your PostgreSQL connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `INTERCOM_SECRET_KEY`: Your Intercom Identity Verification secret (get from Intercom dashboard)
- `FRONTEND_URL`: Your frontend URL (for CORS)

3. Set up the database:
```bash
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### POST `/api/auth/register`
Register a new user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "intercomHash": "hmac_hash_for_intercom"
}
```

### POST `/api/auth/login`
Login existing user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** Same as register

### GET `/api/auth/me`
Get current user (requires authentication).

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "intercomHash": "hmac_hash_for_intercom"
}
```

## Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create migration
- `npm run db:studio` - Open Prisma Studio (database GUI)

## Deployment

For production deployment (Render, Railway, etc.):

1. Set environment variables in your hosting platform
2. Build the project: `npm run build`
3. Start: `npm start`
4. Make sure to run `npm run db:push` or `npm run db:migrate` after deployment
