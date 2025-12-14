import { Response } from 'express';
import { sweetService } from '../services/sweetService';
import { AuthRequest } from '../middleware/auth';
import { validationResult } from 'express-validator';

export class SweetController {
  async createSweet(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const sweet = await sweetService.createSweet(req.body);
      res.status(201).json(sweet);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllSweets(req: AuthRequest, res: Response) {
    try {
      const sweets = await sweetService.getAllSweets();
      res.json(sweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async searchSweets(req: AuthRequest, res: Response) {
    try {
      const { name, category, minPrice, maxPrice } = req.query;
      const query = {
        name: name as string,
        category: category as string,
        minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      };

      const sweets = await sweetService.searchSweets(query);
      res.json(sweets);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSweetById(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const sweet = await sweetService.getSweetById(id);
      
      if (!sweet) {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      
      res.json(sweet);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSweet(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = parseInt(req.params.id);
      const sweet = await sweetService.updateSweet(id, req.body);
      
      if (!sweet) {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      
      res.json(sweet);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteSweet(req: AuthRequest, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await sweetService.deleteSweet(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Sweet not found' });
      }
      
      res.json({ message: 'Sweet deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async purchaseSweet(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }

      const sweet = await sweetService.purchaseSweet(id, quantity);
      res.json({ message: 'Purchase successful', sweet });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async restockSweet(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (!quantity || quantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
      }

      const sweet = await sweetService.restockSweet(id, quantity);
      res.json({ message: 'Restock successful', sweet });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const sweetController = new SweetController();

