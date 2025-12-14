# Sweet Shop Management System

A full-stack Sweet Shop Management System built with React (frontend) and Node.js/TypeScript/Express (backend), following Test-Driven Development (TDD) principles.

## 🎯 Project Overview

This project is a complete e-commerce solution for managing an Indian sweets shop. It includes user authentication, sweet inventory management, search functionality, and purchase/restock operations.

## 🏗️ Architecture

- **Frontend**: React + Vite
- **Backend**: Node.js + TypeScript + Express
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/iamroshan-10/sweet-shop.git
cd sweet-shop
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example or create manually)
# Add the following:
# PORT=3001
# JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
# JWT_EXPIRES_IN=7d
# NODE_ENV=development
# DATABASE_PATH=./sweet_shop.db

# Seed the database with initial sweets
npm run seed

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to project root
cd sweet-shop

# Install dependencies
npm install

# Create .env file in root directory
# Add: VITE_API_URL=http://localhost:3001/api

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
sweet-shop/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── models/          # Data models and DTOs
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth middleware
│   │   ├── database/        # Database setup
│   │   ├── scripts/         # Database seeding
│   │   └── server.ts        # Entry point
│   ├── dist/                # Compiled JavaScript
│   ├── coverage/            # Test coverage
│   └── package.json
├── src/
│   ├── components/          # React components
│   ├── services/            # API service layer
│   ├── context/             # React context (Auth)
│   └── App.jsx
├── public/
│   └── images/              # Sweet images
└── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets (query params: name, category, minPrice, maxPrice)
- `GET /api/sweets/:id` - Get sweet by ID
- `POST /api/sweets` - Create sweet (requires auth)
- `PUT /api/sweets/:id` - Update sweet (requires auth)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)
- `POST /api/sweets/:id/purchase` - Purchase sweet (decreases quantity)
- `POST /api/sweets/:id/restock` - Restock sweet (Admin only)

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test              # Run tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Test Coverage

The backend includes comprehensive test coverage for:
- Authentication service
- Sweet service
- API endpoints
- Middleware

## 🎨 Features

### Frontend
- ✅ User registration and login
- ✅ Sweet catalog display
- ✅ Search functionality
- ✅ Purchase sweets
- ✅ Responsive design
- ✅ Authentication state management

### Backend
- ✅ JWT-based authentication
- ✅ User roles (user/admin)
- ✅ CRUD operations for sweets
- ✅ Search and filter sweets
- ✅ Inventory management
- ✅ Admin-only endpoints
- ✅ Input validation
- ✅ Error handling

## 📸 Screenshots

*Screenshots will be added here showing the application in action*

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Compile TypeScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run seed` - Seed database with initial data

## 🗄️ Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `email` - Unique email
- `password` - Hashed password
- `role` - 'user' or 'admin'
- `created_at` - Timestamp

### Sweets Table
- `id` - Primary key
- `name` - Sweet name
- `category` - Category
- `price` - Price
- `quantity` - Stock quantity
- `description` - Description
- `image_url` - Image URL
- `created_at` - Timestamp
- `updated_at` - Timestamp

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

Tokens are stored in localStorage after login.

## 🚨 Troubleshooting

### Backend Issues
1. Make sure port 3001 is not in use
2. Check that `.env` file exists with correct configuration
3. Verify database file is created in backend directory
4. Run `npm run seed` to populate initial data

### Frontend Issues
1. Make sure backend is running on port 3001
2. Check `.env` file has `VITE_API_URL=http://localhost:3001/api`
3. Clear browser cache and localStorage if authentication issues occur
4. Check browser console for API errors

### Database Issues
- Delete `sweet_shop.db` file and restart the server to recreate database
- Run seed script to populate data

## 📝 My AI Usage

### AI Tools Used

I used **GitHub Copilot** and **Claude (via Cursor)** extensively throughout this project to accelerate development and ensure best practices.

### How I Used AI

1. **Code Generation & Boilerplate**
   - Used AI to generate initial project structure and configuration files (package.json, tsconfig.json, jest.config.js)
   - Generated database schema and models based on requirements
   - Created API route structures and middleware templates

2. **Service Layer Implementation**
   - Used AI to generate service methods for authentication and sweet management
   - AI helped with JWT token implementation and password hashing logic
   - Generated database query wrappers and error handling patterns

3. **Testing**
   - AI assisted in writing comprehensive test cases following TDD principles
   - Generated mock setups for database operations
   - Created test scenarios for edge cases and error handling

4. **Frontend Integration**
   - AI helped create API service layer for frontend-backend communication
   - Generated React context for authentication state management
   - Assisted with modal components for login/registration

5. **Code Review & Optimization**
   - Used AI to review code for potential bugs and security issues
   - AI suggested improvements for error handling and validation
   - Helped optimize database queries and API responses

6. **Documentation**
   - AI assisted in writing comprehensive README files
   - Generated API documentation and code comments
   - Helped structure project documentation

### Reflection on AI Impact

**Positive Impacts:**
- **Speed**: AI significantly accelerated development, especially for boilerplate code and repetitive patterns
- **Best Practices**: AI suggestions helped maintain consistent coding standards and follow industry best practices
- **Learning**: AI explanations helped me understand complex concepts like JWT authentication and async/await patterns
- **Error Prevention**: AI caught potential bugs early, reducing debugging time

**Challenges:**
- **Over-reliance**: Had to be careful not to blindly accept AI suggestions without understanding the code
- **Context Switching**: Sometimes AI suggestions needed significant modification to fit the specific project requirements
- **Testing**: AI-generated tests sometimes needed manual refinement to match actual implementation

**Workflow Integration:**
- Used AI as a pair programming partner, iterating on suggestions
- Combined AI assistance with manual code review and testing
- Maintained code ownership by understanding and modifying all AI-generated code

**Ethical Considerations:**
- All AI-generated code was reviewed, tested, and understood before inclusion
- Maintained transparency about AI usage in commit messages (with co-author tags)
- Ensured all code follows project requirements and best practices

## 👤 Author

**Roshan Kumar rai**

Built for Incubyte

## 📄 License

This project is part of a TDD Kata assignment.

---

## 🎯 Next Steps (Future Enhancements)

- [ ] Add admin dashboard for managing sweets
- [ ] Implement shopping cart functionality
- [ ] Add order management system
- [ ] Implement payment gateway integration
- [ ] Add user profile management
- [ ] Deploy to production (Vercel/Netlify for frontend, Heroku/AWS for backend)
