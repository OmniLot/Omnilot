# Omni.Lot - Auto Dealership Website Platform

A modern platform for creating and managing auto dealership websites with AI-powered features.

## Project Structure

```
├── backend/          # Express + MongoDB backend API
├── src/              # React frontend (Vite)
│   ├── api/          # API client functions
│   ├── components/   # React components
│   ├── context/      # React context providers
│   ├── pages/        # Page components
│   └── utils/        # Utility functions
└── package.json      # Frontend dependencies
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Atlas or local instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file:
```env
VITE_API_URL=http://localhost:3001/api
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

### Currently Implemented
- ✅ User authentication (signup/login)
- ✅ User profile management
- ✅ JWT-based session management
- ✅ MongoDB database integration

### Temporarily Disabled (To Be Rebuilt)
- ⏸️ Website generation (BuildWebsite page)
- ⏸️ Appointment booking (BookDemo page)
- ⏸️ AI chatbot (HelpWidget)
- ⏸️ Generated website storage

These features will be rebuilt with MongoDB backend in future updates.

## Authentication

The app uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in API requests.

## MongoDB Connection

You can use either:
- **MongoDB Atlas** (cloud): Get a connection string from your Atlas cluster
- **Local MongoDB**: Use `mongodb://localhost:27017/omni-lot`

## Deployment

### Backend (Render)
1. Set environment variables in Render dashboard
2. Set build command: `cd backend && npm install`
3. Set start command: `cd backend && npm start`

### Frontend (Render)
1. Set build command: `npm run build`
2. Set publish directory: `dist`
3. Set environment variable: `VITE_API_URL=https://your-backend-url.onrender.com/api`

## Development Notes

- Backend and frontend run on separate ports (3001 and 5173)
- CORS is configured to allow frontend requests
- JWT tokens expire after 7 days
- Passwords are hashed using bcrypt
