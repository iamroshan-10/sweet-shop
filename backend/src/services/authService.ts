import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbRun, dbGet } from '../database/database';
import { CreateUserDto, User, UserResponse } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export class AuthService {
  async register(userData: CreateUserDto): Promise<UserResponse> {
    const { username, email, password, role = 'user' } = userData;

    // Check if user already exists
    const existingUser = await dbGet(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    ) as User | undefined;

    if (existingUser) {
      throw new Error('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = await dbRun(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );

    // Get created user
    const user = await dbGet('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [result.lastID]) as UserResponse;

    return user;
  }

  async login(username: string, password: string): Promise<{ user: UserResponse; token: string }> {
    // Find user
    const user = await dbGet(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, username]
    ) as User | undefined;

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    const userResponse: UserResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at
    };

    return { user: userResponse, token };
  }

  verifyToken(token: string): { id: number; username: string; role: string } {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; role: string };
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}

export const authService = new AuthService();

