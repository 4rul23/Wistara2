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
  },

  updateDestinationRating: async (destinationId) => {
    try {
      // Hitung rata-rata rating dari semua komentar
      const comments = await prisma.comment.findMany({
        where: {
          destinationId: destinationId
        },
        select: {
          rating: true
        }
      });

      // Jika tidak ada komentar, atur rating ke null atau 0
      if (comments.length === 0) {
        await prisma.destination.update({
          where: { id: destinationId },
          data: { rating: 0 }
        });
        return { rating: 0 };
      }

      // Hitung rata-rata
      const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
      const averageRating = totalRating / comments.length;

      // Update rating di destinasi
      await prisma.destination.update({
        where: { id: destinationId },
        data: { rating: averageRating }
      });

      return { rating: averageRating };
    } catch (error) {
      console.error('Error updating destination rating:', error);
      throw new Error('Failed to update destination rating');
    }
  }
};

// Ekspor fungsi terpisah sebagai alias untuk backward compatibility
export const updateDestinationRating = destinationService.updateDestinationRating;
