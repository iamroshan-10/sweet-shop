import { SweetService } from '../sweetService';
import { dbRun, dbGet, dbAll } from '../../database/database';

// Mock database
jest.mock('../../database/database', () => ({
  dbRun: jest.fn(),
  dbGet: jest.fn(),
  dbAll: jest.fn(),
  database: {},
  db: {},
}));

describe('SweetService', () => {
  let sweetService: SweetService;

  beforeEach(() => {
    sweetService = new SweetService();
    jest.clearAllMocks();
  });

  describe('createSweet', () => {
    it('should create a new sweet successfully', async () => {
      const sweetData = {
        name: 'Gulab Jamun',
        category: 'Dessert',
        price: 50.0,
        quantity: 100,
      };

      (dbRun as jest.Mock).mockResolvedValueOnce({ lastID: 1 });
      (dbGet as jest.Mock).mockResolvedValueOnce({
        id: 1,
        ...sweetData,
        description: null,
        image_url: null,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      });

      const result = await sweetService.createSweet(sweetData);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe('Gulab Jamun');
      expect(result.price).toBe(50.0);
    });
  });

  describe('getAllSweets', () => {
    it('should return all sweets', async () => {
      const mockSweets = [
        { id: 1, name: 'Gulab Jamun', category: 'Dessert', price: 50, quantity: 100 },
        { id: 2, name: 'Jalebi', category: 'Dessert', price: 40, quantity: 80 },
      ];

      (dbAll as jest.Mock).mockResolvedValueOnce(mockSweets);

      const result = await sweetService.getAllSweets();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Gulab Jamun');
    });
  });

  describe('searchSweets', () => {
    it('should search sweets by name', async () => {
      const mockSweets = [
        { id: 1, name: 'Gulab Jamun', category: 'Dessert', price: 50, quantity: 100 },
      ];

      (dbAll as jest.Mock).mockResolvedValueOnce(mockSweets);

      const result = await sweetService.searchSweets({ name: 'Gulab' });

      expect(result).toHaveLength(1);
      expect(result[0].name).toContain('Gulab');
    });

    it('should search sweets by price range', async () => {
      const mockSweets = [
        { id: 1, name: 'Gulab Jamun', category: 'Dessert', price: 50, quantity: 100 },
      ];

      (dbAll as jest.Mock).mockResolvedValueOnce(mockSweets);

      const result = await sweetService.searchSweets({ minPrice: 40, maxPrice: 60 });

      expect(result).toHaveLength(1);
    });
  });

  describe('purchaseSweet', () => {
    it('should decrease quantity when purchasing', async () => {
      const mockSweet = {
        id: 1,
        name: 'Gulab Jamun',
        quantity: 100,
        price: 50,
        category: 'Dessert',
      };

      (dbGet as jest.Mock).mockResolvedValueOnce(mockSweet);
      (dbRun as jest.Mock).mockResolvedValueOnce({});
      (dbGet as jest.Mock).mockResolvedValueOnce({
        ...mockSweet,
        quantity: 95,
      });

      const result = await sweetService.purchaseSweet(1, 5);

      expect(result?.quantity).toBe(95);
    });

    it('should throw error if insufficient quantity', async () => {
      const mockSweet = {
        id: 1,
        name: 'Gulab Jamun',
        quantity: 3,
        price: 50,
        category: 'Dessert',
      };

      (dbGet as jest.Mock).mockResolvedValueOnce(mockSweet);

      await expect(sweetService.purchaseSweet(1, 5)).rejects.toThrow(
        'Insufficient quantity in stock'
      );
    });
  });
});

