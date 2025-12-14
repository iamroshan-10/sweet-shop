import { AuthService } from '../authService';
import { dbRun, dbGet } from '../../database/database';

// Mock database
jest.mock('../../database/database', () => ({
  dbRun: jest.fn(),
  dbGet: jest.fn(),
  dbAll: jest.fn(),
  database: {},
  db: {},
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      (dbGet as jest.Mock).mockResolvedValueOnce(undefined); // User doesn't exist
      (dbRun as jest.Mock).mockResolvedValueOnce({ lastID: 1 });
      (dbGet as jest.Mock).mockResolvedValueOnce({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'user',
        created_at: '2024-01-01',
      });

      const result = await authService.register({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('id');
      expect(result.username).toBe('testuser');
      expect(result.email).toBe('test@example.com');
      expect(result.role).toBe('user');
    });

    it('should throw error if user already exists', async () => {
      (dbGet as jest.Mock).mockResolvedValueOnce({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      });

      await expect(
        authService.register({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123',
        })
      ).rejects.toThrow('Username or email already exists');
    });
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const hashedPassword = '$2a$10$dummyhash'; // bcrypt hash
      (dbGet as jest.Mock).mockResolvedValueOnce({
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        password: hashedPassword,
        role: 'user',
        created_at: '2024-01-01',
      });

      // Mock bcrypt.compare
      const bcrypt = require('bcryptjs');
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const result = await authService.login('testuser', 'password123');

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.username).toBe('testuser');
    });

    it('should throw error with invalid credentials', async () => {
      (dbGet as jest.Mock).mockResolvedValueOnce(undefined);

      await expect(
        authService.login('testuser', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials');
    });
  });
});

