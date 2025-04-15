import * as commentService from '../services/commentService.js';
import * as destinationService from '../services/destinationService.js';
import { PrismaClient } from '@prisma/client'; // Tambahkan ini

const prisma = new PrismaClient(); // Tambahkan ini

// Fungsi untuk mendapatkan komentar dari destinasi tertentu
export const getComments = async (req, res, next) => {
  try {
    const { destinationId } = req.params;
    console.log(`Fetching comments for destination: ${destinationId}`);

    const comments = await commentService.getComments(destinationId);

    res.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    next(error);
  }
};

// Fungsi untuk membuat komentar baru
export const createComment = async (req, res) => {
  try {
    const { text, rating, destinationId, destinationName } = req.body;
    const userId = req.session.userId;

    console.log(`Creating comment for destination ${destinationId} by user ${userId}`);

    // Validasi input
    if (!text || rating === undefined || !destinationId) {
      return res.status(400).json({
        message: 'Text, rating and destinationId are required'
      });
    }

    // Buat komentar
    const comment = await commentService.createComment({
      text,
      rating: parseFloat(rating),
      userId,
      destinationId,
      destinationName
    });

    // Update rating destinasi - sementara matikan dulu untuk troubleshooting
    // try {
    //   await destinationService.updateDestinationRating(destinationId);
    // } catch (ratingError) {
    //   console.error('Error updating destination rating:', ratingError);
    // }

    res.status(201).json({
      message: 'Comment created successfully',
      comment
    });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({
      message: 'Failed to create comment',
      error: error.message
    });
  }
};

export const getUserComments = async (req, res, next) => {
  try {
    const userId = req.session.userId || parseInt(req.params.userId);
    const comments = await commentService.getUserComments(userId);

    res.json({ comments });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, rating } = req.body;
    const userId = req.session.userId;

    // Verifikasi kepemilikan komentar
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) }
    });

    if (!comment || comment.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updatedComment = await commentService.updateComment(
      parseInt(id),
      text,
      parseFloat(rating)
    );

    // Update destination rating
    try {
      await destinationService.updateDestinationRating(comment.destinationId);
    } catch (ratingError) {
      console.error('Error updating destination rating:', ratingError);
    }

    res.json({ comment: updatedComment });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({
      message: 'Failed to update comment',
      error: error.message
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.userId;

    // Verifikasi kepemilikan komentar
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) }
    });

    if (!comment || comment.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const destinationId = comment.destinationId; // Simpan sebelum menghapus

    // Hapus komentar
    await commentService.deleteComment(parseInt(id));

    // Update rating setelah hapus komentar
    try {
      await destinationService.updateDestinationRating(destinationId);
    } catch (ratingError) {
      console.error('Error updating destination rating:', ratingError);
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({
      message: 'Failed to delete comment',
      error: error.message
    });
  }
};
