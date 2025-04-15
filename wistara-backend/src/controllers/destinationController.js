import { destinationService } from '../services/destinationService.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDestinations = async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();
    console.log(`Found ${destinations.length} destinations`);

    res.json({ destinations });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    res.status(500).json({ error: 'Failed to fetch destinations' });
  }
};

export const getDestination = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await prisma.destination.findUnique({
      where: { id }
    });

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' });
    }

    res.json({ destination });
  } catch (error) {
    console.error('Error fetching destination:', error);
    res.status(500).json({ error: 'Failed to fetch destination' });
  }
};

export const getDestinationsByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    const destinations = await prisma.destination.findMany({
      where: {
        region: {
          contains: region,
          mode: 'insensitive'
        }
      }
    });

    res.json({ destinations });
  } catch (error) {
    console.error('Error fetching destinations by region:', error);
    res.status(500).json({ error: 'Failed to fetch destinations by region' });
  }
};

export const getDestinationsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const destinations = await prisma.destination.findMany({
      where: {
        category: {
          contains: category,
          mode: 'insensitive'
        }
      }
    });

    res.json({ destinations });
  } catch (error) {
    console.error('Error fetching destinations by category:', error);
    res.status(500).json({ error: 'Failed to fetch destinations by category' });
  }
};

export const searchDestinations = async (req, res, next) => {
  try {
    const results = await destinationService.searchDestinations(req.query);
    res.json({ destinations: results });
  } catch (error) {
    next(error);
  }
};

export const likeDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // "like" or "unlike"

    if (!['like', 'unlike'].includes(action)) {
      return res.status(400).json({ message: 'Invalid action' });
    }

    const destination = await destinationService.updateDestinationLikes(
      id,
      action === 'like'
    );

    res.json({
      message: `Destination ${action}d successfully`,
      likes: destination.likes
    });
  } catch (error) {
    next(error);
  }
};
