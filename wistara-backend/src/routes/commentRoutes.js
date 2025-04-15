import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();


router.get('/destination/:destinationId', commentController.getComments);


router.post('/', requireAuth, commentController.createComment);
router.get('/user', requireAuth, commentController.getUserComments);
router.put('/:id', requireAuth, commentController.updateComment);
router.delete('/:id', requireAuth, commentController.deleteComment);

export default router;
