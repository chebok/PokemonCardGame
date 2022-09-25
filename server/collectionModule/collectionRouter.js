import Router from 'express';
import controller from './collectionController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = new Router();
router.post('/:userId', controller.updateCollection);
router.get('/:userId', controller.getCollection);

export default router;
