import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const destinationService = {
  getAllDestinations: async () => {
    return prisma.destination.findMany();
  },

  getDestinationById: async (id) => {
    return prisma.destination.findUnique({
      where: { id },
      include: {
        comments: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                id: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  },

  getFeaturedDestinations: async () => {
    // Ambil 12 destinasi dengan likes tertinggi sebagai featured
    return prisma.destination.findMany({
      orderBy: {
        likes: 'desc'
      },
      take: 12
    });
  },

  getDestinationsByRegion: async (region) => {
    if (region === 'all') {
      return prisma.destination.findMany();
    }

    return prisma.destination.findMany({
      where: {
        region: {
          contains: region,
          mode: 'insensitive'
        }
      }
    });
  },

  getDestinationsByCategory: async (category) => {
    if (category === 'All') {
      return prisma.destination.findMany();
    }

    return prisma.destination.findMany({
      where: {
        category: {
          contains: category,
          mode: 'insensitive'
        }
      }
    });
  }
};
