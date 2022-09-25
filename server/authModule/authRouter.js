import Router from 'express';
import { check } from 'express-validator';
import controller from './authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = new Router();
router.post('/register', [
  check('username', 'Имя пользователя не может быть пустым').notEmpty(),
  check('password', 'Пароль должен быть больше 4 и меньше 10 символов').isLength({ min: 4, max: 10 }),
], controller.register);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

export default router;
