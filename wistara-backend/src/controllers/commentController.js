import * as commentService from '../services/commentService.js';
// Import destinationService
import * as destinationService from '../services/destinationService.js';

export const getComments = async (req, res, next) => {
  try {
    const { destinationId } = req.params;
    const comments = await commentService.getCommentsByDestinationId(destinationId);

    res.json({ comments });
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { text, rating, destinationId } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const commentData = {
      text,
      rating: parseFloat(rating),
      userId,
      destinationId
    };

    const comment = await commentService.addComment(commentData);

    // Update destination rating
    await destinationService.updateDestinationRating(destinationId);

    res.status(201).json({ comment });
  } catch (error) {
    next(error);
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

export const updateComment = async (req, res, next) => {
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
    await destinationService.updateDestinationRating(comment.destinationId);

    res.json({ comment: updatedComment });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
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

    const destinationId = comment.destinationId;
    await commentService.deleteComment(parseInt(id));

    // Update destination rating
    await destinationService.updateDestinationRating(destinationId);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};
