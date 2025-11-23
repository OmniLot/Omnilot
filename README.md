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
BASE44_API_KEY=your_base44_api_key
BASE44_APP_ID=your_base44_app_id
BASE44_API_BASE=https://app.base44.com/api
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
- ✅ AI-powered website generation using Base44 LLM API
- ✅ Generated website storage in MongoDB

## Authentication

The app uses JWT tokens for authentication. Tokens are stored in localStorage and automatically included in API requests.

## MongoDB Connection

You can use either:
- **MongoDB Atlas** (cloud): Get a connection string from your Atlas cluster
- **Local MongoDB**: Use `mongodb://localhost:27017/omni-lot`
