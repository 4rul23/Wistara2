import express from 'express';
import {
  getDestinations,
  getDestination,
  getDestinationsByRegion,
  getDestinationsByCategory
} from '../controllers/destinationController.js';

const router = express.Router();

// Get all destinations
router.get('/', getDestinations);

// Get destinations by region
router.get('/region/:region', getDestinationsByRegion);

// Get destinations by category
router.get('/category/:category', getDestinationsByCategory);

// Get single destination by ID
router.get('/:id', getDestination);

export default router;
