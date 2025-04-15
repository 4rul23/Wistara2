import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Fungsi untuk mendapatkan komentar dari destinasi tertentu
export const getComments = async (destinationId) => {
  return await prisma.comment.findMany({
    where: { destinationId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          avatar: true
        }
      }
    },
    orderBy: { date: 'desc' }
  });
};

// Fungsi untuk membuat komentar baru - inilah yang hilang!
export const createComment = async (data) => {
  return await prisma.comment.create({
    data: {
      text: data.text,
      rating: data.rating,
      userId: data.userId,
      destinationId: data.destinationId,
      destinationName: data.destinationName,
      date: new Date()
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          avatar: true
        }
      }
    }
  });
};

// Fungsi untuk mendapatkan komentar dari user tertentu
export const getUserComments = async (userId) => {
  return await prisma.comment.findMany({
    where: { userId },
    orderBy: { date: 'desc' }
  });
};

// Fungsi untuk mengupdate komentar
export const updateComment = async (id, data) => {
  return await prisma.comment.update({
    where: { id: parseInt(id) },
    data: {
      text: data.text,
      rating: data.rating,
      updatedAt: new Date()
    }
  });
};

// Fungsi untuk menghapus komentar
export const deleteComment = async (id) => {
  return await prisma.comment.delete({
    where: { id: parseInt(id) }
  });
};
