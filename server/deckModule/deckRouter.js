import Router from 'express';
import controller from './deckController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = new Router();
router.put('/:userId', controller.updateDeck);
router.get('/:userId', controller.getDeck);

export default router;
