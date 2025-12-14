import { Router } from 'express';
import { body } from 'express-validator';
import { authController } from '../controllers/authController';

const router = Router();

const registerValidation = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
];

const loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post('/register', registerValidation, authController.register.bind(authController));
router.post('/login', loginValidation, authController.login.bind(authController));

export default router;

