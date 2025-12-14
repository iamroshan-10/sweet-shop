import { Router } from 'express';
import { body } from 'express-validator';
import { sweetController } from '../controllers/sweetController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

const createSweetValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('description').optional().trim(),
  body('image_url').optional().isURL().withMessage('Image URL must be a valid URL'),
];

const updateSweetValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('description').optional().trim(),
  body('image_url').optional().isURL().withMessage('Image URL must be a valid URL'),
];

const purchaseValidation = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const restockValidation = [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

// Public routes (but require authentication)
router.get('/', sweetController.getAllSweets.bind(sweetController));
router.get('/search', sweetController.searchSweets.bind(sweetController));
router.get('/:id', sweetController.getSweetById.bind(sweetController));

// Protected routes (require authentication)
router.post('/', createSweetValidation, sweetController.createSweet.bind(sweetController));
router.put('/:id', updateSweetValidation, sweetController.updateSweet.bind(sweetController));
router.post('/:id/purchase', purchaseValidation, sweetController.purchaseSweet.bind(sweetController));

// Admin only routes
router.delete('/:id', requireAdmin, sweetController.deleteSweet.bind(sweetController));
router.post('/:id/restock', requireAdmin, restockValidation, sweetController.restockSweet.bind(sweetController));

export default router;

