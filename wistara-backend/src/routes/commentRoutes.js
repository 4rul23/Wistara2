import express from 'express';
import * as commentController from '../controllers/commentController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();


router.get('/destination/:destinationId', commentController.getComments);


router.post('/', isAuthenticated, commentController.createComment);
router.get('/user', isAuthenticated, commentController.getUserComments);
router.put('/:id', isAuthenticated, commentController.updateComment);
router.delete('/:id', isAuthenticated, commentController.deleteComment);

export default router;
