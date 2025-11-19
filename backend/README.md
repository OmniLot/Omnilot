# Backend API

This is the Express + MongoDB backend for the Omni.Lot application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `backend/` directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3001
FRONTEND_URL=http://localhost:5173
```

3. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create a new user account
  - Body: `{ email, password, full_name?, phone? }`
  - Returns: `{ token, user }`

- `POST /api/auth/login` - Login with email and password
  - Body: `{ email, password }`
  - Returns: `{ token, user }`

- `GET /api/auth/me` - Get current user (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ user }`

- `PUT /api/auth/me` - Update current user (requires authentication)
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ full_name?, phone? }`
  - Returns: `{ user }`

## MongoDB Schema

### User
- `email` (String, required, unique)
- `password` (String, required, hashed)
- `full_name` (String, optional)
- `phone` (String, optional)
- `createdAt` (Date)
- `updatedAt` (Date)

