# Sweet Shop Backend API

Backend API for the Sweet Shop Management System built with Node.js, TypeScript, Express, and SQLite.

## Features

- ✅ User authentication (JWT-based)
- ✅ User registration and login
- ✅ CRUD operations for sweets
- ✅ Search and filter sweets
- ✅ Inventory management (purchase, restock)
- ✅ Admin-only endpoints
- ✅ Comprehensive test coverage

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest
- **Validation**: express-validator

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the backend directory (or copy from `.env.example`):

```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
DATABASE_PATH=./sweet_shop.db
```

## Running the Server

### Development Mode
```bash
npm run dev
```

The server will start on `http://localhost:3001` (or the port specified in `.env`).

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "user" // optional, defaults to "user"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```

### Sweets (Protected - requires authentication)

- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search?name=Gulab&category=Dessert&minPrice=40&maxPrice=60` - Search sweets
- `GET /api/sweets/:id` - Get sweet by ID
- `POST /api/sweets` - Create a new sweet (requires authentication)
  ```json
  {
    "name": "Gulab Jamun",
    "category": "Dessert",
    "price": 50.0,
    "quantity": 100,
    "description": "Traditional Indian sweet",
    "image_url": "/images/gulabjmum.jfif"
  }
  ```
- `PUT /api/sweets/:id` - Update sweet (requires authentication)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet (decreases quantity)
  ```json
  {
    "quantity": 1
  }
  ```
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only, increases quantity)
  ```json
  {
    "quantity": 50
  }
  ```

### Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

Generate coverage report:
```bash
npm run test:coverage
```

## Database Schema

### Users Table
- `id` (INTEGER, PRIMARY KEY)
- `username` (TEXT, UNIQUE, NOT NULL)
- `email` (TEXT, UNIQUE, NOT NULL)
- `password` (TEXT, NOT NULL) - hashed with bcrypt
- `role` (TEXT, DEFAULT 'user') - 'user' or 'admin'
- `created_at` (DATETIME)

### Sweets Table
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT, NOT NULL)
- `category` (TEXT, NOT NULL)
- `price` (REAL, NOT NULL)
- `quantity` (INTEGER, NOT NULL, DEFAULT 0)
- `description` (TEXT)
- `image_url` (TEXT)
- `created_at` (DATETIME)
- `updated_at` (DATETIME)

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── models/          # Data models and DTOs
│   ├── routes/          # API routes
│   ├── middleware/      # Auth and other middleware
│   ├── database/        # Database setup
│   └── server.ts        # Entry point
├── dist/                # Compiled JavaScript
├── coverage/            # Test coverage reports
└── package.json
```

## Error Handling

The API returns errors in the following format:
```json
{
  "error": "Error message"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

