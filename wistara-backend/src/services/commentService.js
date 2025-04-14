import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCommentsByDestinationId = async (destinationId) => {
  return prisma.comment.findMany({
    where: {
      destinationId: destinationId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        }
      }
    },
    orderBy: {
      date: 'desc'
    }
  });
};

export const addComment = async (commentData) => {
  return prisma.comment.create({
    data: {
      text: commentData.text,
      rating: commentData.rating,
      userId: commentData.userId,
      destinationId: commentData.destinationId,
      date: new Date()
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  });
};

export const getUserComments = async (userId) => {
  return prisma.comment.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      date: 'desc'
    }
  });
};

export const updateComment = async (id, text, rating) => {
  return prisma.comment.update({
    where: { id },
    data: {
      text,
      rating,
      updatedAt: new Date()
    }
  });
};

export const deleteComment = async (id) => {
  return prisma.comment.delete({
    where: { id }
  });
};
